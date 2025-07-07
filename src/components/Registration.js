import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaBirthdayCake, FaEnvelope, FaPhone, FaUsers } from 'react-icons/fa';
import './Registration.css';
import TranslatedText from './TranslatedText';
import LanguageSwitcher from './LanguageSwitcher';

export default function Registration({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    phone: '',
    group: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const calculateGroup = (dob) => {
    if (!dob) return '';
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    const age = currentYear - birthYear;

    if (isNaN(age)) return '';

    if (age < 18) return 'TOTO';
    if (age <= 35) return 'YOUTH';
    if (age <= 50) return 'ADULT';
    return 'RETIREE';
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { 
      ...formData, 
      [name]: value 
    };

    if (name === 'dob') {
      updatedFormData.group = calculateGroup(value);
    }

    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.dob || !formData.email || !formData.phone) {
      setError('Tafadhali jaza sehemu zote');
      return;
    }

    if (!formData.group) {
      setError('Tafadhali thibitisha tarehe yako ya kuzaliwa');
      return;
    }

    try {
      // Call the success handler from props
      if (onSuccess) {
        onSuccess(formData);
      }

      // Save to localStorage
      localStorage.setItem('userData', JSON.stringify(formData));

      // Redirect to appropriate dashboard
      const dashboardPaths = {
        'TOTO': '/dashboard/watoto',
        'YOUTH': '/dashboard/vijana',
        'ADULT': '/dashboard/wazima',
        'RETIREE': '/dashboard/wazee'
      };

      const path = dashboardPaths[formData.group];
      if (path) {
        navigate(path, { replace: true });
      } else {
        setError('Kundi halijapatikana. Tafadhali angalia tarehe yako ya kuzaliwa.');
      }
    } catch (err) {
      setError('Hitilafu ya mfumo. Tafadhali jaribu tena.');
      console.error(err);
    }
  };

  return (
    <div className="registration-container">
      <h1>Usajili wa Nguvu ya Buku</h1>
      
      <form onSubmit={handleSubmit}>
        {/* ... (keep your existing form fields) ... */}
      </form>
    </div>
  );
}