import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { PlusCircle, Edit, Trash2, Save, X, Music, Image as ImageIcon, BookOpen } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ExtrasManager = () => {
  const [extras, setExtras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingExtra, setEditingExtra] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: 'BookOpen',
    url: '',
    order: 0,
    active: true
  });

  const iconOptions = [
    { value: 'Music', label: 'Music (Playlist)' },
    { value: 'Image', label: 'Image (Moodboard)' },
    { value: 'BookOpen', label: 'Book (Bonus Chapters)' },
    { value: 'Link', label: 'Link (Generic)' },
    { value: 'Video', label: 'Video' },
    { value: 'FileText', label: 'Document' }
  ];

  useEffect(() => {
    fetchExtras();
  }, []);

  const fetchExtras = async () => {
    try {
      const response = await axios.get(`${API}/extras`);
      setExtras(response.data);
    } catch (error) {
      toast.error('Failed to fetch extras');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingExtra) {
        await axios.put(`${API}/admin/extras/${editingExtra.id}`, formData);
        toast.success('Extra updated successfully');
      } else {
        await axios.post(`${API}/admin/extras`, formData);
        toast.success('Extra created successfully');
      }
      fetchExtras();
      resetForm();
    } catch (error) {
      toast.error('Failed to save extra');
    }
  };

  const handleEdit = (extra) => {
    setEditingExtra(extra);
    setFormData({
      title: extra.title,
      description: extra.description,
      icon: extra.icon,
      url: extra.url,
      order: extra.order,
      active: extra.active
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this extra?')) {
      try {
        await axios.delete(`${API}/admin/extras/${id}`);
        toast.success('Extra deleted successfully');
        fetchExtras();
      } catch (error) {
        toast.error('Failed to delete extra');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      icon: 'BookOpen',
      url: '',
      order: 0,
      active: true
    });
    setEditingExtra(null);
    setShowForm(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 className="section-subtitle">Manage Extras</h2>
        <Button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={18} /> : <PlusCircle size={18} />}
          <span style={{ marginLeft: '8px' }}>{showForm ? 'Cancel' : 'Add New Extra'}</span>
        </Button>
      </div>

      {showForm && (
        <div className="admin-form" style={{ marginBottom: '40px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <Label>Title *</Label>
                <Input name="title" value={formData.title} onChange={handleInputChange} required placeholder="e.g., Playlist" />
              </div>
              <div className="form-group">
                <Label>Icon *</Label>
                <select name="icon" value={formData.icon} onChange={handleInputChange} className="admin-select">
                  {iconOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <Label>URL *</Label>
                <Input name="url" value={formData.url} onChange={handleInputChange} required placeholder="https://..." />
              </div>
              <div className="form-group">
                <Label>Display Order</Label>
                <Input name="order" type="number" value={formData.order} onChange={handleInputChange} />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <Label>Description *</Label>
              <Textarea name="description" value={formData.description} onChange={handleInputChange} rows={3} required placeholder="Brief description of this extra..." />
            </div>
            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="checkbox" name="active" checked={formData.active} onChange={handleInputChange} />
              <Label>Active (show on website)</Label>
            </div>

            <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
              <Button type="submit" className="btn-primary">
                <Save size={18} style={{ marginRight: '8px' }} />
                {editingExtra ? 'Update Extra' : 'Create Extra'}
              </Button>
              <Button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="extras-list">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {extras.map(extra => {
            const IconComponent = extra.icon === 'Music' ? Music : extra.icon === 'Image' ? ImageIcon : BookOpen;
            return (
              <div key={extra.id} className="admin-card" style={{ position: 'relative' }}>
                {!extra.active && (
                  <div style={{ position: 'absolute', top: '10px', right: '10px', background: 'rgba(255,0,0,0.2)', color: 'red', padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>
                    Inactive
                  </div>
                )}
                <div style={{ textAlign: 'center', marginBottom: '15px' }}>
                  <IconComponent size={48} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <h3 style={{ color: 'var(--accent-silver)', textAlign: 'center', marginBottom: '10px' }}>{extra.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', textAlign: 'center', marginBottom: '15px' }}>
                  {extra.description}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', wordBreak: 'break-all', marginBottom: '15px' }}>
                  {extra.url}
                </p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <Button onClick={() => handleEdit(extra)} className="btn-secondary" style={{ padding: '8px' }}>
                    <Edit size={16} />
                  </Button>
                  <Button onClick={() => handleDelete(extra.id)} className="btn-secondary" style={{ padding: '8px' }}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ExtrasManager;