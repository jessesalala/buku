import React, { useState } from 'react';
import { FaCalendarAlt, FaChartBar } from 'react-icons/fa';

function TimeReport() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [report, setReport] = useState(null);

  const generateReport = () => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end) || end < start) {
      alert("Tafadhali weka tarehe sahihi.");
      return;
    }

    const diffTime = Math.abs(end - start);
    const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    setReport({
      siku: days,
      wiki: weeks,
      miezi: months,
      miaka: years,
      vipindi: [
        { jina: 'Asubuhi', thamani: '7:00 - 12:00' },
        { jina: 'Mchana', thamani: '12:00 - 16:00' },
        { jina: 'Jioni', thamani: '16:00 - 19:00' },
        { jina: 'Usiku', thamani: '19:00 - 7:00' }
      ]
    });
  };

  return (
    <div className="time-report-page">

      {/* Card ya Bluu Sawa na Screenshot */}
      <div className="header-card">
        <FaChartBar size={50} className="header-icon" />
        <h1>Ripoti ya Muda</h1>
        <p>Angalia taarifa ya kipindi kati ya tarehe ulizochagua</p>
      </div>

      {/* Inputs za Tarehe */}
      <div className="input-container">
        <div className="date-card">
          <label><FaCalendarAlt /> Tarehe ya Kuanza</label>
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </div>

        <div className="date-card">
          <label><FaCalendarAlt /> Tarehe ya Mwisho</label>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </div>
      </div>

      <button className="calculate-btn" onClick={generateReport}>
        Tengeneza Ripoti
      </button>

      {/* Matokeo */}
      {report && (
        <div className="results-section">
          <h2>Matokeo:</h2>
          <div className="metrics-grid">
            <div><strong>Siku:</strong> {report.siku}</div>
            <div><strong>Wiki:</strong> {report.wiki}</div>
            <div><strong>Miezi:</strong> {report.miezi}</div>
            <div><strong>Miaka:</strong> {report.miaka}</div>
          </div>

          <h3>Vipindi vya Siku:</h3>
          <ul className="period-list">
            {report.vipindi.map((item, index) => (
              <li key={index}>
                <strong>{item.jina}:</strong> {item.thamani}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TimeReport;
