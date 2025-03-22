const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const db = require("../base-ORM/turnos");

router.get("/api/turnos", async function (req, res, next) {
    let data = await db.turnos.findAll({
      attributes: ["IdTurno", "Nombre", "Apellido", "Fecha", "Hora"],
    });
    res.json(data);
  });
  

router.get("/api/turnos/:id", async function (req, res, next) {
    let items = await db.turnos.findOne({
      attributes: [
        "IdTurno",
        "Nombre",
        "Apellido",
        "Fecha",
        "Hora",
      ],
      where: { IdTurno: req.params.id },
    });
    res.json(items);
  });

router.post("/api/turnos/", async (req, res) => {
    try {
      let data = await db.turnos.create({
        Nombre: req.body.Nombre,
        Apellido: req.body.Apellido,
        Fecha: req.body.Fecha,
        Hora: req.body.Hora,
      });
      res.status(200).json(data.dataValues); // devolvemos el registro agregado!
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        let messages = '';
        err.errors.forEach((x) => messages += (x.path ?? 'campo') + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  });
  
  router.put("/api/turnos/:id", async (req, res) => {
    try {
      let turno = await db.turnos.findOne({
        attributes: [
          "IdTurno",
          "Nombre",
          "Apellido",
          "Fecha",
          "Hora",
        ],
        where: { IdTurno: req.params.id },
      });
      if (!turno) {
        res.status(404).json({ message: "Artículo no encontrado" });
        return;
      }
      turno.Nombre = req.body.Nombre;
      turno.Apellido = req.body.Precio;
      turno.Fecha = req.body.CodigoDeBarra;
      turno.Hora = req.body.IdArticuloFamilia;
      await item.save();
      res.sendStatus(204);
    } catch (err) {
      if (err instanceof ValidationError) {
        // si son errores de validación, los devolvemos
        let messages = '';
        err.errors.forEach((x) => messages += x.path + ": " + x.message + '\n');
        res.status(400).json({message : messages});
      } else {
        // si son errores desconocidos, los dejamos que los controle el middleware de errores
        throw err;
      }
    }
  });
  
router.delete("/api/turnos/:id", async (req, res) => {
    let bajaFisica = false;
  
    if (bajaFisica) {
      // baja fisica
      let filasBorradas = await db.turnos.destroy({
        where: { IdTurno: req.params.id },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      // baja lógica
      try {
        let data = await db.sequelize.query(
          "UPDATE turnos SET Activo = case when Activo = 1 then 0 else 1 end WHERE IdTurno = :IdTurno",
          {
            replacements: { IdTurno: +req.params.id },
          }
        );
        res.sendStatus(200);
      } catch (err) {
        if (err instanceof ValidationError) {
          // si son errores de validación, los devolvemos
          const messages = err.errors.map((x) => x.message);
          res.status(400).json(messages);
        } else {
          // si son errores desconocidos, los dejamos que los controle el middleware de errores
          throw err;
        }
      }
    }
  });  
  

module.exports = router;