const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const db = require("../base-ORM/sequelize-init");

router.get("/api/mascotas", async (req, res) => {
    let where = {};
    if (req.query.NombreMascota != undefined && req.query.NombreMascota !== "") {
        where.NombreMascota = {
            [Op.like]: "%" + req.query.NombreMascota + "%",
        };
    }

    try {
        let data = await db.mascotas.findAll({
            attributes: ["IdMascota", "TipoMascota", "IdCliente", "NombreMascota", "FechaNacMascota"],
            where,
        });
        res.json(data);
    } catch (error) {
        console.error("Error al obtener mascotas:", error);
        res.status(500).json({ message: "Error al obtener mascotas" });
    }
});

router.get("/api/mascotas/:id", async (req, res) => {
    try {
        let mascota = await db.mascotas.findOne({
            attributes: ["IdMascota", "TipoMascota", "IdCliente", "NombreMascota", "FechaNacMascota"],
            where: { IdMascota: req.params.id },
        });
        if (mascota) {
            res.json(mascota);
        } else {
            res.status(404).json({ message: "Mascota no encontrada" });
        }
    } catch (error) {
        console.error("Error al obtener la mascota:", error);
        res.status(500).json({ message: "Error al obtener la mascota" });
    }
});

router.post("/api/mascotas", async (req, res) => {
    try {
        let data = await db.mascotas.create({
            IdMascota: req.body.IdMascota,
            TipoMascota: req.body.TipoMascota,
            IdCliente: req.body.IdCliente,
            NombreMascota: req.body.NombreMascota,
            FechaNacMascota: req.body.FechaNacMascota,
        });
        res.status(200).json(data.dataValues);
    } catch (error) {
        console.error("Error al crear la mascota:", error);
        res.status(500).json({ message: "Error al crear la mascota" });
    }
});

router.put("/api/mascotas/:id", async (req, res) => {
    try {
        let mascota = await db.mascotas.findOne({
            attributes: ["IdMascota", "TipoMascota", "IdCliente", "NombreMascota", "FechaNacMascota"],
            where: { IdMascota: req.params.id },
        });
        if (!mascota) {
            res.status(404).json({ message: "Mascota no encontrada" });
            return;
        }
        mascota.TipoMascota = req.body.TipoMascota;
        mascota.IdCliente = req.body.IdCliente;
        mascota.NombreMascota = req.body.NombreMascota;
        mascota.FechaNacMascota = req.body.FechaNacMascota;

        await mascota.save();
        res.sendStatus(200);
    } catch (error) {
        console.error("Error al actualizar la mascota:", error);
        res.status(500).json({ message: "Error al actualizar la mascota" });
    }
});

router.delete("/api/mascotas/:id", async (req, res) => {
    try {
        let filasBorradas = await db.mascotas.destroy({
            where: { IdMascota: req.params.id },
        });
        if (filasBorradas == 1) res.status(200).json({ message: "Mascota eliminada" });
        else res.status(404).json({ message: "Mascota no encontrada" });
    } catch (error) {
        console.error("Error al eliminar la mascota:", error);
        res.status(500).json({ message: "Error al eliminar la mascota" });
    }
});

module.exports = router;
