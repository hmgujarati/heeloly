import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { books, comingSoonBooks } from '../data/books';
import { ArrowRight } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const newRelease = books[0];
  const comingSoon = comingSoonBooks[0];
  const [homeEmail, setHomeEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [heroData, setHeroData] = useState({
    hero_image: 'https://customer-assets.emergentagent.com/job_writer-hub-11/artifacts/ie4guwi3_Untitled%20design%20%2855%29.png',
    hero_title: 'Enter In Grey',
    hero_title_color: '#ffffff'
  });

  useEffect(() => {
    fetchHeroData();
  }, []);

  const fetchHeroData = async () => {
    try {
      const response = await axios.get(`${API}/hero`);
      setHeroData({
        hero_image: response.data.hero_image || heroData.hero_image,
        hero_title: response.data.hero_title || heroData.hero_title,
        hero_title_color: response.data.hero_title_color || '#ffffff'
      });
    } catch (error) {
      console.error('Failed to fetch hero data:', error);
    }
  };

  const handleHomeSubmit = async (e) => {
    e.preventDefault();
    if (!homeEmail) {
      toast.error('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email: homeEmail });
      toast.success('Successfully subscribed to newsletter!');
      setHomeEmail('');
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

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src={heroData.hero_image} 
            alt="Hero Background" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">{heroData.hero_title}</h1>
        </div>
      </section>

      {/* Book Showcase Section */}
      <section className="brave-dark-section">
        <div className="container">
          <div className="brave-content">
            <p className="section-description">
              Explore my collection of poetry that reflects my thoughts, questions, and unspoken wishes. A Journey Within is now available for purchase.
            </p>
            <div className="cta-buttons">
              <Button className="btn-primary" asChild>
                <a href="https://amzn.in/d/5WdUQA8" target="_blank" rel="noopener noreferrer">Buy on Amazon</a>
              </Button>
            </div>
          </div>
          <div className="books-showcase">
            <div className="book-display">
              <img src={newRelease.coverImage} alt={newRelease.title} className="book-cover" />
              <div className="book-badge new-release">New Release</div>
            </div>
            {comingSoon && (
              <div className="book-display coming-soon-display">
                <img src={comingSoon.coverImage} alt={comingSoon.title} className="book-cover" />
                <div className="book-badge coming-soon">Coming Soon</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* About Preview Section */}
      <section className="about-preview-section">
        <div className="container">
          <h2 className="section-title">About Heeloly Upasani</h2>
          <p className="about-preview-text">
            Heeloly Upasani is an author dedicated to crafting stories that inspire, transform, and resonate deeply with readers. With a unique voice that blends emotional depth with compelling narratives, her work explores the human experience in all its complexity.
          </p>
          <Button className="btn-secondary" asChild>
            <Link to="/about">
              Learn More <ArrowRight size={16} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <h2 className="section-title">Stay Connected</h2>
          <p className="section-description">
            Subscribe to receive updates on new releases, exclusive content, and special offers.
          </p>
          <form onSubmit={handleHomeSubmit} className="newsletter-form">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="newsletter-input-inline"
              value={homeEmail}
              onChange={(e) => setHomeEmail(e.target.value)}
              disabled={isSubmitting}
            />
            <Button type="submit" className="btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
