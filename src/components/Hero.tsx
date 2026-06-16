import { Mail, Linkedin, Phone, Newspaper } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-inner">
          <h1 className="hero-name">Jayasaagar C</h1>
          <p className="hero-role">AI ( Product + Marketing )</p>
          <p className="hero-bio">
            I'm obsessed with one specific problem: what happens to products before, during and after they launch? Are we reaching our customers, if not what can we do to make it happen? That's where I thrive.
          </p>
          <div className="hero-domains">
            {['Real Estate', 'SaaS', 'AI', 'eCommerce', 'Telecom', 'Compliance', 'Finance'].map(d => (
              <span key={d} className="hero-domain">{d}</span>
            ))}
          </div>
          <div className="hero-contact">
            <a href="tel:+17163039362">
              <Phone size={15} />
              +1 (716) 303-9362
            </a>
            <a href="mailto:jayasaagar21@gmail.com">
              <Mail size={15} />
              jayasaagar21@gmail.com
            </a>
            <a href="https://www.linkedin.com/in/jayasaagarc/" target="_blank" rel="noopener noreferrer">
              <Linkedin size={15} />
              LinkedIn
            </a>
            <a href="https://lnkd.in/e2pGdt7B" target="_blank" rel="noopener noreferrer">
              <Newspaper size={15} />
              Newsletter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
