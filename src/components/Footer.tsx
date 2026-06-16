import { Mail, Linkedin, Phone } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">{new Date().getFullYear()} Jayasaagar C</p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/jayasaagarc/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={14} /> LinkedIn
          </a>
          <a href="mailto:jayasaagar21@gmail.com">
            <Mail size={14} /> Email
          </a>
          <a href="tel:+17163039362">
            <Phone size={14} /> Phone
          </a>
        </div>
      </div>
    </footer>
  );
}
