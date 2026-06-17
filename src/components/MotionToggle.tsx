import { Sparkles, Minus } from 'lucide-react';
import { useMotion } from '../context/MotionContext';

export default function MotionToggle() {
  const { mode, setMode } = useMotion();

  return (
    <div className="motion-toggle" role="group" aria-label="Motion preference">
      <button
        type="button"
        className={`motion-toggle-btn${mode === 'static' ? ' active' : ''}`}
        onClick={() => setMode('static')}
        aria-pressed={mode === 'static'}
      >
        <Minus size={12} aria-hidden />
        <span className="motion-toggle-label">Static</span>
      </button>
      <button
        type="button"
        className={`motion-toggle-btn${mode === 'dynamic' ? ' active' : ''}`}
        onClick={() => setMode('dynamic')}
        aria-pressed={mode === 'dynamic'}
      >
        <Sparkles size={12} aria-hidden />
        <span className="motion-toggle-label">Dynamic</span>
      </button>
    </div>
  );
}
