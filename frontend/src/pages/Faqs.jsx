import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Button } from '../components/ui/button';
import { Loader } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${API}/faqs`);
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
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

  return (
    <div className="about-page">
      {/* FAQ Section */}
      <section className="faq-section" style={{ paddingTop: '120px' }}>
        <div className="container">
          <h1 className="page-title" style={{ textAlign: 'center', marginBottom: '60px' }}>Frequently Asked Questions</h1>
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
    </div>
  );
};

export default Faqs;
