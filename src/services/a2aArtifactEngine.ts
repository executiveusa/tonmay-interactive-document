import { Project, ShotItem, InterviewQuestion } from '../types/schema';

export interface A2ATaskArtifact {
  artifact_type: 'ClientBrief' | 'ShotList' | 'InterviewGuide' | 'ReminderPlan' | 'FolderPlan' | 'WebsiteUpdateProposal';
  project_id: string;
  timestamp: string;
  data: Record<string, any>;
}

export function generateA2AShotListArtifact(project: Project, shotItems: ShotItem[]): A2ATaskArtifact {
  return {
    artifact_type: 'ShotList',
    project_id: project.id,
    timestamp: new Date().toISOString(),
    data: {
      project_name: project.name,
      total_shots: shotItems.length,
      shots: shotItems.map((s) => ({
        id: s.id,
        title: s.title,
        category: s.category,
        is_internal: s.is_internal_only
      }))
    }
  };
}
