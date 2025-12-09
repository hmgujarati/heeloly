import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Download, Calendar } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const NewsletterView = () => {
  const [newsletters, setNewsletters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNewsletters();
  }, []);

  const fetchNewsletters = async () => {
    try {
      const response = await axios.get(`${API}/admin/newsletters`);
      setNewsletters(response.data);
    } catch (error) {
      toast.error('Failed to fetch newsletters');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = () => {
    if (newsletters.length === 0) {
      toast.error('No data to download');
      return;
    }

    const headers = ['Email', 'Subscribed Date', 'Status'];
    const rows = newsletters.map(item => [
      item.email,
      new Date(item.subscribed_at).toLocaleString(),
      item.active ? 'Active' : 'Inactive'
    ]);
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `newsletter_subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    toast.success('CSV downloaded successfully');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 className="section-subtitle">Newsletter Subscribers ({newsletters.length})</h2>
        <Button className="btn-primary" onClick={downloadCSV}>
          <Download size={18} style={{ marginRight: '8px' }} />
          Download CSV
        </Button>
      </div>

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '8px', overflow: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '15px', textAlign: 'left', color: 'var(--accent-silver)' }}>Email</th>
              <th style={{ padding: '15px', textAlign: 'left', color: 'var(--accent-silver)' }}>Subscribed Date</th>
              <th style={{ padding: '15px', textAlign: 'center', color: 'var(--accent-silver)' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {newsletters.map((item) => (
              <tr key={item.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '15px', color: 'var(--text-primary)' }}>{item.email}</td>
                <td style={{ padding: '15px', color: 'var(--text-secondary)' }}>
                  <Calendar size={16} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                  {new Date(item.subscribed_at).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
                <td style={{ padding: '15px', textAlign: 'center' }}>
                  <span style={{ 
                    padding: '4px 12px', 
                    background: item.active ? 'rgba(0, 255, 0, 0.1)' : 'rgba(255, 0, 0, 0.1)',
                    color: item.active ? '#00ff00' : '#ff0000',
                    borderRadius: '12px',
                    fontSize: '0.85rem',
                    fontWeight: '600'
                  }}>
                    {item.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default NewsletterView;