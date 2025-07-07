import React, { useState } from 'react';
import { FaCalendarAlt, FaClock, FaCalendarWeek, FaChartBar } from 'react-icons/fa';

function TimeAssessment() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [results, setResults] = useState(null);

  const calculateTime = () => {
    if (!startDate || !endDate) return;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
      alert("Tarehe ya mwisho haiwezi kuwa kabla ya tarehe ya kuanza.");
      return;
    }

    const diffTime = Math.abs(end - start);

    const calcResults = {
      siku: Math.ceil(diffTime / (1000 * 60 * 60 * 24)),
      wiki: Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7)),
      miezi: (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth()),
      miaka: end.getFullYear() - start.getFullYear()
    };

    setResults(calcResults);
  };

  return (
    <div className="time-assessment-page">

      {/* Card ya Bluu yenye Muonekano wa Screenshot */}
      <div className="header-card">
        <FaChartBar size={50} className="header-icon" />
        <h1>Tathmini ya Muda</h1>
        <p>Angalia muda uliopita kati ya tarehe ulizoweka</p>
      </div>

      {/* Inputs za Tarehe */}
      <div className="input-container">
        <div className="date-card">
          <label><FaClock /> Tarehe ya Kuanza</label>
          <input 
            type="date" 
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="date-card">
          <label><FaClock /> Tarehe ya Mwisho</label>
          <input 
            type="date" 
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      <button className="calculate-btn" onClick={calculateTime}>
        <FaChartBar /> Hesabu
      </button>

      {/* Matokeo */}
      {results && (
        <div className="results-section">
          <h2><FaCalendarWeek /> Matokeo:</h2>
          <div className="metrics-grid">
            <div><strong>Siku:</strong> {results.siku}</div>
            <div><strong>Wiki:</strong> {results.wiki}</div>
            <div><strong>Miezi:</strong> {results.miezi}</div>
            <div><strong>Miaka:</strong> {results.miaka}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeAssessment;
