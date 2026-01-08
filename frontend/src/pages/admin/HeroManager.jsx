import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Save, Image as ImageIcon } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const HeroManager = () => {
  const [heroData, setHeroData] = useState({
    hero_image: '',
    hero_title: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchHeroSettings();
  }, []);

  const fetchHeroSettings = async () => {
    try {
      const response = await axios.get(`${API}/hero`);
      setHeroData({
        hero_image: response.data.hero_image || '',
        hero_title: response.data.hero_title || ''
      });
    } catch (error) {
      console.error('Failed to fetch hero settings:', error);
      toast.error('Failed to load hero settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axios.put(`${API}/admin/hero`, heroData);
      toast.success('Hero settings saved successfully!');
    } catch (error) {
      console.error('Failed to save hero settings:', error);
      toast.error('Failed to save hero settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)' }}>Loading...</div>;
  }

  return (
    <div className="admin-section">
      <h2 className="section-subtitle" style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <ImageIcon size={24} />
        Manage Hero Section
      </h2>

      <div className="admin-form">
        <form onSubmit={handleSave}>
          {/* Hero Title */}
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <Label>Hero Title</Label>
            <Input
              value={heroData.hero_title}
              onChange={(e) => setHeroData({ ...heroData, hero_title: e.target.value })}
              placeholder="Enter hero title text"
              style={{ maxWidth: '500px' }}
            />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>
              This text appears on the hero banner on the homepage
            </p>
          </div>

          {/* Hero Image */}
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <ImageUpload
              value={heroData.hero_image}
              onChange={(url) => setHeroData({ ...heroData, hero_image: url })}
              label="Hero Background Image"
            />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '8px' }}>
              Recommended size: 1920x1080 pixels or larger for best quality
            </p>
          </div>

          {/* Preview */}
          {heroData.hero_image && (
            <div style={{ marginBottom: '30px' }}>
              <Label>Preview</Label>
              <div style={{ 
                position: 'relative', 
                width: '100%', 
                maxWidth: '800px',
                height: '300px',
                borderRadius: '8px',
                overflow: 'hidden',
                marginTop: '10px',
                border: '1px solid var(--border-color)'
              }}>
                <img 
                  src={heroData.hero_image} 
                  alt="Hero Preview" 
                  style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <h1 style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '2.5rem',
                    color: 'white',
                    textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase'
                  }}>
                    {heroData.hero_title || 'Hero Title'}
                  </h1>
                </div>
              </div>
            </div>
          )}

          <Button type="submit" className="btn-primary" disabled={saving}>
            <Save size={18} style={{ marginRight: '8px' }} />
            {saving ? 'Saving...' : 'Save Hero Settings'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default HeroManager;
