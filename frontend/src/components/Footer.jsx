import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, BookOpen, Mail, Facebook, Music } from 'lucide-react';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Pinterest icon component
const PinterestIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const Footer = () => {
  const [footerEmail, setFooterEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [authorData, setAuthorData] = useState({
    email: 'heelolyverse@gmail.com',
    social_links: {
      instagram: 'https://www.instagram.com/authorheelolyupasani/',
      twitter: 'https://x.com/heelolyupasani',
      goodreads: 'https://www.goodreads.com/author/show/54936700.Heeloly_Upasani',
      facebook: '#',
      pinterest: '#',
      spotify: '#'
    }
  });

  useEffect(() => {
    fetchAuthorData();
  }, []);

  const fetchAuthorData = async () => {
    try {
      const response = await axios.get(`${API}/author`);
      setAuthorData(response.data);
    } catch (error) {
      console.error('Error fetching author data:', error);
    }
  };

  const handleFooterSubmit = async (e) => {
    e.preventDefault();
    if (!footerEmail) {
      toast.error('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email: footerEmail });
      toast.success('Successfully subscribed to newsletter!');
      setFooterEmail('');
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error('Email already subscribed!');
      } else {
        toast.error('Failed to subscribe. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = authorData.social_links || {};

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
          </div>

          {/* Footer Links */}
          <div className="footer-links-grid">
            <div className="footer-links-column">
              <h4 className="footer-column-title">Explore</h4>
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/books" className="footer-link">Books</Link>
              <Link to="/bio" className="footer-link">About</Link>
            </div>
            <div className="footer-links-column">
              <h4 className="footer-column-title">More</h4>
              <Link to="/extras" className="footer-link">Extras</Link>
              <Link to="/contact" className="footer-link">Contact</Link>
            </div>
            <div className="footer-links-column">
              <h4 className="footer-column-title">Connect</h4>
              {socialLinks.instagram && socialLinks.instagram !== '#' && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="footer-link">Instagram</a>
              )}
              {socialLinks.twitter && socialLinks.twitter !== '#' && (
                <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a>
              )}
              {socialLinks.goodreads && socialLinks.goodreads !== '#' && (
                <a href={socialLinks.goodreads} target="_blank" rel="noopener noreferrer" className="footer-link">Goodreads</a>
              )}
              {socialLinks.facebook && socialLinks.facebook !== '#' && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="footer-link">Facebook</a>
              )}
              {socialLinks.pinterest && socialLinks.pinterest !== '#' && (
                <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer" className="footer-link">Pinterest</a>
              )}
              {socialLinks.spotify && socialLinks.spotify !== '#' && (
                <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="footer-link">Spotify</a>
              )}
            </div>
          </div>
        </div>

        {/* Footer Middle - Newsletter */}
        <div className="footer-newsletter">
          <h3 className="footer-newsletter-title">Stay Updated</h3>
          <p className="footer-newsletter-text">Subscribe to receive updates on new releases, exclusive content, and special offers.</p>
          <form onSubmit={handleFooterSubmit} className="footer-newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="footer-email-input"
              value={footerEmail}
              onChange={(e) => setFooterEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-social">
            {socialLinks.instagram && socialLinks.instagram !== '#' && (
              <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-icon">
                <Instagram size={20} />
              </a>
            )}
            {socialLinks.twitter && socialLinks.twitter !== '#' && (
              <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-icon">
                <Twitter size={20} />
              </a>
            )}
            {socialLinks.facebook && socialLinks.facebook !== '#' && (
              <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-icon">
                <Facebook size={20} />
              </a>
            )}
            {socialLinks.goodreads && socialLinks.goodreads !== '#' && (
              <a href={socialLinks.goodreads} target="_blank" rel="noopener noreferrer" className="social-icon">
                <BookOpen size={20} />
              </a>
            )}
            {socialLinks.pinterest && socialLinks.pinterest !== '#' && (
              <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer" className="social-icon">
                <PinterestIcon size={20} />
              </a>
            )}
            {socialLinks.spotify && socialLinks.spotify !== '#' && (
              <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="social-icon">
                <Music size={20} />
              </a>
            )}
            {authorData.email && (
              <a href={`mailto:${authorData.email}`} className="social-icon">
                <Mail size={20} />
              </a>
            )}
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
