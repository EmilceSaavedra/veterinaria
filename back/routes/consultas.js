const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const db = require("../base-ORM/sequelize-init");

router.get("/api/consultas", async function (req, res, next) {
  let where = {};
  if (req.query.IdConsulta != undefined && req.query.IdConsulta !== "") {
    where.IdConsulta = {
      [Op.like]: "%" + req.query.IdConsulta + "%",
    };
  }
  let items = await db.consultas.findAndCountAll({
    attributes: [
      "IdConsulta",
      "Fecha",
      "Observacion",
      "Precio",
      "IdMascota",
      "IdCliente",
      "LegajoVeter",
    ],
    order: [["IdConsulta", "ASC"]],
    where,
  });

  res.json(items.rows);
});

router.get("/api/consultas/:id", async function (req, res, next) {
  let data = await db.consultas.findAll({
    attributes: [
      "IdConsulta",
      "Fecha",
      "Observacion",
      "Precio",
      "IdMascota",
      "IdCliente",
      "LegajoVeter",
    ],
    where: { IdConsulta: req.params.id },
  });
  if (data.length > 0) res.status(200).json(data[0]);
  else res.status(404).json({ mensaje: "Consulta no encontrada :(" });
});

router.post("/api/consultas/", async (req, res) => {
  let data = await db.consultas.create({
    Fecha: req.body.Fecha,
    Observacion: req.body.Observacion,
    Precio: req.body.Precio,
    IdMascota: req.body.IdMascota,
    IdCliente: req.body.IdCliente,
    LegajoVeter: req.body.LegajoVeter,
  });
  res.status(200).json(data.dataValues);
});

router.put("/api/consultas/:id", async (req, res) => {
  let item = await db.consultas.findOne({
    attributes: [
      "IdConsulta",
      "Fecha",
      "Observacion",
      "Precio",
      "IdMascota",
      "IdCliente",
      "LegajoVeter",
    ],
    where: { IdConsulta: req.params.id },
  });
  if (!item) {
    res.status(404).json({ message: "Consulta no encontrada :(" });
    return;
  }
  (item.Fecha = req.body.Fecha),
    (item.Observacion = req.body.Observacion),
    (item.Precio = req.body.Precio),
    (item.IdMascota = req.body.IdMascota),
    (item.IdCliente = req.body.IdCliente),
    (item.LegajoVeter = req.body.LegajoVeter),
    await item.save();
  res.sendStatus(200);
});

router.put("/api/veterinarios/:legajo", async (req, res) => {
  let item = await db.veterinarios.findOne({
      attributes: ["Legajo", "Nombre", "Matricula", "FechaRegistro", "Celular",],
      where: { legajo: req.params.legajo },
  });
  if (!item) {
    res.status(404).json({ message: "Veterinario no encontrado!! :(" });
    return;
  }
    (item.legajo = req.body.legajo),
    (item.nombre = req.body.nombre),
    (item.matricula = req.body.matricula),
    (item.fechaRegistro = req.body.fechaRegistro),
    (item.celular = req.body.celular),  
        await item.save();
  res.sendStatus(200);
});

router.delete("/api/consultas/:id", async (req, res) => {
  let filasBorradas = await db.consultas.destroy({
    where: { IdConsulta: req.params.id },
  });
  if (filasBorradas == 1) res.sendStatus(200);
  else res.sendStatus(404);
});

module.exports = router;
