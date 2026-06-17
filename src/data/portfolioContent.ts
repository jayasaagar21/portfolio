import type { LucideIcon } from 'lucide-react';
import { BarChart2, Brain, GraduationCap, Megaphone, Sparkles } from 'lucide-react';

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
  title: string;
  institution: string;
  date: string;
  theme: CertTheme;
  span?: number;
};

export const CERTIFICATIONS: Certification[] = [
  { title: 'Advanced Certificate in Business and Data Analytics', institution: 'IIM Udaipur', date: 'Jul 2025', theme: 'analytics', span: 6 },
  { title: 'AI Generalist Accelerator Program', institution: 'Outskills', date: 'Jul 2025', theme: 'ai', span: 4 },
  { title: "Master's in Business Analytics", institution: 'University at Buffalo · SUNY', date: 'Jun 2026', theme: 'academic', span: 6 },
  { title: 'Falcon-AI Hackathon', institution: 'LablabAI', date: 'Jul 2024', theme: 'ai', span: 4 },
  { title: 'International Certificate in Product Management', institution: 'Institute of Product Leadership', date: 'Nov 2022', theme: 'product', span: 4 },
  { title: 'Professional Certificate in Product Management', institution: 'LinkedIn', date: 'Jun 2021', theme: 'product', span: 4 },
  { title: 'Google Digital Marketing', institution: 'Google Digital Garage', date: 'Jun 2020', theme: 'marketing', span: 4 },
  { title: 'Bachelor of Engineering', institution: 'Visvesvaraya Technological University', date: 'Aug 2018', theme: 'academic', span: 4 },
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

export const SITE_EYEBROW = 'Portfolio · Product · Marketing · Business Analytics';
export const SITE_EXPERTISE = 'AI · Product · Marketing · Business Analytics';
