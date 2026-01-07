import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Instagram, Twitter, BookOpen, Mail, Loader } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

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
                {authorInfo.social_links.instagram && authorInfo.social_links.instagram !== '#' && (
                  <a href={authorInfo.social_links.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                    <Instagram size={20} />
                  </a>
                )}
                {authorInfo.social_links.twitter && authorInfo.social_links.twitter !== '#' && (
                  <a href={authorInfo.social_links.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                    <Twitter size={20} />
                  </a>
                )}
                {authorInfo.social_links.goodreads && authorInfo.social_links.goodreads !== '#' && (
                  <a href={authorInfo.social_links.goodreads} target="_blank" rel="noopener noreferrer" className="social-link">
                    <BookOpen size={20} />
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
