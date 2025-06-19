import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  // Cargar usuario si hay token si no devuelve null
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get('/user');
        setUser(res.data);
      } catch {
        setUser(null);
      }
    };
    if (localStorage.getItem('auth_token')) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Hook para usar el contexto
export function useUser() {
  return useContext(UserContext);
}