import React from 'react';
import { useState } from 'react';
import axios from 'axios';

export default function RegisterForm({ onRegister }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',//por defecto
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await axios.post('http://localhost:8000/api/register', form);
      const token = response.data.token;

      localStorage.setItem('auth_token', token);
      if (onRegister) onRegister(token);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al registrarse');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Registro</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      <input
        type="text"
        name="name"
        placeholder="Nombre"
        className="block w-full mb-2 p-2 border"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="block w-full mb-2 p-2 border"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        className="block w-full mb-2 p-2 border"
        value={form.password}
        onChange={handleChange}
        required
      />
      {/* Rol opcional */}
      <select
        name="role"
        className="block w-full mb-4 p-2 border"
        value={form.role}
        onChange={handleChange}
      >
        
        <option value="user">Estudiante</option>
        <option value="guest">Profesor</option>
        <option value="admin">Administrador</option>
      </select>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Registrarse
      </button>
    </form>
  );
}