import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { PlusCircle, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';
import ImageUpload from './ImageUpload';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const BooksManager = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    author: 'Heeloly Upasani',
    series: 'Standalone',
    book_number: null,
    cover_image: '',
    blurb: '',
    genres: [],
    status: 'available',
    release_date: '',
    buy_links: []
  });
  const [newBuyLink, setNewBuyLink] = useState({ name: '', url: '' });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API}/books`);
      setBooks(response.data);
    } catch (error) {
      toast.error('Failed to fetch books');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleGenresChange = (e) => {
    const genres = e.target.value.split(',').map(g => g.trim());
    setFormData({ ...formData, genres });
  };

  const addBuyLink = () => {
    if (newBuyLink.name && newBuyLink.url) {
      setFormData({
        ...formData,
        buy_links: [...formData.buy_links, newBuyLink]
      });
      setNewBuyLink({ name: '', url: '' });
    }
  };

  const removeBuyLink = (index) => {
    const newLinks = formData.buy_links.filter((_, i) => i !== index);
    setFormData({ ...formData, buy_links: newLinks });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBook) {
        await axios.put(`${API}/admin/books/${editingBook.id}`, formData);
        toast.success('Book updated successfully');
      } else {
        await axios.post(`${API}/admin/books`, formData);
        toast.success('Book created successfully');
      }
      fetchBooks();
      resetForm();
    } catch (error) {
      toast.error('Failed to save book');
    }
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      series: book.series || 'Standalone',
      book_number: book.book_number,
      cover_image: book.cover_image,
      blurb: book.blurb,
      genres: book.genres || [],
      status: book.status,
      release_date: book.release_date || '',
      buy_links: book.buy_links || []
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await axios.delete(`${API}/admin/books/${id}`);
        toast.success('Book deleted successfully');
        fetchBooks();
      } catch (error) {
        toast.error('Failed to delete book');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      author: 'Heeloly Upasani',
      series: 'Standalone',
      book_number: null,
      cover_image: '',
      blurb: '',
      genres: [],
      status: 'available',
      release_date: '',
      buy_links: []
    });
    setEditingBook(null);
    setShowForm(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 className="section-subtitle">Manage Books</h2>
        <Button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={18} /> : <PlusCircle size={18} />}
          <span style={{ marginLeft: '8px' }}>{showForm ? 'Cancel' : 'Add New Book'}</span>
        </Button>
      </div>

      {showForm && (
        <div className="admin-form" style={{ marginBottom: '40px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <Label>Title *</Label>
                <Input name="title" value={formData.title} onChange={handleInputChange} required />
              </div>
              <div className="form-group">
                <Label>Author</Label>
                <Input name="author" value={formData.author} onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <Label>Series</Label>
                <Input name="series" value={formData.series} onChange={handleInputChange} placeholder="Standalone" />
              </div>
              <div className="form-group">
                <Label>Book Number (if series)</Label>
                <Input name="book_number" type="number" value={formData.book_number || ''} onChange={handleInputChange} />
              </div>
              <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                <ImageUpload 
                  value={formData.cover_image}
                  onChange={(url) => setFormData({ ...formData, cover_image: url })}
                  label="Cover Image *"
                />
              </div>
              <div className="form-group">
                <Label>Status *</Label>
                <select name="status" value={formData.status} onChange={handleInputChange} className="admin-select">
                  <option value="available">Available</option>
                  <option value="new-release">New Release</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>
              <div className="form-group">
                <Label>Release Date</Label>
                <Input name="release_date" value={formData.release_date} onChange={handleInputChange} placeholder="2024" />
              </div>
              <div className="form-group">
                <Label>Genres (comma-separated)</Label>
                <Input value={formData.genres.join(', ')} onChange={handleGenresChange} placeholder="Poetry, Romance" />
              </div>
            </div>
            <div className="form-group" style={{ marginTop: '20px' }}>
              <Label>Blurb *</Label>
              <Textarea name="blurb" value={formData.blurb} onChange={handleInputChange} rows={6} required />
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <Label>Buy Links</Label>
              <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
                <Input 
                  placeholder="Platform name (e.g., Amazon)" 
                  value={newBuyLink.name}
                  onChange={(e) => setNewBuyLink({ ...newBuyLink, name: e.target.value })}
                />
                <Input 
                  placeholder="URL" 
                  value={newBuyLink.url}
                  onChange={(e) => setNewBuyLink({ ...newBuyLink, url: e.target.value })}
                />
                <Button type="button" onClick={addBuyLink} className="btn-secondary">
                  <PlusCircle size={18} />
                </Button>
              </div>
              {formData.buy_links.length > 0 && (
                <div style={{ marginTop: '10px' }}>
                  {formData.buy_links.map((link, idx) => (
                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px', background: 'var(--bg-card)', marginBottom: '5px', borderRadius: '4px' }}>
                      <span>{link.name}: {link.url}</span>
                      <button type="button" onClick={() => removeBuyLink(idx)} style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer' }}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
              <Button type="submit" className="btn-primary">
                <Save size={18} style={{ marginRight: '8px' }} />
                {editingBook ? 'Update Book' : 'Create Book'}
              </Button>
              <Button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="books-list">
        {books.map(book => (
          <div key={book.id} className="admin-card">
            <div style={{ display: 'flex', gap: '20px' }}>
              <img src={book.cover_image} alt={book.title} style={{ width: '100px', height: '150px', objectFit: 'cover', borderRadius: '4px' }} />
              <div style={{ flex: 1 }}>
                <h3 style={{ color: 'var(--accent-silver)', marginBottom: '10px' }}>{book.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '5px' }}>{book.author}</p>
                <span className="status-badge" style={{ background: book.status === 'new-release' ? 'var(--accent-red)' : book.status === 'upcoming' ? 'var(--accent-gold)' : 'var(--accent-silver)' }}>
                  {book.status}
                </span>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '10px' }}>
                  {book.blurb.substring(0, 150)}...
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <Button onClick={() => handleEdit(book)} className="btn-secondary" style={{ padding: '8px' }}>
                  <Edit size={16} />
                </Button>
                <Button onClick={() => handleDelete(book.id)} className="btn-secondary" style={{ padding: '8px' }}>
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksManager;