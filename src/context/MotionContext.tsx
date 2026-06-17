import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type MotionContextValue = {
  isDynamic: true;
};

const MotionContext = createContext<MotionContextValue>({ isDynamic: true });

/** Motion is always dynamic — no UI toggle. */
export function MotionProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.motion = 'dynamic';
  }, []);

  return (
    <MotionContext.Provider value={{ isDynamic: true }}>
      {children}
    </MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}
