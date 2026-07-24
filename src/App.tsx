import React, { useState } from 'react';
import { UserContext, Project, ShotItem, ProjectComment } from './types/schema';
import {
  INITIAL_CLIENTS,
  INITIAL_PROJECTS,
  INITIAL_SHOTS,
  INITIAL_INTERVIEW_QUESTIONS,
  INITIAL_COMMENTS,
  INITIAL_DELIVERABLES,
  INITIAL_PAYMENTS,
  INITIAL_REMINDERS
} from './data/seedData';
import { Header } from './components/Header';
import { AntonDashboard } from './components/AntonDashboard';
import { ClientPortal } from './components/ClientPortal';
import { ProjectWorkspace } from './components/ProjectWorkspace';
import { FootageFolderModal } from './components/FootageFolderModal';
import { A2AAgentCardModal } from './components/A2AAgentCardModal';
import { StudioAssistant } from './components/StudioAssistant';

export function App() {
  // Default user is Anton (TonMay Owner)
  const [currentUser, setCurrentUser] = useState<UserContext>({
    id: 'usr_anton',
    name: 'Anton',
    email: 'anton@tonmayproductions.com',
    role: 'tonmay_owner',
    organization_id: 'org_tonmay_prod'
  });

  const [projects] = useState<Project[]>(INITIAL_PROJECTS);
  const [clients] = useState(INITIAL_CLIENTS);
  const [shotItems, setShotItems] = useState<ShotItem[]>(INITIAL_SHOTS);
  const [questions] = useState(INITIAL_INTERVIEW_QUESTIONS);
  const [comments, setComments] = useState<ProjectComment[]>(INITIAL_COMMENTS);
  const [deliverables] = useState(INITIAL_DELIVERABLES);
  const [payments] = useState(INITIAL_PAYMENTS);
  const [reminders] = useState(INITIAL_REMINDERS);

  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeFolderModalProject, setActiveFolderModalProject] = useState<Project | null>(null);
  const [showA2AModal, setShowA2AModal] = useState(false);
  const [showAssistantModal, setShowAssistantModal] = useState(false);

  const handleAddShotItem = (item: Omit<ShotItem, 'id' | 'organization_id' | 'client_id' | 'project_id'>) => {
    const activeProj = projects.find((p) => p.id === (selectedProjectId || projects[0].id));
    if (!activeProj) return;

    const newShot: ShotItem = {
      id: `shot_${Date.now()}`,
      organization_id: activeProj.organization_id,
      client_id: activeProj.client_id,
      project_id: activeProj.id,
      ...item
    };
    setShotItems((prev) => [newShot, ...prev]);
  };

  const handleAddComment = (content: string, isInternalOnly: boolean = false) => {
    const activeProjId = selectedProjectId || projects[0].id;
    const activeProj = projects.find((p) => p.id === activeProjId);
    if (!activeProj) return;

    const newComment: ProjectComment = {
      id: `com_${Date.now()}`,
      organization_id: activeProj.organization_id,
      client_id: activeProj.client_id,
      project_id: activeProj.id,
      author_name: currentUser.name,
      author_role: currentUser.role,
      is_internal_only: currentUser.role === 'client_contact' ? false : isInternalOnly,
      content,
      created_at: new Date().toISOString()
    };
    setComments((prev) => [...prev, newComment]);
  };

  // Active project for workspace or client portal
  const currentProject = projects.find((p) => p.id === selectedProjectId) || projects[0];

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Header & RLS Role Selector */}
      <Header
        currentUser={currentUser}
        onSwitchUser={(user) => {
          setCurrentUser(user);
          // If switching to client, ensure selected project is client's project
          if (user.role === 'client_contact') {
            setSelectedProjectId('proj_community_cuts');
          }
        }}
        onOpenA2AModal={() => setShowA2AModal(true)}
      />

      {/* RENDER VIEW BASED ON ROLE AND VIEW MODE */}
      <main style={{ flex: 1 }}>
        {currentUser.role === 'client_contact' ? (
          /* Client Portal View (Strict TonMay Branded Client View) */
          <ClientPortal
            currentUser={currentUser}
            project={projects.find((p) => p.client_id === currentUser.client_id) || projects[0]}
            shotItems={shotItems.filter((s) => s.project_id === (currentProject?.id || 'proj_community_cuts'))}
            questions={questions.filter((q) => q.project_id === (currentProject?.id || 'proj_community_cuts'))}
            comments={comments.filter((c) => c.project_id === (currentProject?.id || 'proj_community_cuts'))}
            deliverables={deliverables.filter((d) => d.project_id === (currentProject?.id || 'proj_community_cuts'))}
            payments={payments.filter((p) => p.project_id === (currentProject?.id || 'proj_community_cuts'))}
            onAddComment={(content) => handleAddComment(content, false)}
          />
        ) : selectedProjectId ? (
          /* Detailed Project Workspace View */
          <ProjectWorkspace
            currentUser={currentUser}
            project={currentProject}
            shotItems={shotItems.filter((s) => s.project_id === currentProject.id)}
            questions={questions.filter((q) => q.project_id === currentProject.id)}
            comments={comments.filter((c) => c.project_id === currentProject.id)}
            deliverables={deliverables.filter((d) => d.project_id === currentProject.id)}
            payments={payments.filter((p) => p.project_id === currentProject.id)}
            reminders={reminders.filter((r) => r.project_id === currentProject.id)}
            onBackToDashboard={() => setSelectedProjectId(null)}
            onAddShotItem={handleAddShotItem}
            onAddComment={handleAddComment}
            onOpenFolderPlan={() => setActiveFolderModalProject(currentProject)}
          />
        ) : (
          /* Anton Dashboard (Default Studio Overview) */
          <AntonDashboard
            projects={projects}
            clients={clients}
            deliverables={deliverables}
            payments={payments}
            reminders={reminders}
            onSelectProject={(id) => setSelectedProjectId(id)}
            onOpenFolderPlan={(proj) => setActiveFolderModalProject(proj)}
            onOpenAssistant={() => setShowAssistantModal(true)}
          />
        )}
      </main>

      {/* FOOTAGE FOLDER MODAL */}
      {activeFolderModalProject && (
        <FootageFolderModal
          project={activeFolderModalProject}
          onClose={() => setActiveFolderModalProject(null)}
        />
      )}

      {/* A2A AGENT CARD MODAL */}
      {showA2AModal && (
        <A2AAgentCardModal onClose={() => setShowA2AModal(false)} />
      )}

      {/* AI STUDIO ASSISTANT MODAL */}
      {showAssistantModal && (
        <StudioAssistant
          currentUser={currentUser}
          projects={projects}
          clients={clients}
          onClose={() => setShowAssistantModal(false)}
        />
      )}

    </div>
  );
}

export default App;
