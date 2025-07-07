// src/features/content/ContentUpload.js
import React, { useState } from 'react';
import axios from 'axios';

function ContentUpload() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    contentType: 'text',
    file: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('content', formData.file);

    try {
      await axios.post('/api/upload', data);
      alert('Content uploaded successfully!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed');
    }
  };

  return (
    <div className="upload-form">
      <h2>Pakia Content</h2>
      <form onSubmit={handleSubmit}>
        <select 
          value={formData.contentType}
          onChange={(e) => setFormData({...formData, contentType: e.target.value})}
        >
          <option value="text">Maandishi</option>
          <option value="audio">Sauti</option>
          <option value="video">Video</option>
        </select>

        <input
          type="text"
          placeholder="Kichwa"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />

        <input
          type="text"
          placeholder="Kategoria"
          value={formData.category}
          onChange={(e) => setFormData({...formData, category: e.target.value})}
          required
        />

        <input
          type="file"
          accept={
            formData.contentType === 'audio' ? 'audio/*' :
            formData.contentType === 'video' ? 'video/*' : 'text/*'
          }
          onChange={(e) => setFormData({...formData, file: e.target.files[0]})}
          required
        />

        <button type="submit">Pakia</button>
      </form>
    </div>
  );
}

export default ContentUpload;