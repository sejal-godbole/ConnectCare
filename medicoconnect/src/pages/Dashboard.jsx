// src/pages/Dashboard.jsx
import React from 'react';
import LogoutButton from '../components/LogoutButton';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user.email}!</h1>
      <LogoutButton />
    </div>
  );
};

export default Dashboard;
