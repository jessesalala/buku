import React from 'react';
import { Outlet } from 'react-router-dom';
import { FaUserTie } from 'react-icons/fa';
export default function BooksAdults() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaUserTie /> Vitabu vya Watu Wazima
      </h2>
      <p>Content for adult books will go here...</p>
    </div>
  );
}