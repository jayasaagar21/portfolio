import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionProvider } from './context/MotionContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionProvider>
      <App />
    </MotionProvider>
  </StrictMode>
);
