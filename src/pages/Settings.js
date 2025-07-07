import React, { useState } from 'react';
import { FaUser, FaPhone, FaEnvelope, FaLock, FaShieldAlt, FaArrowRight } from 'react-icons/fa';
import './Settings.css';

export default function AuthSettings() {
  const [activeForm, setActiveForm] = useState('login');
  const [loginMethod, setLoginMethod] = useState('phone');
  const [showOtp, setShowOtp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    otp: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const switchForm = (form) => {
    setActiveForm(form);
    setError('');
    setMessage('');
    setShowOtp(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if ((loginMethod === 'phone' && !formData.phone) || 
        (loginMethod === 'email' && !formData.email)) {
      setError(`Please enter your ${loginMethod === 'phone' ? 'phone number' : 'email'}`);
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage(`OTP sent to ${loginMethod === 'phone' ? formData.phone : formData.email}`);
      setShowOtp(true);
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.otp || formData.otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage('Login successful!');
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      setError('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      setMessage('Registration successful! Please login.');
      switchForm('login');
    } catch (err) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-app-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="app-logo">Nguvu</div>
          <h1>Welcome to Nguvu ya Buku</h1>
        </div>

        {/* Tabs */}
        <div className="form-tabs">
          <button
            className={`tab ${activeForm === 'login' ? 'active' : ''}`}
            onClick={() => switchForm('login')}
          >
            Login
          </button>
          <button
            className={`tab ${activeForm === 'register' ? 'active' : ''}`}
            onClick={() => switchForm('register')}
          >
            Register
          </button>
        </div>

        {/* Form Content */}
        <div className="form-content">
          {activeForm === 'login' ? (
            showOtp ? (
              <OtpForm 
                formData={formData}
                handleChange={handleChange}
                handleVerifyOTP={handleVerifyOTP}
                resendOTP={handleSendOTP}
                loading={loading}
                onBack={() => setShowOtp(false)}
              />
            ) : (
              <LoginForm 
                loginMethod={loginMethod}
                setLoginMethod={setLoginMethod}
                formData={formData}
                handleChange={handleChange}
                handleSendOTP={handleSendOTP}
                loading={loading}
              />
            )
          ) : (
            <RegisterForm 
              formData={formData}
              handleChange={handleChange}
              handleRegister={handleRegister}
              loading={loading}
            />
          )}

          {error && <div className="message error">{error}</div>}
          {message && <div className="message success">{message}</div>}
        </div>
      </div>
    </div>
  );
}

// Sub-components
const LoginForm = ({ loginMethod, setLoginMethod, formData, handleChange, handleSendOTP, loading }) => (
  <>
    <div className="method-toggle">
      <button
        className={`method-button ${loginMethod === 'phone' ? 'active' : ''}`}
        onClick={() => setLoginMethod('phone')}
      >
        <FaPhone /> Phone
      </button>
      <button
        className={`method-button ${loginMethod === 'email' ? 'active' : ''}`}
        onClick={() => setLoginMethod('email')}
      >
        <FaEnvelope /> Email
      </button>
    </div>

    <form onSubmit={handleSendOTP}>
      {loginMethod === 'phone' ? (
        <div className="input-group">
          <input
            type="tel"
            name="phone"
            placeholder="Enter phone number"
            value={formData.phone}
            onChange={handleChange}
            required
            className="with-icon"  // Add this class
          />
          
        </div>
      ) : (
        <div className="input-group">
          <input
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
            className="with-icon"  // Add this class
          />
          
        </div>
      )}

      <button type="submit" className="auth-button" disabled={loading}>
        {loading ? 'Sending...' : 'Send OTP'}
      </button>
    </form>
  </>
);

const OtpForm = ({ formData, handleChange, handleVerifyOTP, resendOTP, loading, onBack }) => (
  <>
    <button className="back-button" onClick={onBack} disabled={loading}>
      <FaArrowRight /> Back
    </button>
    
    <form onSubmit={handleVerifyOTP}>
  <div className="input-group">
    <input
      type="text"
      name="otp"
      placeholder="Enter 6-digit OTP"
      value={formData.otp}
      onChange={(e) => handleChange({
        target: {
          name: 'otp',
          value: e.target.value.replace(/\D/g, '').slice(0, 6)
        }
      })}
      maxLength={6}
      required
      className="with-icon"  // Added class for icon positioning
    />
    
  </div>
  
  <div className="otp-actions">
    <button type="button" className="resend-button" onClick={resendOTP} disabled={loading}>
      Resend OTP
    </button>
    <button type="submit" className="auth-button" disabled={loading}>
      {loading ? (
        <>
          <span className="spinner"></span> Verifying...
        </>
      ) : 'Verify OTP'}
    </button>
  </div>
</form>
  </>
);

const RegisterForm = ({ formData, handleChange, handleRegister, loading }) => (
  <form onSubmit={handleRegister}>
    <div className="input-group">
      
      <input
        type="text"
        name="name"
        placeholder="Full name"
        value={formData.name}
        onChange={handleChange}
        required
        className="with-icon"  // Add this class
      />
    </div>

    <div className="input-group">
      
      <input
        type="email"
        name="email"
        placeholder="Email address"
        value={formData.email}
        onChange={handleChange}
        required
        className="with-icon"  // Add this class
      />
    </div>

    <div className="input-group">
      
      <input
        type="tel"
        name="phone"
        placeholder="Phone number"
        value={formData.phone}
        onChange={handleChange}
        required
        className="with-icon"  // Add this class
      />
    </div>

    <div className="input-group">
      
      <input
        type="password"
        name="password"
        placeholder="Create password"
        value={formData.password}
        onChange={handleChange}
        required
        className="with-icon"  // Add this class
      />
    </div>

    <button type="submit" className="auth-button" disabled={loading}>
      {loading ? 'Registering...' : 'Register'}
    </button>
  </form>
);