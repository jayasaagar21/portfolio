import type { CSSProperties, ElementType, ReactNode } from 'react';
import { useMotion } from '../context/MotionContext';
import { useInView } from '../hooks/useInView';

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  as?: ElementType;
  style?: CSSProperties;
};

export default function Reveal({
  children,
  className = '',
  delay = 0,
  as: Tag = 'div',
  style,
}: RevealProps) {
  const { isDynamic } = useMotion();
  const { ref, inView } = useInView(0.1, { disabled: !isDynamic });
  const visible = inView;

  return (
    <Tag
      ref={ref as React.RefObject<HTMLElement>}
      className={`reveal${visible ? ' reveal--visible' : ''}${delay ? ` reveal--d${delay}` : ''}${className ? ` ${className}` : ''}`}
      style={style}
    >
      {children}
    </Tag>
  );
}
