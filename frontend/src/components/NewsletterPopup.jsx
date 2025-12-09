import React, { useState, useEffect } from 'react';
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

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('newsletterPopupSeen');
    if (!hasSeenPopup) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('newsletterPopupSeen', 'true');
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
