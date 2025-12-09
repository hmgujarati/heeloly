import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { books, comingSoonBooks } from '../data/books';
import { ArrowRight } from 'lucide-react';

const Home = () => {
  const newRelease = books[0];
  const comingSoon = comingSoonBooks[0];

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="https://customer-assets.emergentagent.com/job_writer-hub-11/artifacts/ie4guwi3_Untitled%20design%20%2855%29.png" 
            alt="Hero Background" 
            className="hero-image"
          />
          <div className="hero-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Enter In Grey</h1>
        </div>
      </section>

      {/* Time to Brave the Dark Section */}
      <section className="brave-dark-section">
        <div className="container">
          <div className="brave-content">
            <h2 className="section-title">Time to brave the dark...</h2>
            <p className="section-description">
              It's time to be the groundbreaking edition of A Journey Within and Enter In Grey from bestselling author Heeloly Upasani. Onyx Storm now available for purchase.
            </p>
            <div className="cta-buttons">
              <Button className="btn-primary" asChild>
                <a href={newRelease.amazonLink || '#'}>Buy Onyx Storm Now</a>
              </Button>
              <Button className="btn-secondary" asChild>
                <Link to="/books">Discover The Series</Link>
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
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your email" className="newsletter-input-inline" />
            <Button className="btn-primary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
