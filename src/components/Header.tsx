import { useEffect, useState } from 'react';
import { ArrowLeft, Menu, Settings, X } from 'lucide-react';
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
  const [menuOpen, setMenuOpen] = useState(false);
  const activeSection = useScrollSpy(NAV_SECTIONS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!showNav) setMenuOpen(false);
  }, [showNav]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`header${scrolled ? ' header--scrolled' : ''}${menuOpen ? ' header--menu-open' : ''}`}>
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
            <>
              <button
                type="button"
                className="header-menu-btn"
                onClick={() => setMenuOpen(open => !open)}
                aria-expanded={menuOpen}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>

              <div className={`header-links${menuOpen ? ' header-links--open' : ''}`}>
                {NAV_SECTIONS.map(id => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={activeSection === id ? 'active' : ''}
                    onClick={closeMenu}
                  >
                    {id.charAt(0).toUpperCase() + id.slice(1)}
                  </a>
                ))}
                <a
                  href={RESUME_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="header-link-resume"
                  onClick={closeMenu}
                >
                  Download resume
                </a>
              </div>
            </>
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
