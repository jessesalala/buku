import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaBookmark, FaShareAlt } from 'react-icons/fa';

export default function BookReader() {
  const { bookId } = useParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [fontSize, setFontSize] = useState(16);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Sample book data
  const book = {
    title: "NGUVU YA BUKU - Toleo la Wazima",
    pages: [
      "Hiki ni ukurasa wa kwanza...",
      "Maudhui ya ukurasa wa pili..."
    ]
  };

  const addBookmark = () => {
    const newBookmark = {
      bookId: bookId,
      bookTitle: book.title,
      pageNumber: currentPage + 1,
      date: new Date().toISOString()
    };

    const updatedBookmarks = [
      ...JSON.parse(localStorage.getItem('nguvu-ya-buku-bookmarks') || '[]'),
      newBookmark
    ];

    localStorage.setItem('nguvu-ya-buku-bookmarks', JSON.stringify(updatedBookmarks));
    setIsBookmarked(true);
    alert("Ukurasa umehifadhiwa kwenye alama zako!");
  };

  return (
    <div className="book-reader">
      <div className="reader-controls">
        <button onClick={() => setFontSize(f => Math.max(12, f - 1))}>
          A-
        </button>
        <span>Ukurasa {currentPage + 1} / {book.pages.length}</span>
        <button onClick={() => setFontSize(f => Math.min(24, f + 1))}>
          A+
        </button>
        <button onClick={addBookmark}>
          <FaBookmark color={isBookmarked ? '#2c7be5' : '#ccc'} />
        </button>
        <button>
          <FaShareAlt />
        </button>
      </div>
      
      <div 
        className="book-content"
        style={{ fontSize: `${fontSize}px` }}
      >
        {book.pages[currentPage]}
      </div>

      <div className="page-navigation">
        <button 
          onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
          disabled={currentPage === 0}
        >
          Nyuma
        </button>
        <button
          onClick={() => setCurrentPage(p => Math.min(book.pages.length - 1, p + 1))}
          disabled={currentPage === book.pages.length - 1}
        >
          Mbele
        </button>
      </div>
    </div>
  );
}
