
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import RegisterPage from './pages/RegisterPage';
import CoursePage from './pages/CoursePage';
import CreateCoursePage from './pages/CreateCoursePage';
import { UserProvider } from './UserContext';



export default function App() {
  const [token, setToken] = useState(localStorage.getItem('auth_token'));

  // Guarda el token en localStorage y estado
  const handleLogin = (newToken) => {
    localStorage.setItem('auth_token', newToken);
    setToken(newToken);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setToken(null);
  };


  return (
    <UserProvider>
    <Router>
      <Routes>

        <Route
          path="/login"
          element={token ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />} />
        <Route
          path="/dashboard"
          element={token ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" replace />} />

        <Route
          path="/register"
          element={token ? <Navigate to="/dashboard" replace /> : <RegisterPage onRegister={handleLogin} />} />
        <Route
          path='/courses'
          element={token ? <CoursePage /> : <Navigate to="/login" replace />} />
        <Route
          path="/courses/new"
          element={token ? <CreateCoursePage /> : <Navigate to="/login" replace />}/>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
    </UserProvider>
  );
}
import { createRoot } from 'react-dom/client'

const rootElement = document.getElementById('react-root');
if (rootElement) {
  createRoot(rootElement).render(<App />);
}

