import React from 'react';
import { FaUsers, FaUserFriends, FaMoneyBillAlt, FaBullseye } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Family() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaUsers /> Familia
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <Link 
          to="/family/members" 
          style={{
            border: '1px solid #E91E63',
            padding: '20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.3s ease'
          }}
          className="card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaUserFriends size={24} color="#E91E63" />
            <h3>Wanafamilia</h3>
          </div>
          <p style={{ marginTop: '10px' }}>Orodha ya wanafamilia</p>
        </Link>

        <Link 
          to="/family/expenses" 
          style={{
            border: '1px solid #3F51B5',
            padding: '20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.3s ease'
          }}
          className="card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaMoneyBillAlt size={24} color="#3F51B5" />
            <h3>Matumizi</h3>
          </div>
          <p style={{ marginTop: '10px' }}>Fuatilia matumizi ya familia</p>
        </Link>
      </div>
    </div>
  );
}