import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Instagram, Twitter, BookOpen, Mail, Loader, Facebook, Music } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Pinterest icon component (not in lucide-react)
const PinterestIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);

const Bio = () => {
  const [authorInfo, setAuthorInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/author`);
      setAuthorInfo(response.data);
    } catch (error) {
      console.error('Error fetching author data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="about-page" style={{ padding: '100px 0', textAlign: 'center' }}>
        <Loader size={48} className="animate-spin" style={{ margin: '0 auto', color: 'var(--accent-silver)' }} />
        <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Loading...</p>
      </div>
    );
  }

  if (!authorInfo) {
    return (
      <div className="about-page" style={{ padding: '100px 0', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-secondary)' }}>Unable to load author information.</p>
      </div>
    );
  }

  const socialLinks = authorInfo.social_links || {};

  return (
    <div className="about-page">
      {/* Author Bio Section */}
      <section className="author-bio-section">
        <div className="container">
          <div className="bio-grid">
            <div className="bio-image">
              <img src={authorInfo.photo} alt={authorInfo.name} className="author-photo" />
            </div>
            <div className="bio-content">
              <h1 className="page-title">About {authorInfo.name}</h1>
              <p className="bio-text">{authorInfo.bio}</p>
              <div className="social-links">
                {socialLinks.instagram && socialLinks.instagram !== '#' && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                    <Instagram size={20} />
                  </a>
                )}
                {socialLinks.twitter && socialLinks.twitter !== '#' && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                    <Twitter size={20} />
                  </a>
                )}
                {socialLinks.facebook && socialLinks.facebook !== '#' && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="social-link">
                    <Facebook size={20} />
                  </a>
                )}
                {socialLinks.goodreads && socialLinks.goodreads !== '#' && (
                  <a href={socialLinks.goodreads} target="_blank" rel="noopener noreferrer" className="social-link">
                    <BookOpen size={20} />
                  </a>
                )}
                {socialLinks.pinterest && socialLinks.pinterest !== '#' && (
                  <a href={socialLinks.pinterest} target="_blank" rel="noopener noreferrer" className="social-link">
                    <PinterestIcon size={20} />
                  </a>
                )}
                {socialLinks.spotify && socialLinks.spotify !== '#' && (
                  <a href={socialLinks.spotify} target="_blank" rel="noopener noreferrer" className="social-link">
                    <Music size={20} />
                  </a>
                )}
                {authorInfo.email && (
                  <a href={`mailto:${authorInfo.email}`} className="social-link">
                    <Mail size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bio;
