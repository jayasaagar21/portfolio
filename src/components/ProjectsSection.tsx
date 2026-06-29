import { useMemo, useState } from 'react';
import { ArrowUpRight, ExternalLink } from 'lucide-react';
import {
  FEATURED_PROJECTS,
  PROJECT_CATEGORIES,
  type ProjectCategory,
} from '../data/portfolioContent';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { useMotion } from '../context/MotionContext';

type Filter = 'all' | ProjectCategory;

interface Props {
  onProjectClick: (id: string) => void;
}

export default function ProjectsSection({ onProjectClick }: Props) {
  const [filter, setFilter] = useState<Filter>('all');
  const { isDynamic } = useMotion();

  const projects = useMemo(
    () => (filter === 'all' ? FEATURED_PROJECTS : FEATURED_PROJECTS.filter(p => p.category === filter)),
    [filter]
  );

  return (
    <section id="projects" className="section section--story">
      <div className="container">
        <SectionHeader
          chapter="03"
          label="Projects"
          title="Work that puts users first"
          desc="AI, analytics, and marketing — built to save time, reduce friction, and help people decide faster."
        />

        <Reveal delay={1}>
          <div className="proj-filters" role="tablist" aria-label="Filter projects">
            <button
              type="button"
              role="tab"
              aria-selected={filter === 'all'}
              className={`proj-filter${filter === 'all' ? ' active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All work
              <span>{FEATURED_PROJECTS.length}</span>
            </button>
            {PROJECT_CATEGORIES.map(({ id, label, icon: Icon, hue }) => {
              const count = FEATURED_PROJECTS.filter(p => p.category === id).length;
              if (count === 0) return null;
              return (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={filter === id}
                  className={`proj-filter proj-filter--${hue}${filter === id ? ' active' : ''}`}
                  onClick={() => setFilter(id)}
                >
                  <Icon size={14} />
                  {label}
                  <span>{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className={`proj-featured-grid${isDynamic ? ' panel-enter' : ''}`} key={filter}>
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={Math.min(i + 1, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6}
              className={project.featured ? 'proj-featured-cell--hero' : undefined}
            >
              <article
                className={`proj-card proj-card--${project.category}${project.featured ? ' proj-card--hero' : ''} proj-card--featured`}
                data-category={project.category}
              >
                <a
                  href={project.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="proj-card-btn"
                >
                  <div className="proj-card-img">
                    {project.image && <img src={project.image} alt={project.title} loading="lazy" />}
                    <div className="proj-card-shade" />
                    <div className="proj-card-overlay">
                      <span>
                        {project.linkLabel}
                        <ExternalLink size={13} />
                      </span>
                    </div>
                    <span className={`proj-card-cat proj-card-cat--${project.category}`}>
                      {PROJECT_CATEGORIES.find(c => c.id === project.category)?.label}
                    </span>
                  </div>
                  <div className="proj-card-body">
                    <p className="proj-card-outcome">{project.outcome}</p>
                    <div className="proj-card-tags">
                      {project.tags.map(tag => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                    <h3 className="proj-card-title">{project.title}</h3>
                    <p className="proj-card-company">{project.company}</p>
                    <p className="proj-card-desc">{project.description}</p>
                    <span className="proj-card-link">
                      {project.linkLabel}
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </a>
                <button
                  type="button"
                  className="proj-card-detail"
                  onClick={() => onProjectClick(project.id)}
                >
                  Case study
                </button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
