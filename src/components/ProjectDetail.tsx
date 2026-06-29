import { ArrowLeft, ExternalLink } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { supabase } from '../lib/supabase';
import { FEATURED_PROJECTS, PROJECT_CATEGORIES } from '../data/portfolioContent';
import { projectImage } from '../data/projectImages';
import Reveal from './Reveal';

interface Props {
  projectId: string | null;
  onBack: () => void;
}

type ProjectDetailData = {
  title: string;
  company: string;
  role: string;
  timeline: string;
  platform: string;
  overview: string;
  problem: string;
  solution: string;
  features: { title: string; description: string }[];
  metrics: { value: string; label: string }[];
  technologies: string;
  learnings: string;
  image: string;
  demoUrl?: string;
  demoLabel?: string;
  hasCaseStudy?: boolean;
  category?: string;
  tags?: string[];
  outcome?: string;
};

const hardcoded: Record<string, ProjectDetailData> = {
  'executive-ai-dashboard': {
    title: 'Executive AI Analytics Dashboard',
    company: 'Campaign & Lead Intelligence',
    role: 'Product Manager',
    timeline: '2026',
    platform: 'Web Application',
    overview:
      'A dashboard that converts campaign and lead reports into analytics with AI-recommended insights — so leaders spend less time interpreting data and more time acting on it.',
    problem: 'Executives wait on analysts to turn raw campaign and lead reports into decisions. Reporting cycles are slow and insights arrive too late.',
    solution:
      'Built an AI layer that ingests reports, surfaces key metrics automatically, and recommends next actions for faster reporting and decision-making.',
    features: [
      { title: 'Report-to-Analytics Pipeline', description: 'Campaign and lead data converted into clear visual summaries' },
      { title: 'AI Recommendations', description: 'Suggested actions based on trends in campaigns and lead quality' },
      { title: 'Executive View', description: 'One screen for leaders who need answers, not spreadsheets' },
    ],
    metrics: [
      { value: 'Faster', label: 'Reporting cycles' },
      { value: 'AI', label: 'Recommended insights' },
      { value: '1', label: 'Decision view' },
    ],
    technologies: 'AI/ML, Analytics, Dashboards, NLP',
    learnings: 'Users adopt dashboards when the first screen answers their question — not when it shows every metric.',
    image: projectImage('executive-ai-dashboard', true),
    demoUrl: 'https://lnkd.in/e4khpJAE',
    demoLabel: 'View dashboard',
  },
  'standup-ai': {
    title: 'StandupAI',
    company: 'AI Prototype',
    role: 'Product Lead',
    timeline: '2026',
    platform: 'AI Prototype',
    overview:
      'A live AI bot that runs standups and assigns tasks in real time — reducing meeting time from hours to minutes.',
    problem: 'Teams lose hours in standups that repeat status updates without clear ownership or follow-through.',
    solution:
      'An AI facilitator that captures updates, assigns tasks on the spot, and keeps everyone aligned without a long meeting.',
    features: [
      { title: 'Live Standup Bot', description: 'Runs meetings with structured prompts and real-time capture' },
      { title: 'Task Assignment', description: 'Action items assigned during the session, not after' },
      { title: 'Time Savings', description: 'Designed to cut standup duration dramatically' },
    ],
    metrics: [
      { value: 'Hours→Min', label: 'Meeting time' },
      { value: 'Live', label: 'AI facilitation' },
      { value: 'Real-time', label: 'Task assignment' },
    ],
    technologies: 'Agentic AI, Voice/NLP, Task Automation',
    learnings: 'The best meeting tool is one that respects people\'s time and leaves everyone knowing what happens next.',
    image: projectImage('standup-ai', true),
    demoUrl: 'https://drive.google.com/file/d/1WST6DVlABAu1WWJOoSK9V9RG6KAvIEqT/view?usp=sharing',
    demoLabel: 'View prototype',
  },
  'student-housing-copilot': {
    title: 'Next Gen Student Housing Co-pilot',
    company: 'AI Chatbot',
    role: 'Product Manager',
    timeline: '2026',
    platform: 'Conversational AI',
    overview: 'An AI chatbot that makes housing and campus life easier for students — answers, guidance, and support in one place.',
    problem: 'Students navigate housing and campus logistics through scattered portals, emails, and office hours.',
    solution: 'A co-pilot that answers housing questions, guides next steps, and reduces the friction of campus life.',
    features: [
      { title: 'Housing Guidance', description: 'Help finding options, deadlines, and requirements' },
      { title: 'Campus Support', description: 'Answers about life on campus in natural language' },
      { title: 'Always Available', description: 'Support when offices are closed or queues are long' },
    ],
    metrics: [
      { value: '24/7', label: 'Student access' },
      { value: '1', label: 'Conversation entry point' },
      { value: 'Less', label: 'Campus friction' },
    ],
    technologies: 'LLM, Chatbot, Student Experience Design',
    learnings: 'Students need clarity fast — the interface should feel like asking a helpful upperclassman, not filing a ticket.',
    image: projectImage('student-housing-copilot', true),
    demoUrl: 'https://vimeo.com/1130603790?share=copy&fl=sv&fe=c',
    demoLabel: 'Watch demo',
  },
  'ai-analytics-paper': {
    title: 'Experimenting AI with Data Analytics',
    company: 'International Business Analytics · Selected Abstract',
    role: 'Research Author',
    timeline: '2026',
    platform: 'Academic Research',
    overview:
      'Selected abstract exploring how AI and data analytics combine to turn complex business data into actionable research insights.',
    problem: 'Business analytics research often struggles to connect experimental AI methods with decisions practitioners can use.',
    solution: 'A structured exploration of AI experimentation within analytics workflows, submitted as a selected abstract.',
    features: [
      { title: 'AI + Analytics Framework', description: 'Methods for applying AI to business analytics problems' },
      { title: 'Research Rigor', description: 'Academic approach with practical implications' },
      { title: 'Selected Abstract', description: 'Recognized for International Business Analytics' },
    ],
    metrics: [
      { value: 'Selected', label: 'Abstract' },
      { value: 'AI', label: 'Experimentation' },
      { value: 'Analytics', label: 'Focus area' },
    ],
    technologies: 'Data Analytics, AI Research, Business Analytics',
    learnings: 'Research matters most when it helps someone make a better decision — not when it stays in a paper.',
    image: projectImage('ai-analytics-paper', true),
    demoUrl: 'https://drive.google.com/file/d/1TGXOPtKYQKDycYKO22fSuhcUGIIFjowR/view?usp=sharing',
    demoLabel: 'Read paper',
    hasCaseStudy: true,
  },
  'fmcg-commercial-ad': {
    title: 'Commercial Ad for FMCG',
    company: 'Cricket Chips · Brand Film',
    role: 'Creative / Marketing',
    timeline: '2026',
    platform: 'Video · Brand Campaign',
    overview:
      'A cinematic, eco-conscious snack ad that positions Cricket Chips as a premium fitness fuel for health-conscious buyers.',
    problem: 'Eco-conscious snacks often feel niche or preachy — they fail to connect with mainstream fitness audiences.',
    solution:
      'A brand film that blends cinematic storytelling with a clear product promise: sustainable snacking that fuels performance.',
    features: [
      { title: 'Cinematic Storytelling', description: 'Premium film craft for an FMCG category' },
      { title: 'Eco-Conscious Positioning', description: 'Sustainability woven into the product story' },
      { title: 'Fitness Fuel Angle', description: 'Cricket Chips framed as performance snacking' },
    ],
    metrics: [
      { value: 'Brand', label: 'Film format' },
      { value: 'Eco', label: 'Conscious angle' },
      { value: 'FMCG', label: 'Category' },
    ],
    technologies: 'Brand Strategy, Creative Direction, Video Marketing',
    learnings: 'Great FMCG creative starts with the person holding the product — what they want to feel, not just what they want to buy.',
    image: projectImage('fmcg-commercial-ad', true),
    demoUrl: 'https://drive.google.com/file/d/1haXtxQ1a7le2lhG-HCB_5Cdzw1G8TB86/view?usp=sharing',
    demoLabel: 'Watch ad',
  },
};

export default function ProjectDetail({ projectId, onBack }: Props) {
  const [project, setProject] = useState<ProjectDetailData | null>(null);

  const featured = useMemo(
    () => FEATURED_PROJECTS.find(p => p.id === projectId),
    [projectId]
  );

  useEffect(() => {
    if (!projectId) return;

    if (hardcoded[projectId]) {
      const base = hardcoded[projectId];
      const card = FEATURED_PROJECTS.find(p => p.id === projectId);
      setProject({
        ...base,
        category: card?.category,
        tags: card?.tags,
        outcome: card?.outcome,
        hasCaseStudy: card?.hasCaseStudy ?? base.hasCaseStudy,
      });
      return;
    }

    supabase
      .from('portfolio_items')
      .select('*')
      .eq('id', projectId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setProject(data as unknown as ProjectDetailData);
      });
  }, [projectId]);

  if (!project) {
    return (
      <div className="detail">
        <button onClick={onBack} className="detail-back">
          <ArrowLeft size={15} /> Back
        </button>
        <p>Project not found.</p>
      </div>
    );
  }

  const categoryLabel = project.category
    ? PROJECT_CATEGORIES.find(c => c.id === project.category)?.label
    : featured?.category
      ? PROJECT_CATEGORIES.find(c => c.id === featured.category)?.label
      : undefined;

  return (
    <div className="detail">
      <Reveal>
        <button onClick={onBack} className="detail-back">
          <ArrowLeft size={15} /> Back to projects
        </button>
      </Reveal>

      <Reveal delay={1}>
        <div className="detail-head">
          {categoryLabel && (
            <span className={`detail-cat detail-cat--${project.category ?? featured?.category}`}>
              {categoryLabel}
            </span>
          )}
          <p className="detail-eyebrow">{project.hasCaseStudy ? 'Case study' : 'Project'}</p>
          <h1 className="detail-title">{project.title}</h1>
          <p className="detail-company">{project.company}</p>
          {(project.outcome ?? featured?.outcome) && (
            <p className="detail-outcome">{project.outcome ?? featured?.outcome}</p>
          )}
        </div>
      </Reveal>

      <Reveal delay={2}>
        <dl className="detail-meta">
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>
          <div><dt>Platform</dt><dd>{project.platform}</dd></div>
        </dl>
      </Reveal>

      {(project.tags ?? featured?.tags)?.length ? (
        <Reveal delay={2}>
          <div className="detail-tags">
            {(project.tags ?? featured?.tags)?.map(tag => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
        </Reveal>
      ) : null}

      {project.demoUrl && (
        <Reveal delay={2}>
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-video-link"
          >
            {project.demoLabel ?? 'View project'} <ExternalLink size={14} />
          </a>
        </Reveal>
      )}

      <Reveal delay={3}>
        <div className="detail-img">
          <img src={project.image} alt={project.title} />
        </div>
      </Reveal>

      <Reveal delay={1}>
        <section className="detail-section">
          <h2>Overview</h2>
          <p>{project.overview}</p>
        </section>
      </Reveal>

      <Reveal delay={2}>
        <section className="detail-section">
          <h2>Problem</h2>
          <p>{project.problem}</p>
        </section>
      </Reveal>

      <Reveal delay={3}>
        <section className="detail-section">
          <h2>Solution</h2>
          <p>{project.solution}</p>
        </section>
      </Reveal>

      {project.features?.length > 0 && (
        <Reveal delay={1}>
          <section className="detail-section">
            <h2>Key Features</h2>
            <div className="detail-features">
              {project.features.map((f, i) => (
                <div key={i} className="detail-feature">
                  <h3>{f.title}</h3>
                  <p>{f.description}</p>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {project.metrics?.length > 0 && (
        <Reveal delay={2}>
          <section className="detail-section">
            <h2>Results</h2>
            <div className="detail-metrics">
              {project.metrics.map((m, i) => (
                <div key={i} className="detail-metric">
                  <div className="detail-metric-val">{m.value}</div>
                  <div className="detail-metric-lbl">{m.label}</div>
                </div>
              ))}
            </div>
          </section>
        </Reveal>
      )}

      {project.technologies && (
        <Reveal delay={3}>
          <section className="detail-section">
            <h2>Technologies</h2>
            <div className="detail-tech">
              {project.technologies.split(',').map((t, i) => <span key={i}>{t.trim()}</span>)}
            </div>
          </section>
        </Reveal>
      )}

      {project.learnings && (
        <Reveal delay={4}>
          <section className="detail-section detail-section--last">
            <h2>Learnings</h2>
            <p>{project.learnings}</p>
          </section>
        </Reveal>
      )}
    </div>
  );
}
