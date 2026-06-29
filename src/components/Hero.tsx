import { Mail, Linkedin, Newspaper, ArrowDown } from 'lucide-react';
import Reveal from './Reveal';
import { useMotion } from '../context/MotionContext';
import { SITE_EXPERTISE } from '../data/portfolioContent';

const domains = ['Real Estate', 'SaaS', 'AI', 'eCommerce', 'Telecom', 'Compliance', 'Finance'];

const pillars = {
  left: ['Product', 'Marketing'],
  right: ['Business Analytics', 'AI'],
};

export default function Hero() {
  const { isDynamic } = useMotion();

  return (
    <section className="hero">
      <div className="hero-bg" aria-hidden="true" />
      <div className="hero-grid" aria-hidden="true">
        <div className="hero-pillar hero-pillar--left">
          {pillars.left.map(label => (
            <span key={label} className="hero-pillar-label">{label}</span>
          ))}
        </div>
        <div className="hero-pillar hero-pillar--right">
          {pillars.right.map(label => (
            <span key={label} className="hero-pillar-label">{label}</span>
          ))}
        </div>
      </div>

      <div className="container">
        <div className="hero-inner">
          <Reveal delay={0}>
            <h1 className="hero-name">
              <span className="hero-name-line">Jayasaagar</span>
              <span className="hero-name-line hero-name-accent">Chandrashekar</span>
            </h1>
          </Reveal>

          <Reveal delay={1}>
            <p className="hero-role">{SITE_EXPERTISE}</p>
          </Reveal>

          <Reveal delay={2}>
            <p className="hero-bio">
              I help teams ship what users actually need — AI that cuts meeting time,
              dashboards that speed up decisions, and campaigns that speak to real people.
              Every project starts with the person on the other side.
            </p>
          </Reveal>

          <Reveal delay={3}>
            <div className="hero-domains">
              {domains.map((d, i) => (
                <span
                  key={d}
                  className="hero-domain"
                  style={isDynamic ? { transitionDelay: `${i * 40}ms` } : undefined}
                >
                  {d}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={4}>
            <div className="hero-contact">
              <a href="mailto:jayasaagar21@gmail.com" className="hero-link">
                <Mail size={15} />
                jayasaagar21@gmail.com
              </a>
              <a
                href="https://www.linkedin.com/in/jayasaagarc/"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link"
              >
                <Linkedin size={15} />
                LinkedIn
              </a>
              <a
                href="https://lnkd.in/e2pGdt7B"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-link"
              >
                <Newspaper size={15} />
                Newsletter
              </a>
            </div>
          </Reveal>

          <Reveal delay={5}>
            <a href="#experience" className="hero-scroll-cue">
              <span>Explore the story</span>
              <ArrowDown size={14} className={isDynamic ? 'hero-scroll-icon' : ''} />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
