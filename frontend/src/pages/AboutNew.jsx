import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Button } from '../components/ui/button';
import { Instagram, Twitter, BookOpen, Mail, Loader } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AboutNew = () => {
  const [authorInfo, setAuthorInfo] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [authorRes, faqsRes] = await Promise.all([
        axios.get(`${API}/author`),
        axios.get(`${API}/faqs`)
      ]);
      setAuthorInfo(authorRes.data);
      setFaqs(faqsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
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

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          {faqs.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>
              No FAQs available at the moment.
            </p>
          ) : (
            faqs.map((category, idx) => (
              <div key={category.id} className="faq-category">
                <h3 className="faq-category-title">{category.category}</h3>
                <Accordion type="single" collapsible className="faq-accordion">
                  {category.questions.map((item, qIdx) => (
                    <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                      <AccordionTrigger className="faq-question">{item.question}</AccordionTrigger>
                      <AccordionContent className="faq-answer">
                        {item.answer}
                        {item.has_link && item.link_text && item.link_url && (
                          <Button className="btn-link mt-4" asChild>
                            <a href={item.link_url} target="_blank" rel="noopener noreferrer">
                              {item.link_text}
                            </a>
                          </Button>
                        )}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="newsletter-cta-section">
        <div className="container">
          <h2 className="section-title">Subscribe to be the first to get all the latest updates</h2>
          <p className="section-description">Exclusive content and more delivered to your inbox.</p>
          <Button className="btn-primary" size="lg">
            Join Newsletter
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutNew;
