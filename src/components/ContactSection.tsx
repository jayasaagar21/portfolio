import { Mail, Linkedin, MapPin, Calendar } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const contacts = [
  {
    icon: Mail,
    label: 'Email',
    value: 'jayasaagar21@gmail.com',
    href: 'mailto:jayasaagar21@gmail.com',
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/jayasaagarc',
    href: 'https://linkedin.com/in/jayasaagarc',
  },
  {
    icon: Calendar,
    label: 'Schedule a meeting',
    value: 'calendly.com/jayasaagarc',
    href: 'https://calendly.com/jayasaagarc/connect-with-me',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'United States',
    href: null as string | null,
  },
];

export default function ContactSection() {
  const { ref, inView } = useInView(0.1);

  return (
    <section id="contact" className="section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header fade-up${inView ? ' visible' : ''}`}>
          <p className="section-label">Contact</p>
          <h2 className="section-title">Get in touch</h2>
        </div>

        <div className="contact-grid">
          {contacts.map((c, i) => {
            const Icon = c.icon;
            const inner = (
              <>
                <div className="contact-card-icon">
                  <Icon size={18} />
                </div>
                <div className="contact-card-info">
                  <h3>{c.label}</h3>
                  <p>{c.value}</p>
                </div>
              </>
            );

            const className = `contact-card fade-up stagger-${Math.min(i + 1, 6)}${inView ? ' visible' : ''}`;

            if (c.href) {
              const isExternal = c.href.startsWith('http');
              return (
                <a
                  key={i}
                  href={c.href}
                  target={isExternal ? '_blank' : undefined}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className={className}
                >
                  {inner}
                </a>
              );
            }

            return (
              <div key={i} className={className}>
                {inner}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
