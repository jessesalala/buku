import React, { useState } from 'react';
import { FaBirthdayCake, FaCalendarAlt } from 'react-icons/fa';

export default function DaysAlive() {
  const [birthDate, setBirthDate] = useState('');
  const [daysAlive, setDaysAlive] = useState(null);

  const calculateDaysAlive = () => {
    const birthDateObj = new Date(birthDate);
    const today = new Date();

    if (isNaN(birthDateObj)) {
      alert("Tafadhali weka tarehe sahihi.");
      return;
    }

    const diffTime = today - birthDateObj;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDaysAlive(diffDays);
  };

  return (
    <div className="days-alive-page">

      {/* Card ya Bluu ya Juu */}
      <div className="header-card">
        <FaBirthdayCake size={50} className="header-icon" />
        <h1>Siku Umezaliwa</h1>
        <p>Angalia ni siku ngapi zimepita tangu ulipozaliwa</p>
      </div>

      {/* Sehemu ya kuchagua tarehe */}
      <div className="input-container">
        <div className="date-card">
          <label><FaCalendarAlt /> Tarehe ya Kuzaliwa</label>
          <input
            type="date"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            required
          />
        </div>
      </div>

      <button className="calculate-btn" onClick={calculateDaysAlive}>
        Hesabu Siku
      </button>

      {/* Matokeo */}
      {daysAlive !== null && (
        <div className="results-section">
          <h2>Matokeo:</h2>
          <div className="metrics-grid">
            <div><strong>{daysAlive.toLocaleString()}</strong> Siku</div>
          </div>
          <p className="summary-note">
            (Tangu {new Date(birthDate).toLocaleDateString()})
          </p>
        </div>
      )}
    </div>
  );
}
