import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Upload, Link as LinkIcon, X, Loader } from 'lucide-react';
import { toast } from 'sonner';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const ImageUpload = ({ value, onChange, label = "Image" }) => {
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState('url'); // 'url' or 'upload'
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image (JPEG, PNG, GIF, WEBP)');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${API}/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      // Construct full URL
      const imageUrl = `${BACKEND_URL}${response.data.url}`;
      onChange(imageUrl);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleUrlChange = (e) => {
    onChange(e.target.value);
  };

  const clearImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="image-upload-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <label style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{label}</label>
        <div style={{ display: 'flex', gap: '5px' }}>
          <Button
            type="button"
            onClick={() => setMode('url')}
            className={mode === 'url' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '4px 12px', fontSize: '0.85rem' }}
          >
            <LinkIcon size={14} style={{ marginRight: '4px' }} />
            URL
          </Button>
          <Button
            type="button"
            onClick={() => setMode('upload')}
            className={mode === 'upload' ? 'btn-primary' : 'btn-secondary'}
            style={{ padding: '4px 12px', fontSize: '0.85rem' }}
          >
            <Upload size={14} style={{ marginRight: '4px' }} />
            Upload
          </Button>
        </div>
      </div>

      {mode === 'url' ? (
        <Input
          value={value || ''}
          onChange={handleUrlChange}
          placeholder="Enter image URL (https://...)"
        />
      ) : (
        <div style={{ 
          border: '2px dashed var(--border-color)', 
          borderRadius: '8px', 
          padding: '20px', 
          textAlign: 'center',
          background: 'var(--bg-card)'
        }}>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="image-upload-input"
          />
          <label 
            htmlFor="image-upload-input" 
            style={{ 
              cursor: uploading ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            {uploading ? (
              <>
                <Loader size={32} className="animate-spin" style={{ color: 'var(--accent-silver)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Uploading...</span>
              </>
            ) : (
              <>
                <Upload size={32} style={{ color: 'var(--accent-silver)' }} />
                <span style={{ color: 'var(--text-secondary)' }}>Click to upload image</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>JPEG, PNG, GIF, WEBP (max 5MB)</span>
              </>
            )}
          </label>
        </div>
      )}

      {/* Preview */}
      {value && (
        <div style={{ marginTop: '15px', position: 'relative', display: 'inline-block' }}>
          <img 
            src={value} 
            alt="Preview" 
            style={{ 
              maxWidth: '200px', 
              maxHeight: '200px', 
              borderRadius: '8px',
              border: '1px solid var(--border-color)'
            }} 
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
          <button
            type="button"
            onClick={clearImage}
            style={{
              position: 'absolute',
              top: '-8px',
              right: '-8px',
              background: 'var(--accent-red)',
              border: 'none',
              borderRadius: '50%',
              width: '24px',
              height: '24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={14} style={{ color: 'white' }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
