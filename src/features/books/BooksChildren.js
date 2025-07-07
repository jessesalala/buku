import React from 'react';
import { Link } from 'react-router-dom';

const childrenBooks = [
  { id: 1, title: "Nguyu ya Buku Toto", pdf: "KITABU_NGUVU_YA_BUKU_TOTO.pdf" },
  { id: 2, title: "Hadithi za Watoto", pdf: "HADITHI_ZA_WATOTO.pdf" },
];

function BooksChildren() {
  return (
    <div className="children-books">
      <h2>Vitabu vya Watoto</h2>
      <p>Karibu kwenye ukurasa wa vitabu vya watoto!</p>
      
      <div className="book-list">
        {childrenBooks.map(book => (
          <Link 
            key={book.id} 
            to={`/books/children/view/${book.pdf}`} 
            className="book-link"
          >
            {book.title}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BooksChildren;