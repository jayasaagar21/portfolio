import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionProvider } from './context/MotionContext';
import { ThemeProvider } from './context/ThemeContext';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <MotionProvider>
        <App />
      </MotionProvider>
    </ThemeProvider>
  </StrictMode>
);
