import Reveal from './Reveal';

type SectionHeaderProps = {
  chapter: string;
  label: string;
  title: string;
  desc?: string;
};

export default function SectionHeader({ chapter, label, title, desc }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <Reveal delay={0}>
        <p className="section-chapter">
          <span className="section-chapter-num">{chapter}</span>
          <span className="section-label">{label}</span>
        </p>
      </Reveal>
      <Reveal delay={1}>
        <h2 className="section-title">{title}</h2>
      </Reveal>
      {desc && (
        <Reveal delay={2}>
          <p className="section-desc">{desc}</p>
        </Reveal>
      )}
    </header>
  );
}
