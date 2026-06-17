import { Award } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

const certifications = [
  { title: 'Advanced Certificate in Business and Data Analytics', institution: 'IIM Udaipur', date: 'July 2025' },
  { title: 'AI Generalist Accelerator Program', institution: 'Outskills', date: 'July 2025' },
  { title: 'Falcon-AI Hackathon Winner', institution: 'LablabAI', date: 'July 2024' },
  { title: 'International Certificate for Product Management', institution: 'Institute of Product Leadership', date: 'Nov 2022' },
  { title: 'Professional Certificate in Product Management', institution: 'LinkedIn', date: 'Jun 2021' },
  { title: 'Google Digital Marketing', institution: 'Google Digital Garage', date: 'Jun 2020' },
];

export default function CertificationsSection() {
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeader chapter="04" label="Certifications" title="Credentials" />

        <div className="cert-list">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={Math.min(i + 1, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6}>
              <div className="cert-item">
                <div className="cert-icon">
                  <Award size={16} />
                </div>
                <div className="cert-info">
                  <h4>{cert.title}</h4>
                  <p>{cert.institution} · {cert.date}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
