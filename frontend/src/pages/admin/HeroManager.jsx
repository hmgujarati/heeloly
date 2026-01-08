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
    hero_title: '',
    hero_title_color: '#ffffff'
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
        hero_title: response.data.hero_title || '',
        hero_title_color: response.data.hero_title_color || '#ffffff'
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

          {/* Hero Title Color */}
          <div className="form-group" style={{ marginBottom: '30px' }}>
            <Label>Title Font Color</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginTop: '8px' }}>
              <input
                type="color"
                value={heroData.hero_title_color}
                onChange={(e) => setHeroData({ ...heroData, hero_title_color: e.target.value })}
                style={{ 
                  width: '60px', 
                  height: '40px', 
                  border: '2px solid var(--border-color)',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  background: 'transparent'
                }}
              />
              <Input
                value={heroData.hero_title_color}
                onChange={(e) => setHeroData({ ...heroData, hero_title_color: e.target.value })}
                placeholder="#ffffff"
                style={{ maxWidth: '150px' }}
              />
              <span 
                style={{ 
                  padding: '8px 16px', 
                  background: heroData.hero_title_color, 
                  color: heroData.hero_title_color === '#ffffff' || heroData.hero_title_color === '#fff' ? '#000' : '#fff',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}
              >
                Sample Text
              </span>
            </div>
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
