import React, { useState } from 'react';
import './Calculator.css';

// Format numbers with TZS and comma separators
const formatTZS = (amount) => {
  return new Intl.NumberFormat('sw-TZ', {
    style: 'currency',
    currency: 'TZS',
    minimumFractionDigits: 2
  }).format(amount);
};

export default function Calculator() {
  // Loan Calculator State (in TZS)
  const [loanAmount, setLoanAmount] = useState(5000000); // 5 million TZS default
  const [loanTerm, setLoanTerm] = useState(3); // 3 years default
  const [interestRate, setInterestRate] = useState(12); // 12% p.a. common in Tanzania
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);

  // Savings Calculator State (in TZS)
  const [initialSavings, setInitialSavings] = useState(100000); // 100,000 TZS default
  const [monthlyContribution, setMonthlyContribution] = useState(50000); // 50,000 TZS default
  const [savingsTerm, setSavingsTerm] = useState(5); // 5 years default
  const [savingsRate, setSavingsRate] = useState(7); // 7% p.a. (typical fixed deposit rate)
  const [futureValue, setFutureValue] = useState(0);
  const [totalContributions, setTotalContributions] = useState(0);
  const [totalInterestEarned, setTotalInterestEarned] = useState(0);

  // Calculate loan details (TZS)
  const calculateLoan = () => {
    const principal = parseFloat(loanAmount);
    const calculatedInterest = parseFloat(interestRate) / 100 / 12;
    const calculatedPayments = parseFloat(loanTerm) * 12;
    
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);
    
    if (isFinite(monthly)) {
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * calculatedPayments);
      setTotalInterest((monthly * calculatedPayments) - principal);
    }
  };

  // Calculate savings details (TZS)
  const calculateSavings = () => {
    const monthlyRate = savingsRate / 100 / 12;
    const months = savingsTerm * 12;
    
    const futureVal = 
      initialSavings * Math.pow(1 + monthlyRate, months) +
      monthlyContribution * (Math.pow(1 + monthlyRate, months) - 1) / monthlyRate;
    
    const totalContrib = initialSavings + (monthlyContribution * months);
    
    setFutureValue(futureVal);
    setTotalContributions(totalContrib);
    setTotalInterestEarned(futureVal - totalContrib);
  };

  // Handle form submissions
  const handleLoanSubmit = (e) => {
    e.preventDefault();
    calculateLoan();
  };

  const handleSavingsSubmit = (e) => {
    e.preventDefault();
    calculateSavings();
  };

  // Calculate on component mount and when dependencies change
  React.useEffect(() => {
    calculateLoan();
    calculateSavings();
  }, []);

  return (
    <div className="page">
      <h2>Kikokotoo cha Fedha (Tanzania)</h2>
      <div className="calculator-grid">
        {/* Loan Calculator */}
        <div className="calc-card">
          <h3>Kikokotoo cha Mkopo</h3>
          <form onSubmit={handleLoanSubmit}>
            <div className="form-group">
              <label htmlFor="loanAmount">Kiasi cha Mkopo (TZS)</label>
              <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                min="100000"
                step="100000"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="loanTerm">Muda wa Mkopo (miaka)</label>
              <input
                type="number"
                id="loanTerm"
                value={loanTerm}
                onChange={(e) => setLoanTerm(e.target.value)}
                min="1"
                max="30"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="interestRate">Kiwango cha Riba (%)</label>
              <input
                type="number"
                id="interestRate"
                value={interestRate}
                onChange={(e) => setInterestRate(e.target.value)}
                min="1"
                max="30"
                step="0.5"
              />
            </div>
            
            <button type="submit" className="calculate-btn">Hesabu</button>
          </form>
          
          {monthlyPayment > 0 && (
            <div className="results">
              <h4>Matokeo:</h4>
              <p>Malipo ya kila mwezi: <strong>{formatTZS(monthlyPayment)}</strong></p>
              <p>Jumla ya riba: <strong>{formatTZS(totalInterest)}</strong></p>
              <p>Jumla ya malipo: <strong>{formatTZS(totalPayment)}</strong></p>
            </div>
          )}
        </div>

        {/* Savings Calculator */}
        <div className="calc-card">
          <h3>Kikokotoo cha Akiba</h3>
          <form onSubmit={handleSavingsSubmit}>
            <div className="form-group">
              <label htmlFor="initialSavings">Akiba ya awali (TZS)</label>
              <input
                type="number"
                id="initialSavings"
                value={initialSavings}
                onChange={(e) => setInitialSavings(e.target.value)}
                min="0"
                step="10000"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="monthlyContribution">Wekezo la kila mwezi (TZS)</label>
              <input
                type="number"
                id="monthlyContribution"
                value={monthlyContribution}
                onChange={(e) => setMonthlyContribution(e.target.value)}
                min="0"
                step="10000"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="savingsTerm">Muda wa kuwekeza (miaka)</label>
              <input
                type="number"
                id="savingsTerm"
                value={savingsTerm}
                onChange={(e) => setSavingsTerm(e.target.value)}
                min="1"
                max="50"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="savingsRate">Kiwango cha riba kwa mwaka (%)</label>
              <input
                type="number"
                id="savingsRate"
                value={savingsRate}
                onChange={(e) => setSavingsRate(e.target.value)}
                min="0"
                max="20"
                step="0.5"
              />
            </div>
            
            <button type="submit" className="calculate-btn">Hesabu</button>
          </form>
          
          {futureValue > 0 && (
            <div className="results">
              <h4>Matokeo:</h4>
              <p>Thamani baada ya muda: <strong>{formatTZS(futureValue)}</strong></p>
              <p>Jumla ya miradi: <strong>{formatTZS(totalContributions)}</strong></p>
              <p>Riba iliyopatikana: <strong>{formatTZS(totalInterestEarned)}</strong></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}