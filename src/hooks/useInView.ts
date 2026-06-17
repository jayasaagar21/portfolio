import { useEffect, useRef, useState } from 'react';

type Options = {
  disabled?: boolean;
  threshold?: number;
};

export function useInView(threshold = 0.15, options?: Options) {
  const ref = useRef<HTMLElement | null>(null);
  const [inView, setInView] = useState(options?.disabled ?? false);

  useEffect(() => {
    if (options?.disabled) {
      setInView(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: options?.threshold ?? threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, options?.disabled, options?.threshold]);

  return { ref, inView };
}
