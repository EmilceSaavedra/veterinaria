require('dotenv').config({ path: './back/.env' });

const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser'); // Importar cookie-parser

// Crear servidor
const app = express();

// Configurar middlewares
app.use(cors({
    origin: 'http://localhost:3000', // El origen del frontend
    credentials: true // Permitir cookies
}));
app.use(express.json()); // Parsear JSON del cuerpo de la solicitud
app.use(cookieParser()); // Procesar cookies

require("./base-ORM/sqlite-init"); // Crear base si no existe

// Rutas
const veterinarioRouter = require("./routes/veterinario");
const especialidadesRouter = require("./routes/especialidades");
const clientesRouter = require("./routes/clientes");
const consultasRouter = require("./routes/consultas");
const mascotasRouter = require("./routes/mascotas");
const tipoMascotasRouter = require("./routes/tipoMascota");
const seguridadRouter = require("./routes/seguridad");
const turnosRouter = require("./routes/turnos");
const tratamientosRouter = require("./routes/tratamientos");

// Uso de rutas
app.use(veterinarioRouter);
app.use(especialidadesRouter);
app.use(clientesRouter);
app.use(consultasRouter);
app.use(mascotasRouter);
app.use(tipoMascotasRouter);
app.use(seguridadRouter); // Rutas de seguridad (ejemplo: login)
app.use(turnosRouter);
app.use(tratamientosRouter);

// Ruta raíz
app.get("/", (req, res) => {
  res.send("API Veterinaria 2024");
});

// Servidor
if (!module.parent) {
  const PORT = process.env.PORT || 3500;
  app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
  });
}

module.exports = app;
