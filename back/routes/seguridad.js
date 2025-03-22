const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../base-ORM/seguridaduser");
require("dotenv").config(); // Cargar variables de entorno

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;

let refreshTokens = []; // Almacena los tokens de refresco


// Registro de usuario
router.post("/api/register", async (req, res) => {
  const { username, password, rol } = req.body;

  try {
    // Validar campos
    if (!username || !password || !rol) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    if (!["admin", "miembro"].includes(rol)) {
      return res.status(400).json({ message: "Rol debe ser 'admin' o 'miembro'" });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS, 10) || 10);

    // Crear usuario
    const newUser = await User.create({
      username,
      password: hashedPassword,
      rol,
    });

    res.status(201).json({
      message: "Usuario registrado correctamente",
      userId: newUser.id,
    });
  } catch (error) {
    console.error("Error detallado:", error);

    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({
        message: "Error de validación",
        errors: error.errors.map((e) => e.message),
      });
    }

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
});

//------------------------- Login de usuario ---------------------------------
router.post("/api/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // Validar usuario y contraseña
    if (!username || !password) {
      return res.status(400).json({ message: "Usuario y contraseña son requeridos" });
    }

    // Buscar usuario en la base de datos
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Validar contraseña con bcrypt
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Verificar secretos de token
    if (!accessTokenSecret || !refreshTokenSecret) {
      console.error("Token secrets no configurados");
      return res.status(500).json({ message: "Error de configuración del servidor" });
    }

    // Generar tokens
    const accessToken = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      accessTokenSecret,
      { expiresIn: "10m" }
    );

    const refreshToken = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      refreshTokenSecret
    );
     // Guardar el refreshToken en el array
     refreshTokens.push(refreshToken);


    // Guardar token de acceso y refresco en cookies
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // No accesible mediante JavaScript
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      sameSite: "Lax", // Previene CSRF
      maxAge: 10 * 60 * 1000, // 10 minutos
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true, // No accesible mediante JavaScript
      secure: process.env.NODE_ENV === "production", // Solo HTTPS en producción
      sameSite: "Lax", // Previene CSRF
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    // Responder con el rol y mensaje de bienvenida
    res.json({
      user: {
        id: user.id,
        username: user.username,
        rol: user.rol
      }
    });




  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({
      message: "Error interno del servidor",
      error: error.message,
    });
  }
});

// Logout de usuario
// Logout de usuario
router.post("/api/logout", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: "No se proporcionó token" });
  }

  // Verificar si el token de refresco es válido
  if (!refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Token de refresco inválido" });
  }

  // Eliminar el refresh token de la lista
  const index = refreshTokens.indexOf(refreshToken);
  if (index > -1) {
    refreshTokens.splice(index, 1); // Elimina el refreshToken de la lista de tokens válidos
  }

  // Eliminar las cookies
  res.clearCookie("accessToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Lax" });
  res.clearCookie("refreshToken", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "Lax" });

  return res.status(200).json({ message: "Cierre de sesión exitoso" });
});

// Endpoint para refrescar el token de acceso---------------------------------------------------
// Endpoint para refrescar el token de acceso
router.post("/api/token", (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  // Verificar si el refresh token está presente y es válido
  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Token de refresco inválido o expirado" });
  }

  try {
    // Verificar y decodificar el refresh token
    const user = jwt.verify(refreshToken, refreshTokenSecret);

    // Generar un nuevo access token
    const accessToken = jwt.sign(
      { id: user.id, username: user.username, rol: user.rol },
      accessTokenSecret,
      { expiresIn: "10m" }
    );

    // Responder con el nuevo access token
    res.json({
      accessToken, // Devolver el nuevo access token
      user: {
        id: user.id,
        username: user.username,
        rol: user.rol,
      },
    });
  } catch (error) {
    console.error("Error al verificar el token:", error);
    return res.status(403).json({ message: "Token de refresco inválido o expirado" });
  }
});

module.exports = router;
