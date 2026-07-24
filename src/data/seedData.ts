import { Client, Project, ShotItem, InterviewQuestion, ProjectComment, Deliverable, PaymentRecord, ReminderLog } from '../types/schema';

export const ORG_ID = 'org_tonmay_prod';

export const INITIAL_CLIENTS: Client[] = [
  {
    id: 'cli_asc3nd',
    organization_id: ORG_ID,
    name: 'ASC3ND Collective',
    company_name: 'ASC3ND Collective Non-Profit',
    email: 'info@asc3nd.org',
    phone: '(425) 555-0192',
    notes: 'Community youth empowerment and mentoring programs in Everett.',
    created_at: '2026-07-01T10:00:00Z'
  },
  {
    id: 'cli_sound_foundation',
    organization_id: ORG_ID,
    name: 'Sound Arts Initiative',
    company_name: 'Sound Arts Northwest',
    email: 'contact@soundarts.org',
    phone: '(206) 555-0841',
    notes: 'Seattle youth music workshop series.',
    created_at: '2026-07-10T14:00:00Z'
  }
];

export const INITIAL_PROJECTS: Project[] = [
  {
    id: 'proj_community_cuts',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    name: 'Community Cuts for Kids',
    slogan: 'Fresh Fade, Fresh Grade',
    service_types: ['Documentary', 'Nonprofit / community media', 'Interviews', 'Videography', 'Drone'],
    stage: 'Shoot scheduled',
    deposit_percentage: 25,
    total_quote_cents: 240000, // $2,400.00
    deposit_paid_cents: 60000,  // $600.00 (25%)
    balance_paid_cents: 0,
    date: 'Sunday, August 30, 2026',
    time: '12:00 PM – 3:00 PM PST',
    location: 'Tangles & Locs',
    address: '7425 Hardeson Rd, Everett, WA 98203',
    subjects: ['Otha Minnifield', 'Elisha Minnifield'],
    created_at: '2026-07-15T09:00:00Z',
    updated_at: '2026-07-23T11:00:00Z'
  },
  {
    id: 'proj_sound_session',
    organization_id: ORG_ID,
    client_id: 'cli_sound_foundation',
    name: 'Studio Showcase 2026',
    slogan: 'Voices of Tomorrow',
    service_types: ['People photography', 'Videography'],
    stage: 'Pre-production',
    deposit_percentage: 25,
    total_quote_cents: 180000,
    deposit_paid_cents: 45000,
    balance_paid_cents: 0,
    date: 'Saturday, September 12, 2026',
    time: '1:00 PM – 5:00 PM PST',
    location: 'Columbia City Theater',
    address: 'Seattle, WA',
    subjects: ['Youth Choir Directors'],
    created_at: '2026-07-18T10:00:00Z',
    updated_at: '2026-07-20T16:00:00Z'
  }
];

export const INITIAL_SHOTS: ShotItem[] = [
  {
    id: 'shot_1',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    title: 'Exterior Establishing & Arrival',
    category: 'Hero',
    subject: 'Tangles & Locs storefront',
    description: 'Wide cinematic exterior shot of Tangles & Locs storefront on Hardeson Rd, capturing families entering.',
    status: 'Approved',
    is_internal_only: false
  },
  {
    id: 'shot_2',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    title: 'Otha Minnifield Founder Interview',
    category: 'Interview',
    subject: 'Otha Minnifield',
    description: 'Medium key-light seated interview framing founder Otha Minnifield on vision and community impact.',
    status: 'Approved',
    is_internal_only: false
  },
  {
    id: 'shot_3',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    title: 'Elisha Minnifield Haircut Action B-Roll',
    category: 'B-roll',
    subject: 'Elisha Minnifield',
    description: 'Macro slow-motion detail shots of clippers, barber precision, and smiling kids receiving fresh haircuts.',
    status: 'Approved',
    is_internal_only: false
  },
  {
    id: 'shot_4',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    title: 'Drone Aerial Neighborhood Context',
    category: 'Drone',
    subject: 'Everett Hardeson Rd Corridor',
    description: 'High-angle smooth aerial flyover of venue locale establishing community footprint.',
    status: 'Approved',
    is_internal_only: false
  },
  {
    id: 'shot_5',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    title: 'Macs Internal Note: Camera B Second Angle Preset',
    category: 'Selects',
    subject: 'Anton & Macs Camera setup',
    description: 'Ensure 50mm prime on Camera B for tight emotion reaction shots during founder interviews.',
    status: 'Approved',
    is_internal_only: true // Internal to Anton & Macs!
  }
];

export const INITIAL_INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'iq_1',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    target_subject: 'Otha Minnifield',
    question: 'What inspired ASC3ND Collective to launch "Community Cuts for Kids" before school starts?',
    purpose: 'Establish core narrative & community drive.',
    status: 'Approved'
  },
  {
    id: 'iq_2',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    target_subject: 'Elisha Minnifield',
    question: 'How does a fresh haircut build confidence for a student walking into their first day of school?',
    purpose: 'Highlight emotional transformation and student dignity.',
    status: 'Approved'
  }
];

export const INITIAL_COMMENTS: ProjectComment[] = [
  {
    id: 'com_1',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    author_name: 'Otha Minnifield',
    author_role: 'client_contact',
    is_internal_only: false,
    content: 'Shot list looks amazing, Anton! We have confirmed 30 students registered for cuts.',
    created_at: '2026-07-20T14:30:00Z'
  },
  {
    id: 'com_2',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    author_name: 'Macs Digital Media',
    author_role: 'macs_collaborator',
    is_internal_only: true, // INTERNAL ONLY!
    content: 'Macs Note: We will handle secondary color grade pass on raw camera A footage. Spanish captions handled externally.',
    created_at: '2026-07-21T09:15:00Z'
  }
];

export const INITIAL_DELIVERABLES: Deliverable[] = [
  {
    id: 'del_1',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    title: 'Community Cuts Hero Documentary Film',
    format: 'Horizontal 4K',
    status: 'In Edit',
    watermarked: true,
    preview_url: '#'
  },
  {
    id: 'del_2',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    title: 'Fresh Fade Fresh Grade Social Reel',
    format: 'Vertical Social',
    status: 'In Edit',
    watermarked: true,
    preview_url: '#'
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'pay_1',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    type: 'deposit',
    amount_cents: 60000, // $600.00 (25%)
    provider: 'cashapp',
    status: 'verified',
    reference_note: '25% booking deposit received via Cash App ($tonmayprod)',
    created_at: '2026-07-16T11:00:00Z'
  }
];

export const INITIAL_REMINDERS: ReminderLog[] = [
  {
    id: 'rem_1',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    type: '48h',
    channel: 'email',
    recipient: 'info@asc3nd.org',
    status: 'dry_run',
    scheduled_for: '2026-08-28T12:00:00Z'
  },
  {
    id: 'rem_2',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    type: '24h',
    channel: 'sms',
    recipient: '(425) 555-0192',
    status: 'dry_run',
    scheduled_for: '2026-08-29T12:00:00Z'
  },
  {
    id: 'rem_3',
    organization_id: ORG_ID,
    client_id: 'cli_asc3nd',
    project_id: 'proj_community_cuts',
    type: 'same_day',
    channel: 'sms',
    recipient: '(425) 555-0192',
    status: 'dry_run',
    scheduled_for: '2026-08-30T08:00:00Z'
  }
];
