import React, { useState, useEffect } from 'react';
import { 
  FaCalculator, 
  FaMoneyBillWave, 
  FaBirthdayCake, 
  FaChartLine,
  FaCalendarAlt,
  FaCoins,
  FaCalendarDay,
  FaPiggyBank
} from 'react-icons/fa';
import './DailyInvestment.css'; // We'll create this CSS file

function DailyInvestment() {
  const [birthDate, setBirthDate] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);
  const [investmentResult, setInvestmentResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Constants
  const DAILY_INVESTMENT = 1000; // Tsh 1,000 kwa siku
  const ANNUAL_INTEREST = 0.12; // 12% kwa mwaka

  const calculateInvestment = () => {
    setLoading(true);
    
    setTimeout(() => {
      const birth = new Date(birthDate);
      const current = new Date(currentDate);
      const days = Math.floor((current - birth) / (1000 * 60 * 60 * 24));
      
      // Calculate daily compounded interest
      const dailyRate = ANNUAL_INTEREST / 365;
      let total = 0;
      
      for (let i = 0; i < days; i++) {
        total = (total + DAILY_INVESTMENT) * (1 + dailyRate);
      }
      
      setInvestmentResult({
        days: days,
        totalInvestment: Math.round(total),
        dailyAmount: DAILY_INVESTMENT,
        formattedTotal: new Intl.NumberFormat('sw-TZ', { 
          style: 'currency', 
          currency: 'TZS' 
        }).format(Math.round(total)),
        startDate: birthDate,
        endDate: currentDate
      });
      
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    if (birthDate) {
      calculateInvestment();
    }
  }, [birthDate, currentDate]);

  return (
    <div className="investment-app">
      {/* Header Card */}
      <div className="header-card">
        <FaCalculator className="header-icon" />
        <h2>Kikokotoo cha Uwekezaji wa Kila Siku</h2>
        <p>Angalia uwezo wa uwekezaji wako wa kila siku</p>
      </div>

      {/* Date Selection Cards */}
      <div className="date-cards">
        {/* Birth Date Card */}
        <div className="date-card">
          <div className="date-card-header">
            <FaBirthdayCake className="date-icon" />
            <h3>Tarehe ya Kuzaliwa</h3>
          </div>
          <input 
            type="date" 
            value={birthDate}
            max={currentDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="date-input"
          />
        </div>

        {/* Current Date Card */}
        <div className="date-card">
          <div className="date-card-header">
            <FaCalendarAlt className="date-icon" />
            <h3>Tarehe ya Mwisho</h3>
          </div>
          <input 
            type="date" 
            value={currentDate}
            onChange={(e) => setCurrentDate(e.target.value)}
            className="date-input"
          />
        </div>
      </div>

      {loading && (
        <div className="loading-card">
          <div className="spinner"></div>
          <p>Inakokotoa matokeo yako...</p>
        </div>
      )}

      {investmentResult && birthDate && (
        <div className="results-container">
          {/* Summary Card */}
          <div className="summary-card">
            <div className="card-header">
              <FaChartLine className="card-icon" />
              <h3>Muhtasari wa Uwekezaji</h3>
            </div>
            <div className="date-range">
              <span className="date-badge">
                <FaCalendarDay /> {new Date(investmentResult.startDate).toLocaleDateString()}
              </span>
              <span className="date-arrow">→</span>
              <span className="date-badge">
                <FaCalendarDay /> {new Date(investmentResult.endDate).toLocaleDateString()}
              </span>
            </div>
            
            <div className="summary-grid">
              <div className="summary-item">
                <FaCoins className="summary-icon" />
                <div>
                  <p className="summary-label">Uwekezaji wa Kila Siku</p>
                  <p className="summary-value">{DAILY_INVESTMENT.toLocaleString()} Tsh</p>
                </div>
              </div>
              
              <div className="summary-item">
                <FaCalendarDay className="summary-icon" />
                <div>
                  <p className="summary-label">Jumla ya Siku</p>
                  <p className="summary-value">{investmentResult.days.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Result Card */}
          <div className="result-highlight-card">
            <div className="card-header">
              <FaPiggyBank className="card-icon" />
              <h3>Jumla ya Uwekezaji</h3>
            </div>
            <div className="result-amount">
              {investmentResult.formattedTotal}
            </div>
            <p className="result-description">
              Kama ungewekeza <strong>Tsh 1,000 kila siku</strong> tangu kuzaliwa kwako
              kwa riba ya <strong>12% kwa mwaka</strong>, mpaka leo ungekuwa na:
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default DailyInvestment;