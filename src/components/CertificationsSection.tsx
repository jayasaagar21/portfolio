import { ArrowRight } from 'lucide-react';
import SectionHeader from './SectionHeader';
import Reveal from './Reveal';
import {
  AI_CERT_PROVIDERS,
  CERTIFICATIONS,
  CERT_THEME_META,
  certYear,
  institutionMonogram,
} from '../data/portfolioContent';

export default function CertificationsSection() {
  return (
    <section className="section section--alt">
      <div className="container">
        <SectionHeader chapter="04" label="Certifications" title="Credentials & learning" />

        <div className="cert-layout">
          <div className="cert-providers">
            {AI_CERT_PROVIDERS.map((provider, pi) => (
              <Reveal key={provider.id} delay={Math.min(pi + 1, 2) as 0 | 1 | 2}>
                <article className={`cert-provider cert-provider--${provider.theme}`}>
                  <div className="cert-provider-glow" aria-hidden="true" />
                  <header className="cert-provider-head">
                    <div className="cert-provider-logo">{provider.mono}</div>
                    <div className="cert-provider-intro">
                      <h3 className="cert-provider-title">{provider.title}</h3>
                      <p className="cert-provider-meta">
                        {provider.institution}
                        <span className="cert-card-dot">·</span>
                        <time>{provider.date}</time>
                      </p>
                    </div>
                    <span className="cert-provider-count">{provider.courses.length} courses</span>
                  </header>

                  <ul className="cert-course-list">
                    {provider.courses.map((item, ci) => (
                      <li key={item.course} className="cert-course-row">
                        <div className="cert-course-track" aria-hidden="true">
                          <span className="cert-course-node" />
                          {ci < provider.courses.length - 1 && <span className="cert-course-line" />}
                        </div>
                        <div className="cert-course-body">
                          <p className="cert-course-name">{item.course}</p>
                          <div className="cert-course-link" aria-hidden="true">
                            <ArrowRight size={12} />
                          </div>
                          <span className="cert-course-skill">{item.skill}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="cert-bento">
            {CERTIFICATIONS.map((cert, i) => {
              const meta = CERT_THEME_META[cert.theme];
              const Icon = meta.icon;
              const year = certYear(cert.date);
              const mono = institutionMonogram(cert.institution);

              return (
                <Reveal
                  key={cert.title}
                  delay={Math.min(i + 1, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6}
                  className={`cert-cell cert-cell--span-${cert.span ?? 4}`}
                >
                  <article className={`cert-card cert-card--${cert.theme}`}>
                    <span className="cert-card-year" aria-hidden="true">{year}</span>
                    <div className="cert-card-glow" aria-hidden="true" />
                    <div className="cert-card-head">
                      <div className="cert-card-mono">{mono}</div>
                      <span className="cert-card-theme">
                        <Icon size={12} />
                        {meta.label}
                      </span>
                    </div>
                    <h4 className="cert-card-title">{cert.title}</h4>
                    <p className="cert-card-meta">
                      <span>{cert.institution}</span>
                      <span className="cert-card-dot">·</span>
                      <time>{cert.date}</time>
                    </p>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
