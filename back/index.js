const express = require("express");
const cors = require('cors');
// crear servidor
const app = express();
app.use(express.json());
require("./base-ORM/sqlite-init");  // crear base si no existe
app.use(cors());

// controlar ruta
app.get("/", (req, res) => {
  res.send("Backend Hecho por Emi :D!");
});

const veterinarioRouter = require("./routes/veterinario");
app.use(veterinarioRouter);

const clientesRouter = require("./routes/clientes");
app.use(clientesRouter);

const consultasRouter = require("./routes/consultas");
app.use(consultasRouter);

const mascotasRouter = require("./routes/mascotas");
app.use(mascotasRouter);

// const seguridadRouter = require("./routes/seguridad");
// app.use(seguridadRouter);

app.get("/", (req, res) => {
  res.send("API Veterinaria 2024");
});



if (!module.parent) {
  const PORT = 3500;
  app.listen(PORT, () => {
    console.log(`server listening on port: ${PORT}`);
  });
}
module.exports = app;
