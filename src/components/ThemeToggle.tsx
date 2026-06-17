import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="theme-toggle" role="group" aria-label="Color theme">
      <button
        type="button"
        className={`theme-toggle-btn${theme === 'light' ? ' active' : ''}`}
        onClick={() => setTheme('light')}
        aria-pressed={theme === 'light'}
        aria-label="Light theme"
      >
        <Sun size={13} aria-hidden />
        <span className="theme-toggle-label">Light</span>
      </button>
      <button
        type="button"
        className={`theme-toggle-btn${theme === 'dark' ? ' active' : ''}`}
        onClick={() => setTheme('dark')}
        aria-pressed={theme === 'dark'}
        aria-label="Dark theme"
      >
        <Moon size={13} aria-hidden />
        <span className="theme-toggle-label">Dark</span>
      </button>
    </div>
  );
}
