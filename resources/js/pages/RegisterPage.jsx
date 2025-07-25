import React from 'react';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage({ onRegister }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <RegisterForm onRegister={onRegister} />
    </div>
  );
}