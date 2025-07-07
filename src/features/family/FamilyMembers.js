import React from 'react';
import { FaUserFriends } from 'react-icons/fa';

export default function FamilyMembers() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <FaUserFriends /> Wanafamilia
      </h2>
      <p>Family members content will go here...</p>
    </div>
  );
}