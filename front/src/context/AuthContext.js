import React, { createContext, useState, useEffect } from 'react';
import authService from '../service/auth.service';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate para redirección

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate(); // Hook para redirección

  // Efecto para cargar el usuario al inicio
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.refreshToken();

        // Establecer el usuario con la respuesta del backend
        setUser({
          id: response.id,
          username: response.username,
          rol: response.rol,
        });
      } catch (error) {
        console.error('Error al obtener el usuario:', error);
        setUser(null);
      } finally {
        setLoading(false); // Detener el estado de carga
      }
    };

    fetchUser();
  }, []);

  // Función de inicio de sesión
  const login = async (username, password) => {
    try {
      const response = await authService.login(username, password);
  
      if (!response.user) {
        throw new Error("La respuesta no contiene datos de usuario.");
      }
  
      // Guarda los datos del usuario en el estado
      setUser({
        id: response.user.id,
        username: response.user.username,
        role: response.user.rol, // Cambiado a "rol" según el backend
      });
  
      return response;
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  // Función de cierre de sesión
  const logout = async () => {
    try {
      await authService.logout();
      setUser(null); // Limpiar el estado del usuario

      // Eliminar cookies de acceso y refresco
      document.cookie = 'accessToken=; Max-Age=-99999999;';  // Eliminar cookies
      document.cookie = 'refreshToken=; Max-Age=-99999999;';

      // Redirigir a la página de login
      navigate('/login'); // Redirigir a la página de login
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>Cargando...</div> : children} {/* Renderizar los hijos solo cuando la carga termine */}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
