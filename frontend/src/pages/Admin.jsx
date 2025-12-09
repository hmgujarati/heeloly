import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Download, Mail, User, Calendar, LogOut } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Admin = () => {
  const navigate = useNavigate();
  const [newsletters, setNewsletters] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('newsletters');

  useEffect(() => {
    // Check if user is authenticated
    const isAuth = sessionStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin-login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [newslettersRes, contactsRes] = await Promise.all([
        axios.get(`${API}/newsletter/subscribers`),
        axios.get(`${API}/contact/inquiries`)
      ]);
      setNewsletters(newslettersRes.data);
      setContacts(contactsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch data. Please check if backend is running.');
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = (data, filename) => {
    if (data.length === 0) {
      alert('No data to download');
      return;
    }

    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(item => 
      Object.values(item).map(val => 
        typeof val === 'string' && val.includes(',') ? `"${val}"` : val
      ).join(',')
    );
    const csv = [headers, ...rows].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  if (loading) {
    return (
      <div className="admin-page">
        <div className="container" style={{ padding: '100px 40px', textAlign: 'center' }}>
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page" style={{ padding: '100px 0', minHeight: '100vh' }}>
      <div className="container">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-description">Manage newsletter subscribers and contact inquiries</p>

        {/* Tabs */}
        <div className="admin-tabs" style={{ marginBottom: '40px', display: 'flex', gap: '20px', borderBottom: '1px solid var(--border-color)' }}>
          <button
            onClick={() => setActiveTab('newsletters')}
            style={{
              padding: '15px 30px',
              background: activeTab === 'newsletters' ? 'var(--accent-red)' : 'transparent',
              color: activeTab === 'newsletters' ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: 'none',
              borderBottom: activeTab === 'newsletters' ? '3px solid var(--accent-gold)' : 'none',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            <Mail size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Newsletter ({newsletters.length})
          </button>
          <button
            onClick={() => setActiveTab('contacts')}
            style={{
              padding: '15px 30px',
              background: activeTab === 'contacts' ? 'var(--accent-red)' : 'transparent',
              color: activeTab === 'contacts' ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: 'none',
              borderBottom: activeTab === 'contacts' ? '3px solid var(--accent-gold)' : 'none',
              cursor: 'pointer',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}
          >
            <User size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
            Contact Forms ({contacts.length})
          </button>
        </div>

        {/* Newsletter Subscribers */}
        {activeTab === 'newsletters' && (
          <div className="admin-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 className="section-subtitle">Newsletter Subscribers</h2>
              <Button 
                className="btn-primary" 
                onClick={() => downloadCSV(newsletters, 'newsletter_subscribers')}
              >
                <Download size={18} style={{ marginRight: '8px' }} />
                Download CSV
              </Button>
            </div>

            {newsletters.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>
                No newsletter subscribers yet.
              </p>
            ) : (
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
                    {newsletters.map((item, idx) => (
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
            )}
          </div>
        )}

        {/* Contact Inquiries */}
        {activeTab === 'contacts' && (
          <div className="admin-section">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 className="section-subtitle">Contact Form Submissions</h2>
              <Button 
                className="btn-primary" 
                onClick={() => downloadCSV(contacts, 'contact_inquiries')}
              >
                <Download size={18} style={{ marginRight: '8px' }} />
                Download CSV
              </Button>
            </div>

            {contacts.length === 0 ? (
              <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '40px' }}>
                No contact inquiries yet.
              </p>
            ) : (
              <div style={{ display: 'grid', gap: '20px' }}>
                {contacts.map((item) => (
                  <div 
                    key={item.id} 
                    style={{ 
                      background: 'var(--bg-card)', 
                      border: '1px solid var(--border-color)', 
                      borderRadius: '8px',
                      padding: '24px'
                    }}
                  >
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
