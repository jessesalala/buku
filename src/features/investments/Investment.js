import React from 'react';
import { FaMoneyBillWave, FaCalculator, FaChartLine } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Investment() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaMoneyBillWave /> Uwekezaji
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <Link 
          to="/calculator" 
          style={{
            border: '1px solid #FF9800',
            padding: '20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.3s ease'
          }}
          className="card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaCalculator size={24} color="#FF9800" />
            <h3>Kokotoa Uwekezaji</h3>
          </div>
          <p style={{ marginTop: '10px' }}>Pima faida ya uwekezaji wako</p>
        </Link>

        <Link 
          to="/investment/strategies" 
          style={{
            border: '1px solid #9C27B0',
            padding: '20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.3s ease'
          }}
          className="card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaChartLine size={24} color="#9C27B0" />
            <h3>Mikakati</h3>
          </div>
          <p style={{ marginTop: '10px' }}>Njia mbalimbali za kuwekeza</p>
        </Link>
      </div>
    </div>
  );
}