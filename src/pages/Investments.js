import React, { useState } from 'react';
import { calculateAgeGroup, calculateROI } from './investmentUtils';

export default function Investment() {
  const [birthDate, setBirthDate] = useState('');
  const [dailyAmount, setDailyAmount] = useState(1000);
  const [result, setResult] = useState(null);

  const handleCalculate = () => {
    if (!birthDate) return;
    
    const ageGroup = calculateAgeGroup(birthDate);
    const roi = calculateROI(dailyAmount, birthDate);
    
    setResult({
      ageGroup,
      futureValue: roi,
      daysLived: Math.floor((new Date() - new Date(birthDate)) / (1000 * 60 * 60 * 24))
    });
  };

  return (
    <div className="investment-container">
      <h2>Kikokotoo cha Uwekezaji</h2>
      
      <div className="input-group">
        <label>Tarehe ya Kuzaliwa:</label>
        <input
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
      </div>

      <div className="input-group">
        <label>Kiasi cha Kila Siku (TZS):</label>
        <input
          type="number"
          value={dailyAmount}
          onChange={(e) => setDailyAmount(Number(e.target.value))}
        />
      </div>

      <button onClick={handleCalculate}>Kokotoa</button>

      {result && (
        <div className="result">
          <h3>Matokeo:</h3>
          <p>Kundi: {result.ageGroup}</p>
          <p>Siku Umeishi: {result.daysLived}</p>
          <p>Thamani ya Baadaye: TZS {result.futureValue.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}

// investmentUtils.js
export const calculateAgeGroup = (birthDate) => {
  const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
  return age < 18 ? 'TOTO' :
         age <= 35 ? 'YOUTH' :
         age <= 50 ? 'ADULT' : 'RETIREE';
};

export const calculateROI = (dailyAmount, startDate) => {
  const days = Math.floor((new Date() - new Date(startDate)) / (1000 * 60 * 60 * 24));
  let balance = 0;
  for (let day = 1; day <= days; day++) {
    balance += dailyAmount * Math.pow(1 + 0.12/365, day);
  }
  return balance.toFixed(2);
};