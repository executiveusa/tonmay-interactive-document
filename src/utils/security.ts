import { UserContext, ProjectComment, ShotItem, Project } from '../types/schema';

/**
 * Security Boundary & RLS Simulation
 * Enforces organization_id, client_id, and project_id rules.
 */

export function canAccessProject(user: UserContext, project: Project): boolean {
  if (user.organization_id !== project.organization_id) return false;
  if (user.role === 'tonmay_owner' || user.role === 'macs_collaborator') return true;
  if (user.role === 'client_contact') {
    return user.client_id === project.client_id;
  }
  return false;
}

export function filterCommentsForUser(user: UserContext, comments: ProjectComment[]): ProjectComment[] {
  return comments.filter((c) => {
    // RLS: Client contacts can never see internal collaborator notes
    if (user.role === 'client_contact' && c.is_internal_only) {
      return false;
    }
    return true;
  });
}

export function filterShotItemsForUser(user: UserContext, items: ShotItem[]): ShotItem[] {
  return items.filter((item) => {
    if (user.role === 'client_contact' && item.is_internal_only) {
      return false;
    }
    return true;
  });
}
