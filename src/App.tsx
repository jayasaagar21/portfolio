import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ExperienceSection from './components/ExperienceSection';
import RecommendationsSection from './components/RecommendationsSection';
import ToolsSection from './components/ToolsSection';
import ProjectsSection from './components/ProjectsSection';
import CertificationsSection from './components/CertificationsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ProjectDetail from './components/ProjectDetail';
import AdminPanel from './components/AdminPanel';
import ScrollProgress from './components/ScrollProgress';
import { useMotion } from './context/MotionContext';

type View = 'home' | 'project' | 'admin';

export default function App() {
  const [view, setView] = useState<View>('home');
  const [projectId, setProjectId] = useState<string | null>(null);
  const { isDynamic } = useMotion();

  const goHome = () => {
    setView('home');
    setProjectId(null);
    window.scrollTo({ top: 0, behavior: isDynamic ? 'smooth' : 'auto' });
  };

  const goProject = (id: string) => {
    setProjectId(id);
    setView('project');
    window.scrollTo({ top: 0, behavior: isDynamic ? 'smooth' : 'auto' });
  };

  const goAdmin = () => {
    setView('admin');
    window.scrollTo({ top: 0, behavior: isDynamic ? 'smooth' : 'auto' });
  };

  return (
    <div className="app">
      <ScrollProgress />
      <Header
        onBack={goHome}
        showBack={view !== 'home'}
        onAdmin={goAdmin}
        showNav={view === 'home'}
      />

      <main className={`page-shell page-shell--${view}${isDynamic ? ' page-enter' : ''}`} key={view}>
        {view === 'home' && (
          <>
            <Hero />
            <ExperienceSection />
            <ProjectsSection onProjectClick={goProject} />
            <CertificationsSection />
            <RecommendationsSection />
            <ToolsSection />
            <ContactSection />
          </>
        )}

        {view === 'project' && <ProjectDetail projectId={projectId} onBack={goHome} />}
        {view === 'admin' && <AdminPanel onClose={goHome} />}
      </main>

      <Footer />
    </div>
  );
}
