import test from 'node:test';
import assert from 'node:assert';

// Simulated Security & Calculation Functions
function canAccessProject(user, project) {
  if (user.organization_id !== project.organization_id) return false;
  if (user.role === 'tonmay_owner' || user.role === 'macs_collaborator') return true;
  if (user.role === 'client_contact') {
    return user.client_id === project.client_id;
  }
  return false;
}

function filterCommentsForUser(user, comments) {
  return comments.filter((c) => {
    if (user.role === 'client_contact' && c.is_internal_only) {
      return false;
    }
    return true;
  });
}

function filterShotItemsForUser(user, items) {
  return items.filter((item) => {
    if (user.role === 'client_contact' && item.is_internal_only) {
      return false;
    }
    return true;
  });
}

function calculateDeposit(totalQuoteCents, depositPercentage) {
  return (totalQuoteCents * depositPercentage) / 100;
}

function isReminderIdempotent(sentReminderIds, newReminderId) {
  return !sentReminderIds.includes(newReminderId);
}

// Test Cases
test('Client A cannot access Client B project', () => {
  const clientA = { id: 'u1', role: 'client_contact', organization_id: 'org1', client_id: 'cli_a' };
  const projectB = { id: 'p2', organization_id: 'org1', client_id: 'cli_b' };

  assert.strictEqual(canAccessProject(clientA, projectB), false);
});

test('Client contact cannot see internal Macs comments', () => {
  const clientUser = { id: 'u1', role: 'client_contact', organization_id: 'org1', client_id: 'cli_a' };
  const comments = [
    { id: 'c1', is_internal_only: false, content: 'Public shot list review' },
    { id: 'c2', is_internal_only: true, content: 'Macs internal camera preset note' }
  ];

  const filtered = filterCommentsForUser(clientUser, comments);
  assert.strictEqual(filtered.length, 1);
  assert.strictEqual(filtered[0].id, 'c1');
});

test('Client contact cannot see internal camera prep shot items', () => {
  const clientUser = { id: 'u1', role: 'client_contact', organization_id: 'org1', client_id: 'cli_a' };
  const shots = [
    { id: 's1', is_internal_only: false, title: 'Founder Interview' },
    { id: 's2', is_internal_only: true, title: 'Macs Internal Lens Preset' }
  ];

  const filtered = filterShotItemsForUser(clientUser, shots);
  assert.strictEqual(filtered.length, 1);
  assert.strictEqual(filtered[0].id, 's1');
});

test('Anton owner has full access across organization projects', () => {
  const anton = { id: 'u0', role: 'tonmay_owner', organization_id: 'org1' };
  const projectA = { id: 'p1', organization_id: 'org1', client_id: 'cli_a' };
  const projectB = { id: 'p2', organization_id: 'org1', client_id: 'cli_b' };

  assert.strictEqual(canAccessProject(anton, projectA), true);
  assert.strictEqual(canAccessProject(anton, projectB), true);
});

test('25% deposit calculation is exact', () => {
  const quoteCents = 240000; // $2,400.00
  const depositCents = calculateDeposit(quoteCents, 25);
  assert.strictEqual(depositCents, 60000); // $600.00
});

test('Reminder engine prevents duplicate delivery (idempotency)', () => {
  const sentLog = ['rem_48h_1'];
  assert.strictEqual(isReminderIdempotent(sentLog, 'rem_48h_1'), false);
  assert.strictEqual(isReminderIdempotent(sentLog, 'rem_24h_1'), true);
});
