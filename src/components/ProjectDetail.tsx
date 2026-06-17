import { ArrowLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { projectImage } from '../data/projectImages';
import Reveal from './Reveal';

interface Props {
  projectId: string | null;
  onBack: () => void;
}

const hardcoded: Record<string, { title: string; company: string; role: string; timeline: string; platform: string; overview: string; problem: string; solution: string; features: { title: string; description: string }[]; metrics: { value: string; label: string }[]; technologies: string; learnings: string; image: string; video?: string }> = {
  pascal: {
    title: 'Pascal — Healthy Living',
    company: 'Google Play',
    role: 'Lead Product Manager',
    timeline: '6 months',
    platform: 'Android',
    overview: 'A comprehensive health and wellness application helping users maintain balanced lifestyles through personalized recommendations, activity tracking, and community support.',
    problem: 'Users struggle to maintain consistent healthy habits due to lack of personalization and actionable insights from their health data.',
    solution: 'Developed an AI-powered mobile app with personalized recommendations, gamified challenges, and social features.',
    features: [
      { title: 'Personalized Health Plans', description: 'AI-driven recommendations based on user goals and health data' },
      { title: 'Activity Tracking', description: 'Tracking of physical activities, nutrition, and sleep' },
      { title: 'Community Challenges', description: 'Group challenges and achievement sharing' },
      { title: 'Smart Notifications', description: 'Context-aware reminders and motivational messages' },
    ],
    metrics: [{ value: '500', label: 'Downloads' }, { value: '4.5', label: 'Star Rating' }, { value: '70%', label: 'Retention' }],
    technologies: 'React Native, Node.js, MongoDB, TensorFlow, Firebase',
    learnings: 'Balancing feature complexity with user experience. We initially over-built, then simplified onboarding through iterative testing — significantly improving retention.',
    image: projectImage('pascal', true),
  },
  'fitness-tracker': {
    title: 'Agentic AI Fitness Tracker',
    company: 'AI-Powered Health Platform',
    role: 'Product Manager & AI Strategist',
    timeline: '8 months',
    platform: 'Web & Mobile',
    overview: 'An intelligent fitness platform using agentic AI to create dynamic, personalized workout plans that adapt in real-time to user progress.',
    problem: 'Traditional fitness apps provide static plans that do not adapt to progress or life changes, causing plateaus.',
    solution: 'Built an agentic AI system acting as a personal trainer — learning from behaviour to dynamically adjust intensity and recovery.',
    features: [
      { title: 'Adaptive Training Plans', description: 'AI agents modify routines based on performance and recovery' },
      { title: 'Recovery Management', description: 'Automatic detection of overtraining' },
      { title: 'Nutrition Optimization', description: 'Meal planning adapting to training load' },
      { title: 'Predictive Analytics', description: 'Goal forecasting and milestone tracking' },
    ],
    metrics: [{ value: '3x', label: 'Goal Achievement' }, { value: '92%', label: 'Satisfaction' }, { value: '67%', label: 'Fewer Injuries' }],
    technologies: 'Python, LangChain, GPT-4, React, FastAPI, PostgreSQL',
    learnings: 'Agentic AI requires defining guardrails instead of rigid flows — letting the system make decisions while maintaining safety.',
    image: projectImage('fitness-tracker', true),
  },
  'konnect-ai': {
    title: 'Konnect AI',
    company: 'LablabAI · Falcon Hackathon',
    role: 'Product Lead',
    timeline: '48 hours',
    platform: 'Web Application',
    overview: 'AI-powered networking platform helping professionals make meaningful connections by analyzing interests, skills, and goals.',
    problem: 'Networking platforms produce superficial connections — people lack context for meaningful conversations.',
    solution: 'AI that analyzes profiles and goals to provide personalized networking recommendations and conversation starters.',
    features: [
      { title: 'Smart Matching', description: 'AI analysis of profiles to identify high-value connections' },
      { title: 'Conversation Starters', description: 'Context-aware ice breakers based on shared interests' },
      { title: 'Network Insights', description: 'Visualization of gaps and growth opportunities' },
      { title: 'Follow-up Reminders', description: 'Intelligent scheduling with personalized messages' },
    ],
    metrics: [{ value: '200+', label: 'Competing Teams' }, { value: '48h', label: 'Build Time' }, { value: '4', label: 'Key Features' }],
    technologies: 'Falcon LLM, React, Node.js, Neo4j, OpenAI',
    learnings: 'Ruthless prioritization. With 48 hours we focused on one core proposition and executed it perfectly.',
    image: projectImage('konnect-ai', true),
  },
  'powerbi-analytics': {
    title: 'Data Analytics Platform',
    company: 'Power BI + AI Integration',
    role: 'Product Manager',
    timeline: '7 months',
    platform: 'Enterprise Cloud',
    overview: 'Integrated analytics combining traditional BI with AI-powered insights for data-driven decisions without technical expertise.',
    problem: 'Business users depend on data teams for insights. Traditional BI requires technical knowledge and delivers insights too late.',
    solution: 'Self-service platform integrating Power BI with natural language querying and automated insight generation.',
    features: [
      { title: 'Natural Language Queries', description: 'Ask questions in English, get visualizations' },
      { title: 'Automated Insights', description: 'AI-generated anomaly detection' },
      { title: 'Predictive Analytics', description: 'Forecasting and scenario analysis' },
      { title: 'Collaborative Dashboards', description: 'Real-time collaboration with commenting' },
    ],
    metrics: [{ value: '75%', label: 'Less Analysis Time' }, { value: '5K+', label: 'Daily Users' }, { value: '40%', label: 'More Data Decisions' }],
    technologies: 'Power BI, Azure, Python, GPT-4, Azure Cognitive Services',
    learnings: 'Understanding user workflows deeply. Simplifying data connectivity had far more impact than sophisticated algorithms.',
    image: projectImage('powerbi-analytics', true),
  },
  'water-drought-analysis': {
    title: 'U.S. Water Shortage & Drought Risk Analysis',
    company: 'University at Buffalo · School of Management',
    role: 'Individual Contributor',
    timeline: 'Spring 2026',
    platform: 'Python (scikit-learn, pandas, scipy)',
    overview: 'Predictive framework translating environmental data into actionable drought intelligence by analyzing 28,142 U.S. locations across four census regions using forest cover, industrial proximity, and soil classification data.',
    problem: 'Many regions lack integrated early-warning systems. Real-time precipitation data is often incomplete or prohibitively expensive, leaving planners without forward-looking risk assessments.',
    solution: 'Engineered proxy risk variables from land-use and soil data to build a precipitation-free predictive model. Compared four regression algorithms and produced region-by-region risk rankings with two-year forward projections.',
    features: [
      { title: 'Feature Engineering', description: 'Four proxy risk components (Forest, Industry, Soil, Latitude) normalized and weighted by theoretical contribution' },
      { title: 'Multi-Model Comparison', description: 'Linear Regression, Ridge, Random Forest, and Gradient Boosting evaluated with cross-validation' },
      { title: 'Regional Risk Profiling', description: 'State-level hotspot identification revealing the South as highest-risk, challenging conventional narratives' },
      { title: 'Scenario Forecasting', description: 'Two-year forward projections under moderate and severe climate shift scenarios' },
    ],
    metrics: [{ value: '0.99996', label: 'R-Squared' }, { value: '28,142', label: 'Locations Analyzed' }, { value: '4', label: 'Models Compared' }],
    technologies: 'Python, pandas, scikit-learn, scipy, matplotlib, seaborn',
    learnings: 'Land-use and soil characteristics contain sufficient signal to function as standalone predictors when hydrological data is unavailable. Forest cover emerged as the dominant driver, reframing conservation as a water security investment.',
    image: projectImage('water-drought-analysis', true),
  },
  'ai-voice-agent': {
    title: 'AI Voice Agent',
    company: 'RHM Innovations · Enterprise AI',
    role: 'Growth Strategy PM Intern',
    timeline: '2026',
    platform: 'Web & Telephony',
    overview: 'Conversational voice AI agent designed for enterprise lead qualification and customer engagement. Combines natural language understanding with intelligent call routing for real-time interactions.',
    problem: 'Enterprise sales teams waste significant time on unqualified leads. Manual outreach has low response rates and inconsistent follow-up.',
    solution: 'Built a voice AI agent that handles initial customer interactions, qualifies leads through conversation, and routes high-intent prospects to sales reps with full context.',
    features: [
      { title: 'Natural Conversation', description: 'Human-like voice interactions with contextual understanding' },
      { title: 'Lead Qualification', description: 'Automated scoring and routing based on conversational signals' },
      { title: 'Intelligent Routing', description: 'Real-time handoff to appropriate sales reps with conversation summary' },
      { title: 'CRM Integration', description: 'Automatic logging and pipeline updates in HubSpot' },
    ],
    metrics: [{ value: '30%', label: 'Higher Response Rate' }, { value: '2x', label: 'Lead Qualification Speed' }, { value: '45%', label: 'Better Conversion' }],
    technologies: 'Voice AI, NLP, HubSpot, CRM APIs, Real-time Processing',
    learnings: 'Voice AI adoption depends on trust. Users need to feel the AI understands context before they engage meaningfully. Gradual disclosure of AI nature increased engagement.',
    image: projectImage('ai-voice-agent', true),
    video: 'https://player.vimeo.com/video/1130603790',
  },
  'ai-executive-dashboard': {
    title: 'AI Executive Analytics Dashboard',
    company: 'Enterprise Intelligence Platform',
    role: 'Product Manager',
    timeline: '2026',
    platform: 'Web Application',
    overview: 'AI-powered executive dashboard delivering real-time business insights through natural language queries, automated anomaly detection, and predictive analytics tailored for C-suite decision-making.',
    problem: 'Executives need instant answers but traditional dashboards require navigation and interpretation. Critical anomalies go unnoticed until quarterly reviews.',
    solution: 'Built an AI layer on top of business data that proactively surfaces insights, answers natural language questions, and predicts trends before they impact the bottom line.',
    features: [
      { title: 'Natural Language Queries', description: 'Ask business questions in plain English and receive instant visualizations' },
      { title: 'Proactive Anomaly Detection', description: 'AI alerts executives to unusual patterns before they escalate' },
      { title: 'Predictive Forecasting', description: 'Revenue, churn, and pipeline projections with confidence intervals' },
      { title: 'Executive Summaries', description: 'AI-generated daily briefs tailored to each executive role' },
    ],
    metrics: [{ value: '80%', label: 'Faster Insights' }, { value: '3x', label: 'More Data-Driven Decisions' }, { value: '95%', label: 'Exec Adoption' }],
    technologies: 'AI/ML, NLP, React, Python, Cloud Analytics, Real-time Data',
    learnings: 'Executive tools must be zero-friction. The moment a dashboard requires more than one click or a typed question, adoption drops. Proactive push beats reactive pull.',
    image: projectImage('ai-executive-dashboard', true),
    video: 'https://vimeo.com/1139691359/c3a440b1a6?fl=ip&fe=ec',
  },
  'pandemic-innovation': {
    title: 'Pandemic Innovation Initiative',
    company: 'Hospital Queue Management',
    role: 'Product Strategist',
    timeline: '3 months',
    platform: 'Mobile & Web',
    overview: 'Rapid-response digital solution helping hospitals manage queues, reduce wait times, and minimize infection risk.',
    problem: 'Hospitals faced overcrowding and high infection risk from physical queues during COVID-19.',
    solution: 'Virtual queue management — remote check-in, real-time updates, and notification when ready.',
    features: [
      { title: 'Remote Check-in', description: 'Queue from home via mobile' },
      { title: 'Real-time Updates', description: 'Live wait time and position tracking' },
      { title: 'Smart Notifications', description: 'SMS and push alerts for readiness' },
      { title: 'Admin Dashboard', description: 'Hospital flow monitoring and optimization' },
    ],
    metrics: [{ value: '60%', label: 'Less Wait Time' }, { value: '15+', label: 'Hospitals' }, { value: '50K+', label: 'Patients' }],
    technologies: 'React Native, Node.js, PostgreSQL, Twilio, Firebase',
    learnings: 'Rapid execution and simplicity. Shipped MVP in 3 weeks by focusing ruthlessly on core functionality.',
    image: projectImage('pandemic-innovation', true),
  },
  'ankura-homes': {
    title: 'Product Marketing Strategy',
    company: 'Ankura Homes · Real Estate Tech',
    role: 'Sr. Product Marketing Analyst',
    timeline: '6 months',
    platform: 'Digital Marketing',
    overview: 'Comprehensive product marketing strategy for a real estate tech company — customer acquisition, brand positioning, and digital transformation.',
    problem: 'Traditional real estate marketing relies on offline channels and lacks data-driven insights.',
    solution: 'Integrated digital marketing strategy: content, SEO, social media, and analytics for leads and conversion.',
    features: [
      { title: 'Content Strategy', description: 'Thought leadership positioning in real estate' },
      { title: 'SEO Optimization', description: 'Technical and content SEO for local searches' },
      { title: 'Performance Marketing', description: 'Data-driven campaigns on Google, Facebook, LinkedIn' },
      { title: 'Marketing Analytics', description: 'Custom ROI, CAC, and conversion dashboards' },
    ],
    metrics: [{ value: '300%', label: 'More Leads' }, { value: '150%', label: 'Traffic Growth' }, { value: '45%', label: 'Lower CAC' }],
    technologies: 'Google Analytics, HubSpot, SEMrush, Google Ads, Power BI',
    learnings: 'Customer psychology matters. In real estate the decision is long and emotional — addressing concerns at each funnel stage outperforms generic promotion.',
    image: projectImage('ankura-homes', true),
  },
};

export default function ProjectDetail({ projectId, onBack }: Props) {
  const [project, setProject] = useState<typeof hardcoded[string] | null>(null);

  useEffect(() => {
    if (!projectId) return;

    if (hardcoded[projectId]) {
      setProject(hardcoded[projectId]);
      return;
    }

    supabase
      .from('portfolio_items')
      .select('*')
      .eq('id', projectId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setProject(data as unknown as typeof hardcoded[string]);
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

  return (
    <div className="detail">
      <Reveal>
        <button onClick={onBack} className="detail-back">
          <ArrowLeft size={15} /> Back to projects
        </button>
      </Reveal>

      <Reveal delay={1}>
        <p className="detail-eyebrow">Case study</p>
        <h1 className="detail-title">{project.title}</h1>
      </Reveal>

      <Reveal delay={2}>
        <dl className="detail-meta">
          <div><dt>Company</dt><dd>{project.company}</dd></div>
          <div><dt>Role</dt><dd>{project.role}</dd></div>
          <div><dt>Timeline</dt><dd>{project.timeline}</dd></div>
          <div><dt>Platform</dt><dd>{project.platform}</dd></div>
        </dl>
      </Reveal>

      <Reveal delay={3}>
        <div className="detail-img">
          <img src={project.image} alt={project.title} />
        </div>
      </Reveal>

      {project.video && (
        <Reveal delay={1}>
          <section className="detail-section">
            <h2>Demo Video</h2>
            <a href={project.video} target="_blank" rel="noopener noreferrer" className="detail-video-link">
              Watch Demo Video
            </a>
          </section>
        </Reveal>
      )}

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
