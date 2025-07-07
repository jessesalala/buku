// src/features/content/ContentDelivery.js
import React, { useState } from 'react';
import { FaFileAlt, FaHeadphones, FaVideo } from 'react-icons/fa';


function ContentDelivery() {
  const [contentType, setContentType] = useState('text');

  return (
    <div className="content-container">
      <div className="content-selector">
        <button 
          onClick={() => setContentType('text')}
          className={contentType === 'text' ? 'active' : ''}
        >
          <FaFileAlt /> Maandishi
        </button>
        <button 
          onClick={() => setContentType('audio')}
          className={contentType === 'audio' ? 'active' : ''}
        >
          <FaHeadphones /> Sauti
        </button>
        <button 
          onClick={() => setContentType('video')}
          className={contentType === 'video' ? 'active' : ''}
        >
          <FaVideo /> Video
        </button>
      </div>

      <div className="content-display">
        {contentType === 'text' && (
          <div className="text-content">
            <h3>Masomo ya Maandishi</h3>
            <p>Hapa utapata mafunzo yote kwa njia ya maandishi...</p>
            {/* Add your text content here */}
          </div>
        )}

        {contentType === 'audio' && (
          <div className="audio-content">
            <h3>Masomo ya Sauti</h3>
            <audio controls>
              <source src="/audio/example.mp3" type="audio/mpeg" />
              Browser yako haitambua audio.
            </audio>
            {/* Add more audio players */}
          </div>
        )}

        {contentType === 'video' && (
          <div className="video-content">
            <h3>Masomo ya Video</h3>
            <video controls width="100%">
              <source src="/videos/example.mp4" type="video/mp4" />
              Browser yako haitambua video.
            </video>
            {/* Add more video players */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ContentDelivery;