import { useState } from 'react';
import { type LucideIcon, Briefcase, GraduationCap, Users } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import { useMotion } from '../context/MotionContext';

type Tab = 'professional' | 'education' | 'volunteering';

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'volunteering', label: 'Volunteering', icon: Users },
];

const experiences = {
  professional: [
    { period: 'Jan 2026 – Present', title: 'Growth Strategy PM Intern', company: 'RHM Innovations Inc. (Strategy Consultant)', location: 'USA', domain: 'SaaS / AI', domainClass: 'exp-domain--teal', summary: 'Built AI tools that helped users get faster responses and better-qualified leads — boosting response rates by 30%. Simplified the purchase journey by pairing UX thinking with data architecture.', tags: ['CRM', 'Voice AI', 'Website Revamp'] },
    { period: 'Nov 2024 – May 2025', title: 'Product Manager', company: 'Ankura Homes', location: 'Hyderabad, India', domain: 'Real Estate / PropTech', domainClass: 'exp-domain--blue', summary: 'Led product marketing for a real estate platform — helping buyers find homes faster through clearer positioning, stronger acquisition, and alignment across product, sales, and design.', tags: ['CRM', 'Dashboard', 'Analytics', 'Marketing Automations', 'GTM'] },
    { period: 'Jun 2023 – Jul 2024', title: 'Technical Product Owner', company: 'REACH (US)', location: 'Bangalore, India', domain: 'SaaS / eCommerce / Telecom', domainClass: 'exp-domain--teal', summary: 'Shipped features US customers relied on daily — from discovery and research through sprint delivery with engineering and design.', tags: ['Platform Launch', 'Dashboard Analytics', 'Client', 'Project Management'] },
    { period: 'Jun 2022 – Feb 2023', title: 'Product Consultant', company: 'Replicacia & Lightsout Studio', location: 'Bangalore, India', domain: 'SaaS / eCommerce', domainClass: 'exp-domain--teal', summary: 'Helped early-stage startups find product-market fit with user-backed prioritization and go-to-market frameworks.', tags: ['B2C', 'B2B', 'Design', 'Low Code Platform', 'Project Management'] },
    { period: 'Dec 2020 – May 2022', title: 'Product Specialist', company: 'Firstsource Pvt Ltd (UK)', location: 'Bangalore, India', domain: 'Telecom / Finance', domainClass: 'exp-domain--amber', summary: 'Supported UK telecom and finance customers at scale — exceeding targets while building playbooks that made every interaction clearer and faster.', tags: ['Sales', 'Customer Support', 'Finance', 'Process Management', 'Team Lead'] },
    { period: 'Jun 2020 – Nov 2020', title: 'Project and Account Manager', company: 'Aparajitha Corporate Services Pvt. Ltd.', location: 'India', domain: 'Compliance / Finance', domainClass: 'exp-domain--amber', summary: 'Coordinated Pan-India compliance for Amazon suppliers — audits that protected 20 factories from closure and analytics that caught costly invoice errors early.', tags: ['Compliance', 'Auditor', 'Finance Management', 'Operations Management', 'Manufacturing'] },
  ],
  education: [
    { period: 'Jun 2025 – Jun 2026', title: 'Master\'s in Business Analytics', company: 'University at Buffalo School of Management, SUNY', location: 'New York, USA', domain: 'Analytics / AI', domainClass: 'exp-domain--blue', summary: 'AI in enterprise, consumer behavior, predictive analytics, and product management. Dashboard building and artificial intelligence.' },
    { period: '2022 – 2023', title: 'International Certificate in Product Management', company: 'Institute of Product Leadership', location: 'USA via Hyperstack', domain: 'Product', domainClass: 'exp-domain--teal', summary: 'Full Stack Product Manager. Capstone projects, real-time product research, investor pitch simulations, and cross-functional collaboration.' },
    { period: 'Aug 2014 – Aug 2018', title: 'Bachelor of Engineering', company: 'Visvesvaraya Technological University', location: 'India', domain: 'Engineering', domainClass: 'exp-domain--amber', summary: 'Avions Club (3rd in World for RC competitions), Theatre team, Basketball Captain, Best research paper presentation (National), Best project for social innovation, Toastmasters International.' },
  ],
  volunteering: [
    {
      period: 'Nov 2025 – Jun 2026',
      title: 'Product & Go-To-Market Lead',
      company: 'Gnanalytica',
      location: 'Remote',
      domain: 'SaaS / AI',
      domainClass: 'exp-domain--teal',
      summary:
        'Leading an AI-based startup in product and go-to-market for 3 products — Standup AI (meeting intelligence and workflow automation), AI workshop (Workshop Dashboard), and Valytica (AI-powered valuation platform). Owned the full AI product cycle — problem definition, model-enabled features, pricing, testing, and launch — translating LLM automation capabilities into business outcomes for clients.',
      tags: ['Standup AI', 'Workshop Dashboard', 'Valytica', 'GTM', 'LLM'],
    },
    { period: 'Nov 2022 – Present', title: 'Ambassador Program at the Institute (API)', company: 'Institute of Product Leadership', location: 'India', domain: 'Education', domainClass: 'exp-domain--green', summary: 'Volunteer alumni ambassador creating high impact in the product and technology community. Organized virtual events, served as a panelist for aspiring product managers, and mentored incoming cohorts on product strategy and career transitions.' },
    { period: '2020 – 2021', title: 'Pandemic Innovation Initiative', company: 'Community Health Response', location: 'Bangalore, India', domain: 'Healthcare', domainClass: 'exp-domain--red', summary: 'Coordinated a volunteer-run effort to design and deploy a hospital queue management system during COVID-19. Led awareness campaigns across 15+ hospitals.' },
    { period: '2019 – 2020', title: 'Youth Mentorship Program', company: 'NGO — Education Access', location: 'Bangalore, India', domain: 'Education', domainClass: 'exp-domain--orange', summary: 'Mentored underprivileged students in digital literacy and career awareness. Designed curriculum and facilitated weekly sessions.' },
  ],
};

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<Tab>('professional');
  const items = experiences[activeTab];
  const { isDynamic } = useMotion();

  return (
    <section id="experience" className="section section--story">
      <div className="container">
        <SectionHeader
          chapter="01"
          label="Experience"
          title="5+ years solving real user problems"
          desc="Product, marketing, and analytics roles — always starting with what people need."
        />

        <Reveal delay={1}>
          <div className="exp-tabs" role="tablist" aria-label="Experience categories">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                role="tab"
                aria-selected={activeTab === id}
                className={`exp-tab${activeTab === id ? ' active' : ''}`}
                onClick={() => setActiveTab(id)}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
        </Reveal>

        <div
          key={activeTab}
          className={`exp-list${isDynamic ? ' panel-enter' : ''}`}
          role="tabpanel"
        >
          {items.map((exp, i) => (
            <Reveal key={`${activeTab}-${i}`} delay={Math.min(i + 1, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6}>
              <article className="exp-item">
                <div className="exp-rail" aria-hidden="true">
                  <span className="exp-rail-dot" />
                </div>
                <div className="exp-meta">
                  <span className="exp-period">{exp.period}</span>
                  <span className={`exp-domain ${exp.domainClass}`}>{exp.domain}</span>
                </div>
                <div className="exp-body">
                  <h3>{exp.title}</h3>
                  <p className="exp-company">{exp.company} · {exp.location}</p>
                  <p className="exp-desc">{exp.summary}</p>
                  {'tags' in exp && (exp as { tags?: string[] }).tags && (
                    <div className="exp-tags">
                      {((exp as { tags: string[] }).tags).map(tag => (
                        <span key={tag} className="exp-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
