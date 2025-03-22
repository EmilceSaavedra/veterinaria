const express = require("express");
const router = express.Router();
const db = require("../base-ORM/veterinarios.js");
const { ValidationError } = require("sequelize");

// Ruta para obtener todas las especialidades
router.get("/api/especialidades", async (req, res) => {
    try {
      const especialidades = await db.Especialidades.findAll({
        attributes: ["id", "tipo"], // Obtén solo el id y el tipo de cada especialidad
        order: [["tipo", "ASC"]], // Ordena por tipo alfabéticamente
      });
  
      res.json(especialidades);
    } catch (error) {
      console.error("Error al obtener especialidades:", error);
      res.status(500).json({
        message: "Ocurrió un error al obtener las especialidades",
        error: error.message,
      });
    }
  });

  module.exports = router;