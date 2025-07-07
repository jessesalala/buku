// src/pages/dashboard/AdultDashboard.js
import React from 'react';
import { FaUserTie } from 'react-icons/fa';

export default function AdultDashboard() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  
  return (
    <div className="dashboard adult-dashboard">
      <h1><FaUserTie /> Dashibodi ya Wazima</h1>
      <div className="user-info">
        <h2>Karibu, {userData?.name}!</h2>
        <p>Kundi: NGUVU YA BUKU ADULT</p>
      </div>
      {/* Add adult-specific content here */}
    </div>
  );
}