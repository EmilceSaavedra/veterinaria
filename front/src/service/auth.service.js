import axios from 'axios';

const API_URL = 'http://localhost:3500/api'; // Base URL

axios.defaults.withCredentials = true; // Enviar cookies automáticamente con cada solicitud

// Registro de usuario
const register = async (username, password, rol) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { username, password, rol });
    return response.data; // Devuelve mensaje y datos del usuario
  } catch (error) {
    console.error('Error en register:', error);
    throw error;
  }
};

// Inicio de sesión
const login = async (username, password) => {
  try {
      const response = await axios.post(`${API_URL}/login`, { username, password });
      
      if (response.data && response.data.user) {
          return response.data;
      }
      
      throw new Error("Respuesta del servidor inválida");
  } catch (error) {
      // Manejar error de credenciales inválidas
      if (error.response && error.response.status === 401) {
          throw new Error("Usuario o contraseña incorrectos");
      }
      
      // Manejar otros errores
      if (error.response) {
          // Error de respuesta del servidor
          throw new Error("Error del servidor: " + (error.response.data.message || "Error desconocido"));
      } else if (error.request) {
          // Error de red
          throw new Error("Error de conexión. Por favor, verifica tu conexión a internet.");
      } else {
          // Otros errores
          throw new Error("Error inesperado: " + error.message);
      }
  }
};

// Cierre de sesión
const logout = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`); // Solicitud al backend
    console.log("Respuesta del backend:", response.data); // Confirmar respuesta
    return response.data;
  } catch (error) {
    console.error("Error en logout:", error.response?.data || error.message); // Mostrar más detalles
    throw error;
  }
};
// Refrescar el token de acceso
const refreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/token`);

    // El `accessToken` ya está en la cookie; no es necesario retornarlo explícitamente
    return response.data.user; // Devuelve solo los datos del usuario
  } catch (error) {
    console.error('Error al refrescar el token:', error);
    throw error;
  }
};

// Exportar funciones del servicio de autenticación
const authService = {
  register,
  login,
  logout,
  refreshToken,
};

export default authService;
