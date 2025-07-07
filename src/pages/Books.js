import React, { useState } from 'react';
import { EpubView } from 'epubjs';

const BOOKS = {
  ADULT: '/assets/books/nguvu_ya_buku_wakubwa.epub',
  CHILD: '/assets/books/nguvu_ya_buku_watoto.epub'
};

export default function BookReader() {
  const [bookType, setBookType] = useState('ADULT');
  const [location, setLocation] = useState(0);

  return (
    <div className="book-container">
      <div className="book-selector">
        <button 
          onClick={() => setBookType('ADULT')}
          className={bookType === 'ADULT' ? 'active' : ''}
        >
          Kwa Wakubwa
        </button>
        <button 
          onClick={() => setBookType('CHILD')}
          className={bookType === 'CHILD' ? 'active' : ''}
        >
          Kwa Watoto
        </button>
      </div>

      <div className="epub-viewer">
        <EpubView
          url={BOOKS[bookType]}
          location={location}
          locationChanged={(loc) => setLocation(loc)}
        />
      </div>

      <div className="navigation">
        <button onClick={() => setLocation(location - 1)}>Nyuma</button>
        <button onClick={() => setLocation(location + 1)}>Mbele</button>
      </div>
    </div>
  );
}
