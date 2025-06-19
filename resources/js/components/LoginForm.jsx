import { Link } from 'react-router-dom';
import { useState } from 'react';
import api from '../../api';


export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post('/login', {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem('auth_token', token);

      
      if (onLogin) onLogin(token);

    } catch (err) {
      setError('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Iniciar sesión</h2>

      {error && <p className="text-red-500">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="block w-full mb-2 p-2 border"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="block w-full mb-4 p-2 border"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Entrar
      </button>
      <Link to="/register" className="block mt-4 text-blue-600 hover:underline">
        Register
      </Link>
    </form>
  );
}