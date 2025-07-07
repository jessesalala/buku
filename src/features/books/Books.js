import React from 'react';
import { FaBook, FaChild, FaUserTie } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Books() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaBook /> Vitabu
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <Link 
          to="/books/children" 
          style={{
            border: '1px solid #4CAF50',
            padding: '20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.3s ease'
          }}
          className="card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaChild size={24} color="#4CAF50" />
            <h3>Vitabu vya Watoto</h3>
          </div>
          <p style={{ marginTop: '10px' }}>Soma kwa watoto wadogo</p>
        </Link>

        <Link 
          to="/books/adults" 
          style={{
            border: '1px solid #2196F3',
            padding: '20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.3s ease'
          }}
          className="card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaUserTie size={24} color="#2196F3" />
            <h3>Vitabu vya Watu Wazima</h3>
          </div>
          <p style={{ marginTop: '10px' }}>Kwa wakubwa</p>
        </Link>
      </div>
    </div>
  );
}