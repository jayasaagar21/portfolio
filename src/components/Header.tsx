import { useEffect, useState } from 'react';
import { ArrowLeft, Settings } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useScrollSpy } from '../hooks/useScrollSpy';
import { RESUME_DOWNLOAD_URL } from '../data/portfolioContent';

interface HeaderProps {
  onBack: () => void;
  showBack: boolean;
  onAdmin: () => void;
  showNav: boolean;
}

const NAV_SECTIONS = ['experience', 'projects', 'tools', 'contact'];

export default function Header({ onBack, showBack, onAdmin, showNav }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const activeSection = useScrollSpy(NAV_SECTIONS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}`}>
      <div className="header-inner">
        {showBack ? (
          <button onClick={onBack} className="header-back">
            <ArrowLeft size={15} />
            Back
          </button>
        ) : (
          <a href="#" className="header-logo" onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
            Jayasaagar C
          </a>
        )}

        <nav className="header-nav">
          {showNav && (
            <div className="header-links">
              {NAV_SECTIONS.map(id => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={activeSection === id ? 'active' : ''}
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              ))}
              <a
                href={RESUME_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="header-link-resume"
              >
                Download resume
              </a>
            </div>
          )}
          <ThemeToggle />
          <button onClick={onAdmin} className="header-icon-btn" aria-label="Admin">
            <Settings size={15} />
          </button>
        </nav>
      </div>
    </header>
  );
}
