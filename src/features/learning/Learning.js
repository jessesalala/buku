import React from 'react';
import { FaGraduationCap, FaChartLine, FaLaptopCode, FaLanguage } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Learning() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ color: '#333', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaGraduationCap /> Kozi
      </h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
        marginTop: '30px'
      }}>
        <Link 
          to="/learning/business" 
          style={{
            border: '1px solid #009688',
            padding: '20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.3s ease'
          }}
          className="card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaChartLine size={24} color="#009688" />
            <h3>Biashara</h3>
          </div>
          <p style={{ marginTop: '10px' }}>Jifunze ujasiriamali</p>
        </Link>

        <Link 
          to="/learning/technology" 
          style={{
            border: '1px solid #673AB7',
            padding: '20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.3s ease'
          }}
          className="card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaLaptopCode size={24} color="#673AB7" />
            <h3>Teknolojia</h3>
          </div>
          <p style={{ marginTop: '10px' }}>Programu na mifumo</p>
        </Link>

        <Link 
          to="/learning/language" 
          style={{
            border: '1px solid #FF5722',
            padding: '20px',
            borderRadius: '8px',
            textDecoration: 'none',
            color: 'inherit',
            transition: 'transform 0.3s ease'
          }}
          className="card-hover"
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FaLanguage size={24} color="#FF5722" />
            <h3>Lugha</h3>
          </div>
          <p style={{ marginTop: '10px' }}>Jifunze lugha mpya</p>
        </Link>
      </div>
    </div>
  );
}