import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../components/ui/button';
import { Loader } from 'lucide-react';
import * as Icons from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ExtrasNew = () => {
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExtras();
  }, []);

  const fetchExtras = async () => {
    try {
      const response = await axios.get(`${API}/extras`);
      setExtras(response.data);
    } catch (error) {
      console.error('Error fetching extras:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="extras-page" style={{ padding: '100px 0', textAlign: 'center' }}>
        <Loader size={48} className="animate-spin" style={{ margin: '0 auto', color: 'var(--accent-silver)' }} />
        <p style={{ marginTop: '20px', color: 'var(--text-secondary)' }}>Loading extras...</p>
      </div>
    );
  }

  return (
    <div className="extras-page">
      <div className="container">
        <h1 className="page-title">Extras</h1>
        <p className="page-description">Dive deeper into the world of the stories with playlists, moodboards, and exclusive bonus content.</p>

        <div className="extras-grid">
          {extras.map(extra => {
            // Get the icon component dynamically
            const IconComponent = Icons[extra.icon] || Icons.BookOpen;
            
            return (
              <div key={extra.id} className="extra-card">
                <div className="extra-icon">
                  <IconComponent size={48} />
                </div>
                <h3 className="extra-title">{extra.title}</h3>
                <p className="extra-description">
                  {extra.description}
                </p>
                <Button className="btn-primary" asChild>
                  <a href={extra.url} target="_blank" rel="noopener noreferrer">
                    {extra.title === 'Playlist' ? 'Listen on Spotify' : 
                     extra.title === 'Moodboard' ? 'View on Pinterest' : 
                     'Explore'}
                  </a>
                </Button>
              </div>
            );
          })}
        </div>

        {extras.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
              No extras available at the moment. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExtrasNew;
