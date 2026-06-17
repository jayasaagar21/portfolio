import { useEffect, useState } from 'react';
import { ArrowRight, Loader } from 'lucide-react';
import { supabase, isSupabaseConfigured, type PortfolioItem } from '../lib/supabase';
import { projectImage } from '../data/projectImages';
import { PROJECT_CATEGORIES, type ProjectCategory } from '../data/portfolioContent';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { useMotion } from '../context/MotionContext';

const fallback: Record<ProjectCategory, Pick<PortfolioItem, 'id' | 'title' | 'company' | 'description' | 'tags' | 'image' | 'category'>[]> = {
  marketing: [
    { id: 'ankura-homes', title: 'Product Marketing Strategy', company: 'Ankura Homes · Real Estate', description: 'Full-funnel digital marketing — SEO, content, paid ads. 300% growth in qualified leads, 45% reduction in CAC.', tags: ['GTM', 'SEO', 'Performance Marketing'], image: projectImage('ankura-homes'), category: 'marketing' },
    { id: 'pandemic-innovation', title: 'Pandemic Innovation Initiative', company: 'Community Health Response', description: 'Virtual hospital queue system during COVID-19. Awareness campaigns across 15+ hospitals.', tags: ['Social Impact', 'Healthcare', 'Crisis'], image: projectImage('pandemic-innovation'), category: 'marketing' },
    { id: 'pascal', title: 'Pascal — Healthy Living App', company: 'Google Play · Health Tech', description: 'Full product ownership of a consumer health app. 500 downloads, 4.5-star rating on Google Play.', tags: ['Mobile', 'Health Tech', 'Android'], image: projectImage('pascal'), category: 'marketing' },
  ],
  analytics: [
    { id: 'powerbi-analytics', title: 'Data Analytics Platform', company: 'Power BI + AI Integration', description: 'Self-service BI platform with natural language queries and AI insights. 75% reduced analysis time, 5K+ daily users.', tags: ['Power BI', 'Azure', 'NLP'], image: projectImage('powerbi-analytics'), category: 'analytics' },
    { id: 'water-drought-analysis', title: 'U.S. Water Shortage & Drought Risk Analysis', company: 'University at Buffalo · Academic Project', description: 'Predictive framework analyzing 28,142 U.S. locations using land-use, soil, and geographic data. Linear Regression achieved R² of 0.99996.', tags: ['Python', 'Machine Learning', 'Predictive Modeling'], image: projectImage('water-drought-analysis'), category: 'analytics' },
  ],
  ai: [
    { id: 'fitness-tracker', title: 'Agentic AI Fitness Tracker', company: 'Personal Project · AI', description: 'AI-powered fitness tracker using agentic planning to adapt workout and nutrition plans in real-time.', tags: ['Agentic AI', 'Health', 'LLM'], image: projectImage('fitness-tracker'), category: 'ai' },
    { id: 'konnect-ai', title: 'Konnect AI', company: 'LablabAI · Falcon Hackathon', description: 'AI networking tool built in 48 hours among 200+ teams at the LablabAI Falcon Hackathon.', tags: ['AI', 'Hackathon', 'Networking'], image: projectImage('konnect-ai'), category: 'ai' },
    { id: 'ai-voice-agent', title: 'AI Voice Agent', company: 'RHM Innovations · Enterprise AI', description: 'Conversational voice AI agent for enterprise lead qualification. Boosted response rates by 30% with intelligent routing.', tags: ['Voice AI', 'Conversational AI', 'Enterprise'], image: projectImage('ai-voice-agent'), category: 'ai' },
    { id: 'ai-executive-dashboard', title: 'AI Executive Analytics Dashboard', company: 'Enterprise Intelligence Platform', description: 'AI-powered executive dashboard with natural language queries, anomaly detection, and predictive analytics for C-suite decisions.', tags: ['AI Analytics', 'Executive BI', 'NLP'], image: projectImage('ai-executive-dashboard'), category: 'ai' },
  ],
};

function matchesCategory(item: PortfolioItem, category: ProjectCategory): boolean {
  if (category === 'marketing') return item.category === 'marketing' || item.category === 'product';
  return item.category === category;
}

interface Props {
  onProjectClick: (id: string) => void;
}

export default function ProjectsSection({ onProjectClick }: Props) {
  const [active, setActive] = useState<ProjectCategory>('ai');
  const [dbItems, setDbItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { isDynamic } = useMotion();

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    supabase
      .from('portfolio_items')
      .select('*')
      .eq('published', true)
      .order('sort_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setDbItems(data as PortfolioItem[]);
        setLoading(false);
      });
  }, []);

  const items = (() => {
    const fromDb = dbItems.filter(i => matchesCategory(i, active));
    return fromDb.length > 0 ? fromDb : fallback[active];
  })();

  const activeMeta = PROJECT_CATEGORIES.find(c => c.id === active)!;
  const ActiveIcon = activeMeta.icon;

  return (
    <section id="projects" className="section section--story">
      <div className="container">
        <SectionHeader
          chapter="03"
          label="Projects"
          title="What I've built"
          desc="Case studies across AI, marketing, and analytics."
        />

        <Reveal delay={2}>
          <div className="proj-tabs proj-tabs--3" role="tablist" aria-label="Project categories">
            {PROJECT_CATEGORIES.map(({ id, label, desc, icon: Icon, hue }) => {
              const count = (dbItems.length ? dbItems : Object.values(fallback).flat()).filter(i =>
                matchesCategory(i as PortfolioItem, id)
              ).length;
              return (
                <button
                  key={id}
                  role="tab"
                  aria-selected={active === id}
                  className={`proj-tab proj-tab--${hue}${active === id ? ' active' : ''}`}
                  onClick={() => setActive(id)}
                >
                  <span className="proj-tab-top">
                    <Icon size={15} className="proj-tab-icon" />
                    <span className="proj-tab-count">{count}</span>
                  </span>
                  <span className="proj-tab-label">{label}</span>
                  <span className="proj-tab-desc">{desc}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <div className={`proj-category-banner proj-category-banner--${activeMeta.hue}${isDynamic ? ' panel-enter' : ''}`} key={active}>
          <ActiveIcon size={18} />
          <span>{activeMeta.label} portfolio</span>
        </div>

        {loading ? (
          <div className="proj-loading">
            <Loader size={20} className="spinner" />
          </div>
        ) : (
          <div className={`proj-grid proj-grid--${active}${isDynamic ? ' panel-enter' : ''}`}>
            {items.map((project, i) => (
              <Reveal key={project.id} delay={Math.min(i + 1, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6}>
                <article
                  className={`proj-card proj-card--${active}${i === 0 && active === 'ai' ? ' proj-card--hero' : ''}`}
                  data-category={active}
                >
                  <button className="proj-card-btn" onClick={() => onProjectClick(project.id)}>
                    <div className="proj-card-img">
                      {project.image && <img src={project.image} alt={project.title} loading="lazy" />}
                      <div className="proj-card-shade" />
                      <div className="proj-card-overlay">
                        <span>View case study <ArrowRight size={13} /></span>
                      </div>
                    </div>
                    <div className="proj-card-body">
                      <div className="proj-card-tags">
                        {(Array.isArray(project.tags) ? project.tags : []).map((t, j) => <span key={j}>{t}</span>)}
                      </div>
                      <h3 className="proj-card-title">{project.title}</h3>
                      <p className="proj-card-company">{project.company}</p>
                      <p className="proj-card-desc">{project.description}</p>
                    </div>
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
