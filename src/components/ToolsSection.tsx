import { BarChart2, Cpu, Megaphone, Users, Code2, FileSpreadsheet } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

const groups = [
  { category: 'Product Management', icon: Cpu, tools: ['Jira', 'Confluence', 'Notion', 'Linear', 'Productboard', 'Miro', 'Figma'] },
  { category: 'Data & Analytics', icon: BarChart2, tools: ['Power BI', 'Google Analytics', 'Mixpanel', 'Amplitude', 'SQL', 'Tableau', 'Looker'] },
  { category: 'Marketing & Growth', icon: Megaphone, tools: ['HubSpot', 'Salesforce', 'SEMrush', 'Google Ads', 'Facebook Ads', 'Mailchimp', 'Hotjar'] },
  { category: 'AI & Automation', icon: Code2, tools: ['GPT-4', 'LangChain', 'Cursor', 'Make', 'Zapier', 'Python', 'Prompt Engineering'] },
  { category: 'Research & Strategy', icon: Users, tools: ['UserTesting', 'Dovetail', 'Typeform', 'JTBD', 'OKRs', 'RICE Scoring'] },
  { category: 'Collaboration', icon: FileSpreadsheet, tools: ['Slack', 'Loom', 'Notion', 'Google Workspace', 'Coda', 'Airtable'] },
];

export default function ToolsSection() {
  return (
    <section id="tools" className="section section--alt">
      <div className="container">
        <SectionHeader
          chapter="02"
          label="Tools"
          title="What I work with"
          desc="The stack behind product decisions, analytics, and go-to-market."
        />

        <div className="tools-grid">
          {groups.map(({ category, icon: Icon, tools }, i) => (
            <Reveal key={category} delay={Math.min(i + 1, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6}>
              <div className="tool-group">
                <div className="tool-group-header">
                  <Icon size={16} />
                  <h3>{category}</h3>
                </div>
                <div className="tool-tags">
                  {tools.map(t => <span key={t} className="tool-tag">{t}</span>)}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
