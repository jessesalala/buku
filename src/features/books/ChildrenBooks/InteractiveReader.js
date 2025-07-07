import React, { useState } from 'react';
import { FaVolumeUp, FaQuestionCircle } from 'react-icons/fa';

export default function InteractiveReader() {
  const [currentPage, setCurrentPage] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);

  const book = {
    title: "NGUVU YA BUKU - Watoto",
    pages: [
      {
        image: "image1.jpg",
        text: "Hii ni hadithi ya kwanza...",
        audio: "audio1.mp3",
        question: "Je, unaweza kuhesabu matunda?"
      }
    ]
  };

  const playAudio = () => {
    setAudioPlaying(true);
    // Audio implementation would go here
    setTimeout(() => setAudioPlaying(false), 2000);
  };

  return (
    <div className="children-reader">
      <div className="interactive-page">
        <img 
          src={book.pages[currentPage].image} 
          alt="Page illustration" 
        />
        <div className="page-text">{book.pages[currentPage].text}</div>
        
        <div className="interactive-controls">
          <button onClick={playAudio} disabled={audioPlaying}>
            <FaVolumeUp /> Sikiliza
          </button>
          <button>
            <FaQuestionCircle /> Jibu Swali
          </button>
        </div>
      </div>
    </div>
  );
}