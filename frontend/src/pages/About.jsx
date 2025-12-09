import React from 'react';
import { authorInfo, faqData } from '../data/author';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Button } from '../components/ui/button';
import { Instagram, Twitter, BookOpen, Mail } from 'lucide-react';

const About = () => {
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
                <a href={authorInfo.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                  <Instagram size={20} />
                </a>
                <a href={authorInfo.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                  <Twitter size={20} />
                </a>
                <a href={authorInfo.socialMedia.goodreads} target="_blank" rel="noopener noreferrer" className="social-link">
                  <BookOpen size={20} />
                </a>
                <a href={`mailto:${authorInfo.email}`} className="social-link">
                  <Mail size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <h2 className="section-title">Frequently Asked Questions</h2>
          {faqData.map((category, idx) => (
            <div key={idx} className="faq-category">
              <h3 className="faq-category-title">{category.category}</h3>
              <Accordion type="single" collapsible className="faq-accordion">
                {category.questions.map((item, qIdx) => (
                  <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                    <AccordionTrigger className="faq-question">{item.question}</AccordionTrigger>
                    <AccordionContent className="faq-answer">
                      {item.answer}
                      {item.hasLink && (
                        <Button className="btn-link mt-4" asChild>
                          <a href={item.linkUrl} target="_blank" rel="noopener noreferrer">
                            {item.linkText}
                          </a>
                        </Button>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
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

export default About;
