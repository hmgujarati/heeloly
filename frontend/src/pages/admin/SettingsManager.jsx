import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Save, Lock, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const SettingsManager = () => {
  const [authorInfo, setAuthorInfo] = useState({
    author_name: '',
    author_bio: '',
    author_photo: '',
    author_email: '',
    social_links: {}
  });
  const [passwords, setPasswords] = useState({
    current_password: '',
    new_password: '',
    confirm_password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthorInfo();
  }, []);

  const fetchAuthorInfo = async () => {
    try {
      const response = await axios.get(`${API}/author`);
      setAuthorInfo({
        author_name: response.data.name,
        author_bio: response.data.bio,
        author_photo: response.data.photo,
        author_email: response.data.email,
        social_links: response.data.social_links || {}
      });
    } catch (error) {
      toast.error('Failed to fetch author info');
    } finally {
      setLoading(false);
    }
  };

  const handleAuthorChange = (e) => {
    const { name, value } = e.target;
    setAuthorInfo({ ...authorInfo, [name]: value });
  };

  const handleSocialChange = (e) => {
    const { name, value } = e.target;
    setAuthorInfo({
      ...authorInfo,
      social_links: { ...authorInfo.social_links, [name]: value }
    });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords({ ...passwords, [name]: value });
  };

  const handleSaveAuthorInfo = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API}/admin/author`, authorInfo);
      toast.success('Author information updated successfully');
      fetchAuthorInfo();
    } catch (error) {
      toast.error('Failed to update author info');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    
    if (passwords.new_password !== passwords.confirm_password) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwords.new_password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    try {
      await axios.post(`${API}/admin/change-password`, {
        current_password: passwords.current_password,
        new_password: passwords.new_password
      });
      toast.success('Password changed successfully');
      setPasswords({ current_password: '', new_password: '', confirm_password: '' });
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Current password is incorrect');
      } else {
        toast.error('Failed to change password');
      }
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-section">
      <h2 className="section-subtitle" style={{ marginBottom: '40px' }}>Settings</h2>

      {/* Change Password Section */}
      <div className="admin-form" style={{ marginBottom: '40px' }}>
        <h3 style={{ color: 'var(--accent-gold)', marginBottom: '20px', display: 'flex', alignItems: 'center' }}>
          <Lock size={20} style={{ marginRight: '10px' }} />
          Change Admin Password
        </h3>
        <form onSubmit={handleChangePassword}>
          <div className="form-grid">
            <div className="form-group">
              <Label>Current Password *</Label>
              <div style={{ position: 'relative' }}>
                <Input 
                  type={showPassword ? 'text' : 'password'}
                  name="current_password" 
                  value={passwords.current_password} 
                  onChange={handlePasswordChange} 
                  required 
                />
              </div>
            </div>
            <div className="form-group">
              <Label>New Password *</Label>
              <Input 
                type={showPassword ? 'text' : 'password'}
                name="new_password" 
                value={passwords.new_password} 
                onChange={handlePasswordChange} 
                required 
                minLength={6}
              />
            </div>
            <div className="form-group">
              <Label>Confirm New Password *</Label>
              <Input 
                type={showPassword ? 'text' : 'password'}
                name="confirm_password" 
                value={passwords.confirm_password} 
                onChange={handlePasswordChange} 
                required 
                minLength={6}
              />
            </div>
          </div>
          <div style={{ marginTop: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ background: 'none', border: 'none', color: 'var(--accent-silver)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              <span>{showPassword ? 'Hide' : 'Show'} Passwords</span>
            </button>
          </div>
          <Button type="submit" className="btn-primary">
            <Save size={18} style={{ marginRight: '8px' }} />
            Change Password
          </Button>
        </form>
      </div>

      {/* Author Information Section */}
      <div className="admin-form">
        <h3 style={{ color: 'var(--accent-gold)', marginBottom: '20px' }}>Author Information</h3>
        <form onSubmit={handleSaveAuthorInfo}>
          <div className="form-grid">
            <div className="form-group">
              <Label>Author Name *</Label>
              <Input name="author_name" value={authorInfo.author_name} onChange={handleAuthorChange} required />
            </div>
            <div className="form-group">
              <Label>Email *</Label>
              <Input name="author_email" type="email" value={authorInfo.author_email} onChange={handleAuthorChange} required />
            </div>
            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
              <ImageUpload 
                value={authorInfo.author_photo}
                onChange={(url) => setAuthorInfo({ ...authorInfo, author_photo: url })}
                label="Author Photo"
              />
            </div>
          </div>
          <div className="form-group" style={{ marginTop: '20px' }}>
            <Label>Biography</Label>
            <Textarea name="author_bio" value={authorInfo.author_bio} onChange={handleAuthorChange} rows={5} />
          </div>
          
          <h4 style={{ color: 'var(--accent-silver)', marginTop: '30px', marginBottom: '15px' }}>Social Media Links</h4>
          <div className="form-grid">
            <div className="form-group">
              <Label>Instagram</Label>
              <Input name="instagram" value={authorInfo.social_links.instagram || ''} onChange={handleSocialChange} placeholder="https://instagram.com/..." />
            </div>
            <div className="form-group">
              <Label>Twitter</Label>
              <Input name="twitter" value={authorInfo.social_links.twitter || ''} onChange={handleSocialChange} placeholder="https://twitter.com/..." />
            </div>
            <div className="form-group">
              <Label>Goodreads</Label>
              <Input name="goodreads" value={authorInfo.social_links.goodreads || ''} onChange={handleSocialChange} placeholder="https://goodreads.com/..." />
            </div>
            <div className="form-group">
              <Label>Facebook</Label>
              <Input name="facebook" value={authorInfo.social_links.facebook || ''} onChange={handleSocialChange} placeholder="https://facebook.com/..." />
            </div>
            <div className="form-group">
              <Label>Pinterest</Label>
              <Input name="pinterest" value={authorInfo.social_links.pinterest || ''} onChange={handleSocialChange} placeholder="https://pinterest.com/..." />
            </div>
            <div className="form-group">
              <Label>Spotify</Label>
              <Input name="spotify" value={authorInfo.social_links.spotify || ''} onChange={handleSocialChange} placeholder="https://open.spotify.com/..." />
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <Button type="submit" className="btn-primary">
              <Save size={18} style={{ marginRight: '8px' }} />
              Save Author Information
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsManager;