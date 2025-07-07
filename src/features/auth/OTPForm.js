import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';

export default function OTPForm() {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const { verifyOTP } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await verifyOTP(phone, otp);
    alert(success ? "Verified!" : "Invalid OTP");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="tel"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="text"
        placeholder="OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button type="submit">Verify</button>
    </form>
  );
}