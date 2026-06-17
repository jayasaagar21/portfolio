import { useEffect, useState } from 'react';
import { ArrowRight, Loader } from 'lucide-react';
import { supabase, type PortfolioItem } from '../lib/supabase';
import { useInView } from '../hooks/useInView';
import { projectImage } from '../data/projectImages';

type Category = 'product' | 'marketing' | 'analytics' | 'ai';

const categories: { id: Category; label: string; desc: string }[] = [
  { id: 'product', label: 'Product', desc: 'Apps, AI products, end-to-end PM' },
  { id: 'marketing', label: 'Marketing', desc: 'GTM, brand, performance campaigns' },
  { id: 'analytics', label: 'Data Analytics', desc: 'BI, dashboards, data decisions' },
  { id: 'ai', label: 'AI', desc: 'Agents, voice AI, intelligent systems' },
];

const fallback: Record<Category, Pick<PortfolioItem, 'id' | 'title' | 'company' | 'description' | 'tags' | 'image' | 'category'>[]> = {
  product: [
    { id: 'pascal', title: 'Pascal — Healthy Living App', company: 'Google Play · Health Tech', description: 'Full product ownership of a consumer health app. 500 downloads, 4.5-star rating on Google Play.', tags: ['Mobile', 'Health Tech', 'Android'], image: projectImage('pascal'), category: 'product' },
  ],
  marketing: [
    { id: 'ankura-homes', title: 'Product Marketing Strategy', company: 'Ankura Homes · Real Estate', description: 'Full-funnel digital marketing — SEO, content, paid ads. 300% growth in qualified leads, 45% reduction in CAC.', tags: ['GTM', 'SEO', 'Performance Marketing'], image: projectImage('ankura-homes'), category: 'marketing' },
    { id: 'pandemic-innovation', title: 'Pandemic Innovation Initiative', company: 'Community Health Response', description: 'Virtual hospital queue system during COVID-19. Awareness campaigns across 15+ hospitals.', tags: ['Social Impact', 'Healthcare', 'Crisis'], image: projectImage('pandemic-innovation'), category: 'marketing' },
  ],
  analytics: [
    { id: 'powerbi-analytics', title: 'Data Analytics Platform', company: 'Power BI + AI Integration', description: 'Self-service BI platform with natural language queries and AI insights. 75% reduced analysis time, 5K+ daily users.', tags: ['Power BI', 'Azure', 'NLP'], image: projectImage('powerbi-analytics'), category: 'analytics' },
    { id: 'water-drought-analysis', title: 'U.S. Water Shortage & Drought Risk Analysis', company: 'University at Buffalo · Academic Project', description: 'Predictive framework analyzing 28,142 U.S. locations using land-use, soil, and geographic data. Linear Regression achieved R² of 0.99996. Identified the South as highest-risk region, challenging conventional assumptions.', tags: ['Python', 'Machine Learning', 'Predictive Modeling', 'Feature Engineering'], image: projectImage('water-drought-analysis'), category: 'analytics' },
  ],
  ai: [
    { id: 'fitness-tracker', title: 'Agentic AI Fitness Tracker', company: 'Personal Project · AI', description: 'AI-powered fitness tracker using agentic planning to adapt workout and nutrition plans in real-time.', tags: ['Agentic AI', 'Health', 'LLM'], image: projectImage('fitness-tracker'), category: 'ai' },
    { id: 'konnect-ai', title: 'Konnect AI', company: 'LablabAI · Falcon Hackathon', description: 'AI networking tool built in 48 hours among 200+ teams at the LablabAI Falcon Hackathon.', tags: ['AI', 'Hackathon', 'Networking'], image: projectImage('konnect-ai'), category: 'ai' },
    { id: 'ai-voice-agent', title: 'AI Voice Agent', company: 'RHM Innovations · Enterprise AI', description: 'Conversational voice AI agent for enterprise lead qualification and customer engagement. Boosted response rates by 30% with intelligent routing and real-time call handling.', tags: ['Voice AI', 'Conversational AI', 'Enterprise'], image: projectImage('ai-voice-agent'), category: 'ai' },
    { id: 'ai-executive-dashboard', title: 'AI Executive Analytics Dashboard', company: 'Enterprise Intelligence Platform', description: 'AI-powered executive dashboard delivering real-time business insights through natural language queries, automated anomaly detection, and predictive analytics for C-suite decision-making.', tags: ['AI Analytics', 'Executive BI', 'NLP'], image: projectImage('ai-executive-dashboard'), category: 'ai' },
  ],
};

interface Props {
  onProjectClick: (id: string) => void;
}

export default function ProjectsSection({ onProjectClick }: Props) {
  const [active, setActive] = useState<Category>('product');
  const [dbItems, setDbItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { ref, inView } = useInView(0.1);

  useEffect(() => {
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
    const fromDb = dbItems.filter(i => i.category === active);
    return fromDb.length > 0 ? fromDb : fallback[active];
  })();

  return (
    <section id="projects" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header fade-up${inView ? ' visible' : ''}`}>
          <p className="section-label">Projects</p>
          <h2 className="section-title">What I've built</h2>
          <p className="section-desc">Case studies across product, marketing, and analytics.</p>
        </div>

        <div className={`proj-tabs fade-up stagger-1${inView ? ' visible' : ''}`}>
          {categories.map(({ id, label, desc }) => (
            <button key={id} className={`proj-tab${active === id ? ' active' : ''}`} onClick={() => setActive(id)}>
              <span className="proj-tab-label">{label}</span>
              <span className="proj-tab-desc">{desc}</span>
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '48px 0' }}>
            <Loader size={20} className="spinner" style={{ color: 'var(--grey-400)' }} />
          </div>
        ) : (
          <div className="proj-grid">
            {items.map((project, i) => (
              <div key={project.id} className={`proj-card fade-up stagger-${Math.min(i + 2, 6)}${inView ? ' visible' : ''}`}>
                <button className="proj-card-btn" onClick={() => onProjectClick(project.id)}>
                  <div className="proj-card-img">
                    {project.image && <img src={project.image} alt={project.title} loading="lazy" />}
                    <div className="proj-card-overlay">
                      <span>View <ArrowRight size={13} /></span>
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
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
