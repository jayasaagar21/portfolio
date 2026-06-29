import { Mail, Linkedin, Github, FileText, Download } from 'lucide-react';
import { GITHUB_URL, RESUME_DOWNLOAD_URL, RESUME_URL } from '../data/portfolioContent';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-copy">{new Date().getFullYear()} Jayasaagar Chandrashekar</p>
        <div className="footer-links">
          <a href="https://www.linkedin.com/in/jayasaagarc/" target="_blank" rel="noopener noreferrer">
            <Linkedin size={14} /> LinkedIn
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
            <Github size={14} /> GitHub
          </a>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
            <FileText size={14} /> Resume
          </a>
          <a href={RESUME_DOWNLOAD_URL} target="_blank" rel="noopener noreferrer">
            <Download size={14} /> Download resume
          </a>
          <a href="mailto:jayasaagar21@gmail.com">
            <Mail size={14} /> Email
          </a>
        </div>
      </div>
    </footer>
  );
}
