// src/pages/dashboard/YouthDashboard.js
import React from 'react';
import { FaUserAlt } from 'react-icons/fa';

export default function YouthDashboard() {
  const userData = JSON.parse(localStorage.getItem('userData'));
  
  return (
    <div className="dashboard youth-dashboard">
      <h1><FaUserAlt /> Dashibodi ya Vijana</h1>
      <div className="user-info">
        <h2>Karibu, {userData?.name}!</h2>
        <p>Kundi: NGUVU YA BUKU YOUTH</p>
      </div>
      {/* Add youth-specific content here */}
    </div>
  );
}