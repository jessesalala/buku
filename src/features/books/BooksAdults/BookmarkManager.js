import React, { useState, useEffect } from 'react';
import { FaBookmark, FaTrash, FaShareAlt } from 'react-icons/fa';

export default function BookmarkManager() {
  const [bookmarks, setBookmarks] = useState([]);

  // Load bookmarks from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = JSON.parse(localStorage.getItem('nguvu-ya-buku-bookmarks')) || [];
    setBookmarks(savedBookmarks);
  }, []);

  const deleteBookmark = (index) => {
    const updatedBookmarks = bookmarks.filter((_, i) => i !== index);
    setBookmarks(updatedBookmarks);
    localStorage.setItem('nguvu-ya-buku-bookmarks', JSON.stringify(updatedBookmarks));
  };

  return (
    <div className="bookmark-manager">
      <h2><FaBookmark /> Alama Zako</h2>
      
      {bookmarks.length === 0 ? (
        <p className="empty-state">Huna alama zozote zilizohifadhiwa</p>
      ) : (
        <ul className="bookmark-list">
          {bookmarks.map((bookmark, index) => (
            <li key={index} className="bookmark-item">
              <div className="bookmark-content">
                <h3>{bookmark.bookTitle}</h3>
                <p>Sura: {bookmark.chapter}</p>
                <p>Ukurasa: {bookmark.pageNumber}</p>
                <small>{new Date(bookmark.date).toLocaleDateString()}</small>
              </div>
              <div className="bookmark-actions">
                <button 
                  onClick={() => deleteBookmark(index)}
                  className="icon-button"
                  aria-label="Futa"
                >
                  <FaTrash />
                </button>
                <button 
                  onClick={() => navigator.share({
                    title: bookmark.bookTitle,
                    text: `Nimeweka alama kwenye ukurasa ${bookmark.pageNumber}`,
                    url: window.location.href
                  })}
                  className="icon-button"
                  aria-label="Shiriki"
                >
                  <FaShareAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}