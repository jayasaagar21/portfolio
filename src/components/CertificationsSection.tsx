import { Award } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const certifications = [
  { title: 'Advanced Certificate in Business and Data Analytics', institution: 'IIM Udaipur', date: 'July 2025' },
  { title: 'AI Generalist Accelerator Program', institution: 'Outskills', date: 'July 2025' },
  { title: 'Falcon-AI Hackathon Winner', institution: 'LablabAI', date: 'July 2024' },
  { title: 'International Certificate for Product Management', institution: 'Institute of Product Leadership', date: 'Nov 2022' },
  { title: 'Professional Certificate in Product Management', institution: 'LinkedIn', date: 'Jun 2021' },
  { title: 'Google Digital Marketing', institution: 'Google Digital Garage', date: 'Jun 2020' },
];

export default function CertificationsSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header fade-up${inView ? ' visible' : ''}`}>
          <p className="section-label">Certifications</p>
          <h2 className="section-title">Credentials</h2>
        </div>

        <div className="cert-list">
          {certifications.map((cert, i) => (
            <div key={i} className={`cert-item fade-up stagger-${Math.min(i + 1, 6)}${inView ? ' visible' : ''}`}>
              <div className="cert-icon">
                <Award size={16} color="var(--grey-600)" />
              </div>
              <div className="cert-info">
                <h4>{cert.title}</h4>
                <p>{cert.institution} · {cert.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
