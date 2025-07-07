import React from 'react';
import { Link } from 'react-router-dom';
import { FaBook, FaMoneyBillWave, FaUsers, FaGraduationCap } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="home-container">
      <h1>KARIBU</h1>
      <h3>NGUVU YA BUKU</h3>
      
      <div className="feature-cards">
        <Link to="/books" className="card">
          <FaBook size={40} />
          <h3>Soma Vitabu</h3>
          <p>Kwa watoto na wakubwa</p>
        </Link>

        <Link to="/investment" className="card">
          <FaMoneyBillWave size={40} />
          <h3>Uwekezaji</h3>
          <p>Pima thamani ya uwekezaji wako</p>
        </Link>

        <Link to="/family" className="card">
          <FaUsers size={40} />
          <h3>Familia</h3>
          <p>Angalia maendeleo ya familia yako</p>
        </Link>

        <Link to="/learning" className="card">
          <FaGraduationCap size={40} />
          <h3>Kozi</h3>
          <p>Jifunze kutoka Tanzanite Academy</p>
        </Link>
      </div>
    </div>
  );
}