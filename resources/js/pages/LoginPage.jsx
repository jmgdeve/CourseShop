import React from 'react';
import LoginForm from '../components/LoginForm';

export default function LoginPage({ onLogin }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm onLogin={onLogin} />
    </div>
  );
}