import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export default function ParentDashboard() {
  const children = [
    { name: "Anna", booksRead: 3, lastActive: "2023-05-15" },
    { name: "Juma", booksRead: 5, lastActive: "2023-05-18" }
  ];

  return (
    <div className="parent-dashboard">
      <h2>Taarifa za Watoto</h2>
      {children.map(child => (
        <div key={child.name} className="child-card">
          <h3>{child.name}</h3>
          <p>Vitabu vilivyosomwa: {child.booksRead}</p>
          <p>Mwisho kusoma: {child.lastActive}</p>
          <ProgressBar now={(child.booksRead / 10) * 100} label={`${child.booksRead}/10`} />
        </div>
      ))}
    </div>
  );
}