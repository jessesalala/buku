import React, { useState } from 'react';
import { format } from 'date-fns';

export default function InvestmentCalculator() {
  const [birthDate, setBirthDate] = useState('');
  const [result, setResult] = useState(null);

  const calculateROI = () => {
    const daysLived = Math.floor((new Date() - new Date(birthDate)) / (1000 * 60 * 60 * 24));
    const annualRate = 0.12;
    let balance = 0;

    for (let day = 1; day <= daysLived; day++) {
      balance += 1000 * Math.pow(1 + annualRate / 365, day);
    }

    setResult({
      daysLived,
      futureValue: balance.toFixed(2),
      birthGroup: getAgeGroup(birthDate)
    });
  };

  const getAgeGroup = (dob) => {
    const age = new Date().getFullYear() - new Date(dob).getFullYear();
    return age < 18 ? 'TOTO' :
           age <= 35 ? 'YOUTH' :
           age <= 50 ? 'ADULT' : 'RETIREE';
  };

  return (
    <div>
      <h2>12% ROI Calculator</h2>
      <input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
      />
      <button onClick={calculateROI}>Calculate</button>
      {result && (
        <div>
          <p>Days lived: {result.daysLived}</p>
          <p>Future value: TZS {result.futureValue}</p>
          <p>Group: {result.birthGroup}</p>
        </div>
      )}
    </div>
  );
}