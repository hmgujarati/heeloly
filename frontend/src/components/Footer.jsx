import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, BookOpen, Mail, Facebook } from 'lucide-react';
import { authorInfo } from '../data/author';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-container">
        {/* Footer Top */}
        <div className="footer-top">
          <div className="footer-brand">
            <img 
              src="https://customer-assets.emergentagent.com/job_writer-hub-11/artifacts/us3nn3v6_logo%20Heeloly%20u.png" 
              alt="Heeloly Upasani Logo" 
              className="footer-logo-img"
            />
            <h3 className="footer-brand-name">Heeloly Upasani</h3>
            <p className="footer-tagline">Stories that inspire, transform, and resonate</p>
          </div>

          {/* Footer Links */}
          <div className="footer-links-grid">
            <div className="footer-links-column">
              <h4 className="footer-column-title">Explore</h4>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/books" className="footer-link">Books</Link>
              <Link to="/about" className="footer-link">About</Link>
            </div>
            <div className="footer-links-column">
              <h4 className="footer-column-title">More</h4>
              <Link to="/extras" className="footer-link">Extras</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
            <div className="footer-links-column">
              <h4 className="footer-column-title">Connect</h4>
              <a href={authorInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
              <a href={authorInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a>
              <a href={authorInfo.socialMedia.goodreads} target="_blank" rel="noopener noreferrer" className="footer-link">Goodreads</a>
            </div>
          </div>
        </div>

        {/* Footer Middle - Newsletter */}
        <div className="footer-newsletter">
          <h3 className="footer-newsletter-title">Stay Updated</h3>
          <p className="footer-newsletter-text">Subscribe to receive updates on new releases, exclusive content, and special offers.</p>
          <div className="footer-newsletter-form">
            <input type="email" placeholder="Enter your email" className="footer-email-input" />
            <Button className="btn-primary">Subscribe</Button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-social">
            <a href={authorInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
              <Instagram size={20} />
            </a>
            <a href={authorInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
              <Twitter size={20} />
            </a>
            <a href={authorInfo.socialMedia.goodreads} target="_blank" rel="noopener noreferrer" className="social-icon">
              <BookOpen size={20} />
            </a>
            {authorInfo.socialMedia.facebook !== '#' && (
              <a href={authorInfo.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                <Facebook size={20} />
              </a>
            )}
            <a href={`mailto:${authorInfo.email}`} className="social-icon">
              <Mail size={20} />
            </a>
          </div>
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} Heeloly Upasani. All rights reserved.</p>
            <div className="footer-meta">
              <Link to="/" className="footer-meta-link">Privacy Policy</Link>
              <span className="footer-divider">•</span>
              <Link to="/contact" className="footer-meta-link">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
