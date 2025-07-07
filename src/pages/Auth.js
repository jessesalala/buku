import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { verifyOTP } from './authService';

export default function Auth() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1 = phone, 2 = OTP
  const navigate = useNavigate();

  const handleSendOTP = () => {
    // In production, call API to send OTP
    setStep(2);
  };

  const handleVerifyOTP = async () => {
    const success = await verifyOTP(phone, otp);
    if (success) {
      navigate('/dashboard');
    } else {
      alert('OTP si sahihi!');
    }
  };

  return (
    <div className="auth-container">
      {step === 1 ? (
        <div className="phone-step">
          <h2>Ingiza Namba ya Simu</h2>
          <input
            type="tel"
            placeholder="07XXXXXXXX"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSendOTP}>Tuma OTP</button>
        </div>
      ) : (
        <div className="otp-step">
          <h2>Ingiza OTP</h2>
          <input
            type="text"
            placeholder="6-digit code"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={handleVerifyOTP}>Thibitisha</button>
        </div>
      )}
    </div>
  );
}

// authService.js
export const verifyOTP = async (phone, otp) => {
  // Mock verification
  return otp === '123456';
};