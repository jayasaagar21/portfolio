import { useState } from 'react';
import { type LucideIcon, Briefcase, GraduationCap, Users } from 'lucide-react';
import { useInView } from '../hooks/useInView';

type Tab = 'professional' | 'education' | 'volunteering';

const tabs: { id: Tab; label: string; icon: LucideIcon }[] = [
  { id: 'professional', label: 'Professional', icon: Briefcase },
  { id: 'education', label: 'Education', icon: GraduationCap },
  { id: 'volunteering', label: 'Volunteering', icon: Users },
];

const experiences = {
  professional: [
    { period: 'Jan 2026 – Present', title: 'Growth Strategy PM Intern', company: 'RHM Innovations Inc. (Strategy Consultant)', location: 'USA', domain: 'SaaS / AI', domainClass: 'exp-domain--teal', summary: 'Developed AI tools for enterprise that boosted response rates by 30% and enhanced lead qualification. Integrated HubSpot to improve conversion and combined UX thinking with database architecture to streamline the purchase journey.', tags: ['CRM', 'Voice AI', 'Website Revamp'] },
    { period: 'Nov 2024 – May 2025', title: 'Product Manager', company: 'Ankura Homes', location: 'Hyderabad, India', domain: 'Real Estate / PropTech', domainClass: 'exp-domain--blue', summary: 'Led end-to-end product marketing strategy for a real estate tech platform — driving user acquisition, shaping positioning, and building cross-functional alignment between product, sales, and design teams.', tags: ['CRM', 'Dashboard', 'Analytics', 'Marketing Automations', 'GTM'] },
    { period: 'Jun 2023 – Jul 2024', title: 'Technical Product Owner', company: 'REACH (US)', location: 'Bangalore, India', domain: 'SaaS / eCommerce / Telecom', domainClass: 'exp-domain--teal', summary: 'Managed product roadmaps and discovery cycles for US market expansion. Conducted deep user research, ran competitive analysis, and coordinated sprint delivery with engineering and design.', tags: ['Platform Launch', 'Dashboard Analytics', 'Client', 'Project Management'] },
    { period: 'Jun 2022 – Feb 2023', title: 'Product Consultant', company: 'Replicacia & Lightsout Studio', location: 'Bangalore, India', domain: 'SaaS / eCommerce', domainClass: 'exp-domain--teal', summary: 'Provided product strategy consulting to early-stage startups — defining GTM frameworks, improving product-market fit, and delivering data-backed prioritization frameworks.', tags: ['B2C', 'B2B', 'Design', 'Low Code Platform', 'Project Management'] },
    { period: 'Dec 2020 – May 2022', title: 'Product Specialist', company: 'Firstsource Pvt Ltd (UK)', location: 'Bangalore, India', domain: 'Telecom / Finance', domainClass: 'exp-domain--amber', summary: 'Managed high-volume B2C sales for UK telecom and financial clients. Consistently exceeded targets while developing customer success playbooks and mentoring junior reps.', tags: ['Sales', 'Customer Support', 'Finance', 'Process Management', 'Team Lead'] },
    { period: 'Jun 2020 – Nov 2020', title: 'Project and Account Manager', company: 'Aparajitha Corporate Services Pvt. Ltd.', location: 'India', domain: 'Compliance / Finance', domainClass: 'exp-domain--amber', summary: 'Exclusive Pan-India project coordinator for Amazon\'s licensing activities. Conducted compliance audits mitigating weaknesses that saved 20 factories from closure and applied financial analytics to identify invoice discrepancies.', tags: ['Compliance', 'Auditor', 'Finance Management', 'Operations Management', 'Manufacturing'] },
  ],
  education: [
    { period: 'Jun 2025 – Jun 2026', title: 'Master\'s in Business Analytics', company: 'University at Buffalo School of Management, SUNY', location: 'New York, USA', domain: 'Analytics / AI', domainClass: 'exp-domain--blue', summary: 'AI in enterprise, consumer behavior, predictive analytics, and product management. Dashboard building and artificial intelligence.' },
    { period: '2022 – 2023', title: 'International Certificate in Product Management', company: 'Institute of Product Leadership', location: 'USA via Hyperstack', domain: 'Product', domainClass: 'exp-domain--teal', summary: 'Full Stack Product Manager. Capstone projects, real-time product research, investor pitch simulations, and cross-functional collaboration.' },
    { period: 'Aug 2014 – Aug 2018', title: 'Bachelor of Engineering', company: 'Visvesvaraya Technological University', location: 'India', domain: 'Engineering', domainClass: 'exp-domain--amber', summary: 'Avions Club (3rd in World for RC competitions), Theatre team, Basketball Captain, Best research paper presentation (National), Best project for social innovation, Toastmasters International.' },
  ],
  volunteering: [
    { period: 'Nov 2022 – Present', title: 'Ambassador Program at the Institute (API)', company: 'Institute of Product Leadership', location: 'India', domain: 'Education', domainClass: 'exp-domain--green', summary: 'Volunteer alumni ambassador creating high impact in the product and technology community. Organized virtual events, served as a panelist for aspiring product managers, and mentored incoming cohorts on product strategy and career transitions.' },
    { period: '2020 – 2021', title: 'Pandemic Innovation Initiative', company: 'Community Health Response', location: 'Bangalore, India', domain: 'Healthcare', domainClass: 'exp-domain--red', summary: 'Coordinated a volunteer-run effort to design and deploy a hospital queue management system during COVID-19. Led awareness campaigns across 15+ hospitals.' },
    { period: '2019 – 2020', title: 'Youth Mentorship Program', company: 'NGO — Education Access', location: 'Bangalore, India', domain: 'Education', domainClass: 'exp-domain--orange', summary: 'Mentored underprivileged students in digital literacy and career awareness. Designed curriculum and facilitated weekly sessions.' },
  ],
};

export default function ExperienceSection() {
  const [activeTab, setActiveTab] = useState<Tab>('professional');
  const items = experiences[activeTab];
  const { ref, inView } = useInView(0.1);

  return (
    <section id="experience" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header fade-up${inView ? ' visible' : ''}`}>
          <p className="section-label">Experience</p>
          <h2 className="section-title">Where I've worked</h2>
          <p className="section-desc">Professional roles, education, and community work across seven domains.</p>
        </div>

        <div className={`exp-tabs fade-up stagger-1${inView ? ' visible' : ''}`}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`exp-tab${activeTab === id ? ' active' : ''}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        <div className="exp-list">
          {items.map((exp, i) => (
            <div key={`${activeTab}-${i}`} className={`exp-item fade-up stagger-${Math.min(i + 2, 6)}${inView ? ' visible' : ''}`}>
              <div className="exp-meta">
                <span className="exp-period">{exp.period}</span>
                <span className={`exp-domain ${exp.domainClass}`}>{exp.domain}</span>
              </div>
              <div className="exp-body">
                <h3>{exp.title}</h3>
                <p className="exp-company">{exp.company} · {exp.location}</p>
                <p className="exp-desc">{exp.summary}</p>
                {'tags' in exp && (exp as any).tags && (
                  <div className="exp-tags">
                    {((exp as any).tags as string[]).map(tag => (
                      <span key={tag} className="exp-tag">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
