// auth.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Verificar que las variables existan
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || 'default_access_secret';
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || 'default_refresh_secret';

if (!process.env.ACCESS_TOKEN_SECRET || !process.env.REFRESH_TOKEN_SECRET) {
    console.warn('WARNING: Token secrets no encontrados en .env');
}

const authenticateJWT = (roles = []) => {
    return (req, res, next) => {
      const token = req.cookies?.accessToken;
  
      if (!token) {
        return res.status(401).json({
          message: "Acceso denegado - Token no proporcionado",
        });
      }
  
      try {
        const user = jwt.verify(token, accessTokenSecret);
        req.user = user; // Guarda la información del usuario en la solicitud
  
        // Verificar roles si están definidos
        if (roles.length && !roles.includes(user.rol)) {
          return res.status(403).json({
            message: "No tienes permisos para acceder a este recurso",
          });
        }
  
        next();
      } catch (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({
            message: "Token expirado. Por favor, inicia sesión nuevamente",
          });
        }
        if (error.name === "JsonWebTokenError") {
          return res.status(403).json({
            message: "Token inválido",
          });
        }
        return res.status(500).json({
          message: "Error al procesar el token",
        });
      }
    };
  };
  
  module.exports = { authenticateJWT, accessTokenSecret, refreshTokenSecret };