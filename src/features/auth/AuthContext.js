import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const verifyOTP = async (phone, otp) => {
    // Simulate API call
    if (otp === "123456") {
      setUser({ phone, verified: true });
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, verifyOTP }}>
      {children}
    </AuthContext.Provider>
  );
};