import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MotionProvider } from './context/MotionContext';
import { ThemeProvider } from './context/ThemeContext';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <MotionProvider>
          <App />
        </MotionProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
