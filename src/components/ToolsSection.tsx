import { BarChart2, Cpu, Megaphone, Users, Code2, FileSpreadsheet } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const groups = [
  { category: 'Product Management', icon: Cpu, tools: ['Jira', 'Confluence', 'Notion', 'Linear', 'Productboard', 'Miro', 'Figma'] },
  { category: 'Data & Analytics', icon: BarChart2, tools: ['Power BI', 'Google Analytics', 'Mixpanel', 'Amplitude', 'SQL', 'Tableau', 'Looker'] },
  { category: 'Marketing & Growth', icon: Megaphone, tools: ['HubSpot', 'Salesforce', 'SEMrush', 'Google Ads', 'Facebook Ads', 'Mailchimp', 'Hotjar'] },
  { category: 'AI & Automation', icon: Code2, tools: ['GPT-4', 'LangChain', 'Cursor', 'Make', 'Zapier', 'Python', 'Prompt Engineering'] },
  { category: 'Research & Strategy', icon: Users, tools: ['UserTesting', 'Dovetail', 'Typeform', 'JTBD', 'OKRs', 'RICE Scoring'] },
  { category: 'Collaboration', icon: FileSpreadsheet, tools: ['Slack', 'Loom', 'Notion', 'Google Workspace', 'Coda', 'Airtable'] },
];

export default function ToolsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="tools" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header fade-up${inView ? ' visible' : ''}`}>
          <p className="section-label">Tools</p>
          <h2 className="section-title">What I work with</h2>
          <p className="section-desc">The tools I reach for across product, analytics, marketing, and AI.</p>
        </div>

        <div className="tools-grid">
          {groups.map(({ category, icon: Icon, tools }, i) => (
            <div key={category} className={`tool-group fade-up stagger-${Math.min(i + 1, 6)}${inView ? ' visible' : ''}`}>
              <div className="tool-group-header">
                <Icon size={16} />
                <h3>{category}</h3>
              </div>
              <div className="tool-tags">
                {tools.map(t => <span key={t} className="tool-tag">{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
