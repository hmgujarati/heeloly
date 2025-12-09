import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { 
  BookOpen, MessageSquare, Mail, Settings, LogOut, 
  PlusCircle, FileText, Link as LinkIcon
} from 'lucide-react';
import BooksManager from './BooksManager';
import FAQManager from './FAQManager';
import ExtrasManager from './ExtrasManager';
import NewsletterView from './NewsletterView';
import ContactView from './ContactView';
import SettingsManager from './SettingsManager';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('books');

  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth');
    if (!isAuth) {
      navigate('/admin-login');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/admin-login');
  };

  const tabs = [
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'faqs', label: 'FAQs', icon: MessageSquare },
    { id: 'extras', label: 'Extras', icon: LinkIcon },
    { id: 'newsletter', label: 'Newsletter', icon: Mail },
    { id: 'contacts', label: 'Contacts', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: '2rem', 
              color: 'var(--accent-silver)',
              margin: 0
            }}>
              Admin Dashboard
            </h1>
            <Button className="btn-secondary" onClick={handleLogout}>
              <LogOut size={18} style={{ marginRight: '8px' }} />
              Logout
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="admin-nav">
        <div className="container">
          <div className="admin-tabs">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`admin-tab ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="admin-content">
        <div className="container">
          {activeTab === 'books' && <BooksManager />}
          {activeTab === 'faqs' && <FAQManager />}
          {activeTab === 'extras' && <ExtrasManager />}
          {activeTab === 'newsletter' && <NewsletterView />}
          {activeTab === 'contacts' && <ContactView />}
          {activeTab === 'settings' && <SettingsManager />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
