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
    { period: 'Jan 2026 – Jun 2026', title: 'Business Consultant', company: 'RHM Innovations (Represented University as a Consultant)', location: 'USA', domain: 'SaaS / AI', domainClass: 'exp-domain--teal', summary: 'Developed Voice AI and a website marketplace that improved the user experience and increased monthly sales by 30%. Launched HubSpot CRM with GTM automations, reducing response time from two days to instant while increasing purchases and shortening the purchase cycle.', tags: ['Voice AI', 'Marketplace', 'HubSpot CRM', 'GTM Automation'] },
    { period: 'Sep 2024 – May 2025', title: 'Growth Manager', company: 'Ankura Homes', location: 'India', domain: 'Real Estate / PropTech', domainClass: 'exp-domain--blue', summary: 'Owned product and campaign roadmap strategy for a $16M project, increasing qualified leads by 36%. Launched a CRM automation layer that improved query resolution by 80% and engagement by 60% without manual follow-up.', tags: ['Product Strategy', 'Campaign Roadmap', 'CRM', 'Marketing Automation', 'GTM'] },
    { period: 'Jun 2023 – Jul 2024', title: 'Technical Product Owner', company: 'REACH (US-based client)', location: 'India', domain: 'SaaS / eCommerce / Telecom', domainClass: 'exp-domain--teal', summary: 'Owned a mobile store marketplace for T-Mobile and other clients, generating $1M+ in revenue within nine months with 80% client satisfaction. Shipped an analytics dashboard for user segmentation, acquisition, and churn insights.', tags: ['Mobile Marketplace', 'Analytics Dashboard', 'User Segmentation', 'Acquisition', 'Churn'] },
    { period: 'Jun 2022 – May 2023', title: 'Product Consultant (Low Code Platform)', company: 'Replicacia Technologies Pvt Ltd', location: 'India', domain: 'SaaS / eCommerce', domainClass: 'exp-domain--teal', summary: 'Joined the founder’s office as an intern and was promoted to full-time, owning the non-technical product lifecycle of a low-code platform from vision to launch. Ran 200+ user feedback cycles and secured three customers pre-launch through roadmap, pricing, and GTM strategy.', tags: ['Low Code Platform', 'Product Lifecycle', 'User Research', 'Pricing', 'GTM'] },
    { period: 'Dec 2020 – May 2022', title: 'Product & Sales Associate (Sky)', company: 'Firstsource (UK-based client)', location: 'India', domain: 'Telecom / Finance', domainClass: 'exp-domain--amber', summary: 'Defined product launch and GTM strategy for Sky’s offerings by identifying target segments and structuring adoption to accelerate revenue. Mentored a 200-member team on retention, conversion, and resolution, increasing NPS from 30 to 85.', tags: ['Product Launch', 'GTM', 'Retention', 'Conversion', 'Team Mentoring'] },
  ],
  education: [
    { period: 'Jun 2025 – Jun 2026', title: 'Master\'s in Business Analytics', company: 'University at Buffalo School of Management, SUNY', location: 'New York, USA', domain: 'Analytics / AI', domainClass: 'exp-domain--blue', summary: 'AI in enterprise, consumer behavior, predictive analytics, and product management. Dashboard building and artificial intelligence.' },
    { period: '2022 – 2023', title: 'International Certificate in Product Management', company: 'Institute of Product Leadership', location: 'USA via Hyperstack', domain: 'Product', domainClass: 'exp-domain--teal', summary: 'Full Stack Product Manager. Capstone projects, real-time product research, investor pitch simulations, and cross-functional collaboration.' },
    { period: 'Aug 2014 – Aug 2018', title: 'Bachelor of Engineering', company: 'Visvesvaraya Technological University', location: 'India', domain: 'Engineering', domainClass: 'exp-domain--amber', summary: 'Avions Club (3rd in World for RC competitions), Theatre team, Basketball Captain, Best research paper presentation (National), Best project for social innovation, Toastmasters International.' },
  ],
  volunteering: [
    {
      period: 'Nov 2025 – Jun 2026',
      title: 'AI Product Manager',
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
