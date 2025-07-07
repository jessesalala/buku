import React from 'react';
import { Link } from 'react-router-dom';

export default function ChapterList() {
  const chapters = [
    { id: 1, title: "Sura ya Kwanza", progress: 100 },
    { id: 2, title: "Uwekezaji wa Kwanza", progress: 75 },
    { id: 3, title: "Kuhifadhi kwa Busara", progress: 0 }
  ];

  return (
    <div className="chapter-list">
      <h2>Yaliyomo</h2>
      <ul>
        {chapters.map(chapter => (
          <li key={chapter.id}>
            <Link to={`/read/${chapter.id}`}>
              <div className="chapter-progress" 
                   style={{ width: `${chapter.progress}%` }} />
              {chapter.title}
              <span>{chapter.progress}%</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}