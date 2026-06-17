import { useEffect, useState } from 'react';
import { useMotion } from '../context/MotionContext';

export default function ScrollProgress() {
  const { isDynamic } = useMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isDynamic) {
      setProgress(0);
      return;
    }

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      const max = scrollHeight - clientHeight;
      setProgress(max > 0 ? scrollTop / max : 0);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isDynamic]);

  if (!isDynamic) return null;

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-bar" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
