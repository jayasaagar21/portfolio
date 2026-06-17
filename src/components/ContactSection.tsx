import { Mail, Linkedin, MapPin, Calendar, ArrowUpRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';

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
  return (
    <section id="contact" className="section section--story section--contact">
      <div className="container">
        <SectionHeader chapter="05" label="Contact" title="Get in touch" />

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
                {c.href && <ArrowUpRight size={16} className="contact-card-arrow" />}
              </>
            );

            const className = 'contact-card';

            if (c.href) {
              const isExternal = c.href.startsWith('http');
              return (
                <Reveal key={c.label} delay={Math.min(i + 1, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6}>
                  <a
                    href={c.href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className={className}
                  >
                    {inner}
                  </a>
                </Reveal>
              );
            }

            return (
              <Reveal key={c.label} delay={Math.min(i + 1, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6}>
                <div className={className}>{inner}</div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
