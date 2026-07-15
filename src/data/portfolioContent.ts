import type { LucideIcon } from 'lucide-react';
import { BarChart2, Brain, GraduationCap, Megaphone, Sparkles } from 'lucide-react';
import { projectImage } from './projectImages';

export type ProjectCategory = 'ai' | 'marketing' | 'analytics';

export const PROJECT_CATEGORIES: {
  id: ProjectCategory;
  label: string;
  desc: string;
  icon: LucideIcon;
  hue: string;
}[] = [
  { id: 'ai', label: 'AI', desc: 'Agents, voice AI, intelligent systems', icon: Sparkles, hue: 'ai' },
  { id: 'marketing', label: 'Marketing', desc: 'GTM, brand, growth campaigns', icon: Megaphone, hue: 'marketing' },
  { id: 'analytics', label: 'Data Analytics', desc: 'BI, dashboards, data decisions', icon: BarChart2, hue: 'analytics' },
];

export type CertTheme = 'ai' | 'analytics' | 'product' | 'marketing' | 'academic' | 'anthropic' | 'google';

export type CertCourse = {
  course: string;
  skill: string;
};

export type CertProviderGroup = {
  id: string;
  title: string;
  institution: string;
  date: string;
  theme: 'anthropic' | 'google';
  mono: string;
  courses: CertCourse[];
};

export const AI_CERT_PROVIDERS: CertProviderGroup[] = [
  {
    id: 'anthropic',
    title: 'Anthropic AI Certifications',
    institution: 'Anthropic',
    date: 'Mar 2026',
    theme: 'anthropic',
    mono: 'AI',
    courses: [
      { course: 'AI Fluency: Framework & Foundations', skill: 'AI Fluency and Framework Foundations' },
      { course: 'Claude 101', skill: 'Claude Model Proficiency' },
      { course: 'Claude Code 101', skill: 'Foundational AI-Assisted Coding' },
      { course: 'Claude Code in Action', skill: 'Practical Claude Coding Implementation' },
      { course: 'Introduction to agent skills', skill: 'Agentic Workflow Basics' },
      { course: 'Introduction to Claude Cowork', skill: 'Claude Cowork Collaboration' },
    ],
  },
  {
    id: 'google-ai',
    title: 'Google AI Certifications',
    institution: 'Google Digital Academy (Skillshop)',
    date: '2026',
    theme: 'google',
    mono: 'G',
    courses: [
      { course: 'Gen AI Agents: Transform Your Organization', skill: 'Organizational Transformation with Generative AI Agents' },
      { course: 'Gen AI Apps: Transform Your Work', skill: 'Workflow Transformation with Generative AI Applications' },
      { course: 'Gen AI: Navigate the Landscape', skill: 'Generative AI Landscape Navigation' },
      { course: 'Gen AI: Unlock Foundational Concepts', skill: 'Generative AI Foundational Knowledge' },
      { course: 'Gen AI: Beyond the Chatbot', skill: 'Advanced Generative AI Applications' },
    ],
  },
];

export type Certification = {
  id?: string;
  title: string;
  institution: string;
  date: string;
  theme: CertTheme;
  span?: number;
  courses?: CertCourse[];
};

export const CERTIFICATIONS: Certification[] = [
  {
    id: 'iim-udaipur',
    title: 'Advanced Certificate in Business and Data Analytics',
    institution: 'IIM Udaipur',
    date: 'Jul 2025',
    theme: 'analytics',
    span: 6,
    courses: [
      { course: 'Applied Mathematics and Statistics', skill: 'Applied Mathematics and Statistics' },
      { course: 'Business Development Management', skill: 'Business Development Management' },
      { course: 'Marketing Strategy and Analytics', skill: 'Marketing Strategy and Analytics' },
      { course: 'Programming in Business Analytics', skill: 'Programming in Business Analytics' },
    ],
  },
  {
    id: 'outskills',
    title: 'AI Generalist Accelerator Program',
    institution: 'Outskills',
    date: 'Jul 2025',
    theme: 'ai',
    span: 4,
    courses: [
      { course: 'Prompt Engineering', skill: 'Prompt Engineering' },
      { course: 'Workflow Automation', skill: 'Workflow Automation' },
      { course: 'No code product development', skill: 'No-Code Product Development' },
      { course: 'Voice agent Orchestration', skill: 'Voice Agent Orchestration' },
      { course: 'MCP Integration & Deployment', skill: 'MCP Integration and Deployment' },
      { course: 'Multimodal AI & Cloning', skill: 'Multimodal AI and Cloning' },
    ],
  },
  {
    id: 'ipl-product-management',
    title: 'International Certificate in Product Management',
    institution: 'Institute of Product Leadership',
    date: 'Nov 2022',
    theme: 'product',
    span: 6,
    courses: [
      {
        course: 'Customer Insights',
        skill: 'Develop strong customer insights & identify customer needs to define a compelling value proposition',
      },
      {
        course: 'Manage Digital Products',
        skill: 'Launch & Monetize Digital & SaaS Products with strong metrics-driven lifecycle management from acquisition to retention.',
      },
      {
        course: 'UX & Prototyping',
        skill: 'Ability to build a visual prototype to communicate product features & ideas internally and externally with customers.',
      },
      {
        course: 'Agile Roadmapping',
        skill: 'Ability to prioritize requirements to executable release, guide product development lifecycle through Agile, and build market validated roadmaps.',
      },
      {
        course: 'Metrics that Matter',
        skill: 'Understand the various metrics in customer acquisition, retention, and revenue. Define relevant north star metric for a product based on the product life-cycle.',
      },
      {
        course: 'Prioritization',
        skill: 'Apply data-driven prioritization techniques to maintain stakeholder alignment via product backlogs and enhance customer-focused value creation.',
      },
      {
        course: 'Growth Techniques',
        skill: 'Learn growth techniques for customer acquisition by developing a digital marketing plan leveraging social media tools & techniques',
      },
      {
        course: 'Go-To-Market',
        skill: 'Define & Execute GTM strategy by defining personas, positioning, marketing campaigns, and sales channels.',
      },
      {
        course: 'Lean Development',
        skill: 'Learn the practice of experimentation, hypothesis-driven development, data & metrics informed decision making in building B2B & B2C products & services',
      },
      {
        course: 'Product Analytics',
        skill: 'Analytics to track and measure user behavior, product health, and usage issues to make informed decisions in continuous product improvements.',
      },
    ],
  },
  { title: 'Google Digital Marketing', institution: 'Google Digital Garage', date: 'Jun 2020', theme: 'marketing', span: 4 },
];

export const CERT_THEME_META: Record<Exclude<CertTheme, 'anthropic' | 'google'>, { label: string; icon: LucideIcon }> = {
  ai: { label: 'AI', icon: Brain },
  analytics: { label: 'Analytics', icon: BarChart2 },
  product: { label: 'Product', icon: Sparkles },
  marketing: { label: 'Marketing', icon: Megaphone },
  academic: { label: 'Academic', icon: GraduationCap },
};

export function institutionMonogram(name: string): string {
  return name
    .split(/[\s·]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');
}

export function certYear(date: string): string {
  const match = date.match(/\d{4}/);
  return match?.[0] ?? date;
}

export const SITE_EXPERTISE = 'AI · Product · Marketing · Business Analytics';
export const GITHUB_URL = 'https://github.com/jayasaagar21';
export const RESUME_URL =
  'https://drive.google.com/file/d/1H3mGTUalnbOy2q2mX3WgpuSxf6C5OmU-/view?usp=sharing';
export const RESUME_DOWNLOAD_URL = RESUME_URL;

export type FeaturedProject = {
  id: string;
  title: string;
  company: string;
  description: string;
  outcome: string;
  category: ProjectCategory;
  tags: string[];
  image: string;
  externalUrl: string;
  linkLabel: string;
  featured?: boolean;
  hasCaseStudy?: boolean;
};

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: 'executive-ai-dashboard',
    title: 'Executive AI Analytics Dashboard',
    company: 'Campaign & Lead Intelligence',
    description:
      'Dashboard that converts reports — campaigns, leads — into analytics and AI-recommended insights for faster reporting and decision-making.',
    outcome: 'Leaders get answers in minutes, not days.',
    category: 'analytics',
    tags: ['AI Insights', 'Executive BI', 'Campaign Analytics'],
    image: projectImage('executive-ai-dashboard'),
    externalUrl: 'https://lnkd.in/e4khpJAE',
    linkLabel: 'View dashboard',
    featured: true,
  },
  {
    id: 'standup-ai',
    title: 'StandupAI',
    company: 'AI Prototype',
    description:
      'Reduce meeting time from hours to minutes with a live AI bot that runs standups and assigns tasks in real time.',
    outcome: 'Teams spend less time in meetings, more time shipping.',
    category: 'ai',
    tags: ['Agentic AI', 'Meetings', 'Task Automation'],
    image: projectImage('standup-ai'),
    externalUrl: 'https://drive.google.com/file/d/1WST6DVlABAu1WWJOoSK9V9RG6KAvIEqT/view?usp=sharing',
    linkLabel: 'View prototype',
  },
  {
    id: 'student-housing-copilot',
    title: 'Next Gen Student Housing Co-pilot',
    company: 'AI Chatbot',
    description: 'Make housing and campus life easy for students — answers, guidance, and support in one conversational experience.',
    outcome: 'Students find housing help without the runaround.',
    category: 'ai',
    tags: ['Chatbot', 'EdTech', 'Student Experience'],
    image: projectImage('student-housing-copilot'),
    externalUrl: 'https://vimeo.com/1130603790?share=copy&fl=sv&fe=c',
    linkLabel: 'Watch demo',
  },
  {
    id: 'ai-analytics-paper',
    title: 'Experimenting AI with Data Analytics',
    company: 'International Business Analytics · Selected Abstract',
    description:
      'Research exploring how AI and data analytics work together — selected as an abstract for International Business Analytics.',
    outcome: 'Turns complex data into ideas teams can act on.',
    category: 'analytics',
    tags: ['Research', 'AI + Analytics', 'Academic'],
    image: projectImage('ai-analytics-paper'),
    externalUrl: 'https://drive.google.com/file/d/1TGXOPtKYQKDycYKO22fSuhcUGIIFjowR/view?usp=sharing',
    linkLabel: 'Read paper',
    hasCaseStudy: true,
  },
  {
    id: 'fmcg-commercial-ad',
    title: 'Commercial Ad for FMCG',
    company: 'Cricket Chips · Brand Film',
    description:
      'A cinematic, eco-conscious snack ad that turns Cricket Chips into a premium fitness fuel.',
    outcome: 'A product story that connects with health-conscious buyers.',
    category: 'marketing',
    tags: ['Brand Film', 'FMCG', 'Creative'],
    image: projectImage('fmcg-commercial-ad'),
    externalUrl: 'https://drive.google.com/file/d/1haXtxQ1a7le2lhG-HCB_5Cdzw1G8TB86/view?usp=sharing',
    linkLabel: 'Watch ad',
  },
];
