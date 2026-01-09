import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Lock } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const AdminLogin = () => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post(`${API}/admin/login`, { password });
      if (response.data.success) {
        // Store login status
        sessionStorage.setItem('adminAuth', 'true');
        navigate('/admin');
      }
    } catch (err) {
      if (err.response?.status === 401) {
        setError('Incorrect password. Please try again.');
      } else {
        setError('Login failed. Please try again.');
      }
      setPassword('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'var(--bg-primary)'
    }}>
      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: '8px',
        padding: '40px',
        maxWidth: '400px',
        width: '90%',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <Lock size={48} style={{ color: 'var(--accent-gold)', marginBottom: '15px' }} />
          <h1 style={{ 
            fontFamily: 'var(--font-serif)', 
            color: 'var(--accent-silver)',
            fontSize: '2rem',
            marginBottom: '10px'
          }}>
            Admin Access
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Enter password to continue
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <Label htmlFor="password" style={{ color: 'var(--text-primary)' }}>Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              style={{ marginTop: '8px' }}
              autoFocus
              disabled={isLoading}
            />
          </div>

          {error && (
            <div style={{
              padding: '12px',
              background: 'rgba(139, 0, 0, 0.2)',
              border: '1px solid var(--accent-red)',
              borderRadius: '4px',
              color: 'var(--accent-red)',
              fontSize: '0.9rem',
              marginBottom: '20px'
            }}>
              {error}
            </div>
          )}

          <Button type="submit" className="btn-primary" style={{ width: '100%' }} disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div style={{
          marginTop: '30px',
          paddingTop: '20px',
          borderTop: '1px solid var(--border-color)',
          textAlign: 'center'
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Default password: <code style={{ 
              background: 'var(--bg-primary)', 
              padding: '2px 8px', 
              borderRadius: '4px',
              color: 'var(--accent-gold)',
              fontSize: '0.8rem'
            }}>heeloly2025</code>
            <br />
            <span style={{ fontSize: '0.75rem' }}>Change it in Admin → Settings</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
