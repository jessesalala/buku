// src/features/user/UserRegistration.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAgeGroup } from '../../utils/ageGroup';
import { FaUser, FaEnvelope, FaLock, FaBirthdayCake } from 'react-icons/fa';

function UserRegistration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    birthDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const group = getAgeGroup(formData.birthDate);
    
    // Save user data to localStorage or your backend
    const userData = { ...formData, group };
    localStorage.setItem('currentUser', JSON.stringify(userData));
    
    // Redirect based on age group
    switch(group) {
      case "NGUVU YA BUKU TOTO":
        navigate('/books/children');
        break;
      case "NGUVU YA BUKU YOUTH":
        navigate('/learning/youth');
        break;
      case "NGUVU YA BUKU ADULT":
        navigate('/books/adults');
        break;
      case "NGUVU YA BUKU RETIREE":
        navigate('/family/retirees');
        break;
      default:
        navigate('/');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ 
      maxWidth: '500px', 
      margin: '2rem auto',
      padding: '2rem',
      boxShadow: '0 0 10px rgba(0,0,0,0.1)',
      borderRadius: '8px'
    }}>
      <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        Jiandikishe Kwenye Nguvu ya Buku
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <FaUser style={{ marginRight: '0.5rem' }} />
            Jina Kamili
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <FaEnvelope style={{ marginRight: '0.5rem' }} />
            Barua Pepe
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <FaLock style={{ marginRight: '0.5rem' }} />
            Nenosiri
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', marginBottom: '0.5rem' }}>
            <FaBirthdayCake style={{ marginRight: '0.5rem' }} />
            Tarehe ya Kuzaliwa
          </label>
          <input
            type="date"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>

        <button 
          type="submit"
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#2c7be5',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          Jiandikishe Sasa
        </button>
      </form>
    </div>
  );
}

export default UserRegistration;