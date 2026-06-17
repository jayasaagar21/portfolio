import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

export type MotionMode = 'dynamic' | 'static';

type MotionContextValue = {
  mode: MotionMode;
  isDynamic: boolean;
  setMode: (mode: MotionMode) => void;
  toggleMode: () => void;
};

const STORAGE_KEY = 'portfolio-motion-mode';

const MotionContext = createContext<MotionContextValue | null>(null);

function getInitialMode(): MotionMode {
  if (typeof window === 'undefined') return 'dynamic';

  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'dynamic' || stored === 'static') return stored;

  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'static' : 'dynamic';
}

export function MotionProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<MotionMode>(getInitialMode);

  const setMode = (next: MotionMode) => {
    setModeState(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const toggleMode = () => setMode(mode === 'dynamic' ? 'static' : 'dynamic');

  useEffect(() => {
    document.documentElement.dataset.motion = mode;
  }, [mode]);

  return (
    <MotionContext.Provider value={{ mode, isDynamic: mode === 'dynamic', setMode, toggleMode }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  const ctx = useContext(MotionContext);
  if (!ctx) throw new Error('useMotion must be used within MotionProvider');
  return ctx;
}
