import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Don't show popup on admin pages
    if (location.pathname.startsWith('/admin')) {
      return;
    }

    const hasSeenPopup = sessionStorage.getItem('newsletterPopupSeen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('newsletterPopupSeen', 'true');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(`${API}/newsletter/subscribe`, { email });
      toast.success('Successfully subscribed to newsletter!');
      setEmail('');
      handleClose();
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="newsletter-popup-overlay">
      <div className="newsletter-popup-content">
        <button className="newsletter-close" onClick={handleClose}>
          <X size={24} />
        </button>
        <h2>Stay Connected</h2>
        <p>Subscribe to receive updates on new releases, exclusive content, and special offers.</p>
        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="newsletter-input"
          />
          <Button type="submit" disabled={isSubmitting} className="newsletter-button">
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterPopup;
