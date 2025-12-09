import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Download, Mail, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ContactView = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${API}/admin/contacts`);
      setContacts(response.data);
    } catch (error) {
      toast.error('Failed to fetch contacts');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (contacts.length === 0) {
      toast.error('No data to download');
      return;
    }

    const headers = ['Name', 'Email', 'Subject', 'Message', 'Date', 'Status'];
    const rows = contacts.map(item => [
      item.name,
      item.email,
      item.subject || '',
      item.message.replace(/,/g, ';'),
      new Date(item.submitted_at).toLocaleString(),
      item.status
    ]);
    const csv = [headers, ...rows].map(row => row.map(cell => `"${cell}"`).join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `contact_inquiries_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('CSV downloaded successfully');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 className="section-subtitle">Contact Form Submissions ({contacts.length})</h2>
        <Button className="btn-primary" onClick={downloadCSV}>
          <Download size={18} style={{ marginRight: '8px' }} />
          Download CSV
        </Button>
      </div>

      <div style={{ display: 'grid', gap: '20px' }}>
        {contacts.map((item) => (
          <div key={item.id} className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
              <div>
                <h3 style={{ color: 'var(--accent-silver)', marginBottom: '5px' }}>{item.name}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  <Mail size={14} style={{ marginRight: '6px', verticalAlign: 'middle' }} />
                  {item.email}
                </p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ 
                  padding: '4px 12px', 
                  background: 'rgba(212, 175, 55, 0.1)',
                  color: 'var(--accent-gold)',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '600'
                }}>
                  {item.status}
                </span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>
                  <Calendar size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                  {new Date(item.submitted_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
            {item.subject && (
              <p style={{ color: 'var(--text-primary)', fontWeight: '600', marginBottom: '10px' }}>
                Subject: {item.subject}
              </p>
            )}
            <div style={{ 
              background: 'var(--bg-primary)', 
              padding: '15px', 
              borderRadius: '4px',
              borderLeft: '3px solid var(--accent-red)'
            }}>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContactView;