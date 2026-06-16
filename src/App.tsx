import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import ToolsSection from './components/ToolsSection';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import AdminPanel from './components/AdminPanel';

type View = 'home' | 'project' | 'admin';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [projectId, setProjectId] = useState<string | null>(null);

  const goHome = () => { setView('home'); setProjectId(null); window.scrollTo(0, 0); };
  const goProject = (id: string) => { setProjectId(id); setView('project'); window.scrollTo(0, 0); };
  const goAdmin = () => { setView('admin'); window.scrollTo(0, 0); };

  return (
    <div className="app">
      <Header
        onBack={goHome}
        showBack={view !== 'home'}
        onAdmin={goAdmin}
        showNav={view === 'home'}
      />

      {view === 'home' && (
        <>
          <Hero />
          <ExperienceSection />
          <ToolsSection />
          <ProjectsSection onProjectClick={goProject} />
          <CertificationsSection />
          <ContactSection />
          <Footer />
        </>
      )}

      {view === 'project' && (
        <>
          <ProjectDetail projectId={projectId} onBack={goHome} />
          <Footer />
        </>
      )}

      {view === 'admin' && (
        <>
          <AdminPanel onClose={goHome} />
          <Footer />
        </>
      )}
    </div>
  );
}
