import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { RECOMMENDATIONS } from '../data/recommendations';

export default function RecommendationsSection() {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggle = (id: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <section id="recommendations" className="section section--story">
      <div className="container">
        <SectionHeader
          chapter="02"
          label="Recommendations"
          title="What colleagues say"
          desc="Kind words from people I've worked with across product, marketing, and engineering."
        />

        <div className="rec-list">
          {RECOMMENDATIONS.map((rec, i) => {
            const isOpen = expanded.has(rec.id);

            return (
              <Reveal
                key={rec.id}
                delay={Math.min(i + 1, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6}
              >
                <article className={`rec-card${isOpen ? ' rec-card--open' : ''}`}>
                  <button
                    type="button"
                    className="rec-card-toggle"
                    onClick={() => toggle(rec.id)}
                    aria-expanded={isOpen}
                    aria-controls={`rec-body-${rec.id}`}
                  >
                    <div className="rec-card-summary">
                      <h3 className="rec-card-name">{rec.name}</h3>
                      <p className="rec-card-position">{rec.position}</p>
                    </div>
                    <ChevronDown size={16} className="rec-card-chevron" aria-hidden="true" />
                  </button>

                  {isOpen && (
                    <div className="rec-card-body" id={`rec-body-${rec.id}`}>
                      {rec.text.split('\n\n').map((paragraph, pi) => (
                        <p key={pi}>{paragraph}</p>
                      ))}
                      <button
                        type="button"
                        className="rec-card-close"
                        onClick={() => toggle(rec.id)}
                      >
                        Show less
                      </button>
                    </div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
