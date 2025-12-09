import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { PlusCircle, Edit, Trash2, Save, X } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const FAQManager = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFAQ, setEditingFAQ] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    questions: [],
    order: 0
  });
  const [newQuestion, setNewQuestion] = useState({ question: '', answer: '', has_link: false, link_text: '', link_url: '' });

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      const response = await axios.get(`${API}/faqs`);
      setFaqs(response.data);
    } catch (error) {
      toast.error('Failed to fetch FAQs');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addQuestion = () => {
    if (newQuestion.question && newQuestion.answer) {
      setFormData({
        ...formData,
        questions: [...formData.questions, newQuestion]
      });
      setNewQuestion({ question: '', answer: '', has_link: false, link_text: '', link_url: '' });
    }
  };

  const removeQuestion = (index) => {
    const newQuestions = formData.questions.filter((_, i) => i !== index);
    setFormData({ ...formData, questions: newQuestions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingFAQ) {
        await axios.put(`${API}/admin/faqs/${editingFAQ.id}`, formData);
        toast.success('FAQ updated successfully');
      } else {
        await axios.post(`${API}/admin/faqs`, formData);
        toast.success('FAQ created successfully');
      }
      fetchFAQs();
      resetForm();
    } catch (error) {
      toast.error('Failed to save FAQ');
    }
  };

  const handleEdit = (faq) => {
    setEditingFAQ(faq);
    setFormData({
      category: faq.category,
      questions: faq.questions,
      order: faq.order
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this FAQ category?')) {
      try {
        await axios.delete(`${API}/admin/faqs/${id}`);
        toast.success('FAQ deleted successfully');
        fetchFAQs();
      } catch (error) {
        toast.error('Failed to delete FAQ');
      }
    }
  };

  const resetForm = () => {
    setFormData({ category: '', questions: [], order: 0 });
    setEditingFAQ(null);
    setShowForm(false);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="admin-section">
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
        <h2 className="section-subtitle">Manage FAQs</h2>
        <Button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? <X size={18} /> : <PlusCircle size={18} />}
          <span style={{ marginLeft: '8px' }}>{showForm ? 'Cancel' : 'Add New Category'}</span>
        </Button>
      </div>

      {showForm && (
        <div className="admin-form" style={{ marginBottom: '40px' }}>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Label>Category Name *</Label>
              <Input name="category" value={formData.category} onChange={handleInputChange} required placeholder="e.g., About My Writing" />
            </div>
            <div className="form-group">
              <Label>Display Order</Label>
              <Input name="order" type="number" value={formData.order} onChange={handleInputChange} />
            </div>
            
            <div style={{ marginTop: '20px' }}>
              <Label>Questions</Label>
              <div style={{ marginTop: '10px', padding: '15px', background: 'var(--bg-card)', borderRadius: '8px' }}>
                <div className="form-group">
                  <Input 
                    placeholder="Question" 
                    value={newQuestion.question}
                    onChange={(e) => setNewQuestion({ ...newQuestion, question: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <Textarea 
                    placeholder="Answer" 
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                    rows={3}
                  />
                </div>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center', marginBottom: '10px' }}>
                  <input 
                    type="checkbox" 
                    checked={newQuestion.has_link}
                    onChange={(e) => setNewQuestion({ ...newQuestion, has_link: e.target.checked })}
                  />
                  <Label>Include a link in answer</Label>
                </div>
                {newQuestion.has_link && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '10px' }}>
                    <Input 
                      placeholder="Link text" 
                      value={newQuestion.link_text}
                      onChange={(e) => setNewQuestion({ ...newQuestion, link_text: e.target.value })}
                    />
                    <Input 
                      placeholder="Link URL" 
                      value={newQuestion.link_url}
                      onChange={(e) => setNewQuestion({ ...newQuestion, link_url: e.target.value })}
                    />
                  </div>
                )}
                <Button type="button" onClick={addQuestion} className="btn-secondary" style={{ marginTop: '10px' }}>
                  <PlusCircle size={18} style={{ marginRight: '8px' }} />
                  Add Question
                </Button>
              </div>
              
              {formData.questions.length > 0 && (
                <div style={{ marginTop: '15px' }}>
                  {formData.questions.map((q, idx) => (
                    <div key={idx} style={{ padding: '12px', background: 'var(--bg-secondary)', marginBottom: '10px', borderRadius: '4px', borderLeft: '3px solid var(--accent-gold)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                          <strong style={{ color: 'var(--accent-silver)' }}>{q.question}</strong>
                          <p style={{ color: 'var(--text-secondary)', marginTop: '5px', fontSize: '0.9rem' }}>{q.answer}</p>
                          {q.has_link && (
                            <p style={{ color: 'var(--accent-gold)', marginTop: '5px', fontSize: '0.85rem' }}>Link: {q.link_text}</p>
                          )}
                        </div>
                        <button type="button" onClick={() => removeQuestion(idx)} style={{ background: 'none', border: 'none', color: 'var(--accent-red)', cursor: 'pointer' }}>
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{ marginTop: '30px', display: 'flex', gap: '10px' }}>
              <Button type="submit" className="btn-primary">
                <Save size={18} style={{ marginRight: '8px' }} />
                {editingFAQ ? 'Update FAQ' : 'Create FAQ'}
              </Button>
              <Button type="button" onClick={resetForm} className="btn-secondary">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="faqs-list">
        {faqs.map(faq => (
          <div key={faq.id} className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: 'var(--accent-gold)', marginBottom: '15px' }}>{faq.category}</h3>
                <div>
                  {faq.questions.map((q, idx) => (
                    <div key={idx} style={{ marginBottom: '10px', paddingLeft: '15px', borderLeft: '2px solid var(--border-color)' }}>
                      <strong style={{ color: 'var(--text-primary)', fontSize: '0.95rem' }}>{q.question}</strong>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '3px' }}>{q.answer.substring(0, 100)}...</p>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button onClick={() => handleEdit(faq)} className="btn-secondary" style={{ padding: '8px' }}>
                  <Edit size={16} />
                </Button>
                <Button onClick={() => handleDelete(faq.id)} className="btn-secondary" style={{ padding: '8px' }}>
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

export default FAQManager;