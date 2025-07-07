import React from 'react';
import { FaMoneyBillAlt } from 'react-icons/fa';

export default function FamilyExpenses() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaMoneyBillAlt /> Matumizi ya Familia
      </h2>
      <p>Family expenses content will go here...</p>
    </div>
  );
}