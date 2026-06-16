import { ArrowLeft, Settings } from 'lucide-react';

interface HeaderProps {
  onBack: () => void;
  showBack: boolean;
  onAdmin: () => void;
  showNav: boolean;
}

export default function Header({ onBack, showBack, onAdmin, showNav }: HeaderProps) {
  return (
    <header className="header">
      <div className="header-inner">
        {showBack ? (
          <button onClick={onBack} className="header-back">
            <ArrowLeft size={15} />
            Back
          </button>
        ) : (
          <span className="header-logo">JC</span>
        )}

        <nav className="header-nav">
          {showNav && (
            <>
              <a href="#experience">Experience</a>
              <a href="#tools">Tools</a>
              <a href="#projects">Projects</a>
              <a href="#contact">Contact</a>
            </>
          )}
          <button onClick={onAdmin} aria-label="Admin">
            <Settings size={15} />
          </button>
        </nav>
      </div>
    </header>
  );
}
