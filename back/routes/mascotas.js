const express = require("express");
const router = express.Router();
const { Op } = require("sequelize");
const { mascotas } = require("../base-ORM/mascotas");
const { clientes } = require("../base-ORM/clientes");
const { tipoMascotas } = require("../base-ORM/tipoMascotas")

router.get("/api/mascotas", async (req, res) => {
    let where = {};
    if (req.query.NombreMascota !== undefined && req.query.NombreMascota !== "") {
        where.NombreMascota = {
            [Op.like]: "%" + req.query.NombreMascota + "%",
        };
    }

    try {
        const mascota = await mascotas.findAll({
        where: where,
        include: [{
            model: clientes,
            attributes: ['apellido', 'nombre', 'fechaNacimiento', 'direccion']
        },
        {
            model: tipoMascotas,
            attributes: ['Nombre', 'Descripcion', 'TamañoPromedio', 'VidaPromedio', 'NecesitaLicencia']
        }
        ],
        attributes:{exclude: ['IdTipoMascota', 'IdCliente', 'IdMascota']}
        });
        res.json(mascota);
    } catch (error) {
        console.error("Error al obtener las mascotas:", error);
        res.status(500).json({ error: 'Error al obtener las mascotas' });
    }
});

router.get("/api/mascotas/:id", async (req, res) => {
    try {
        let mascota = await mascotas.findOne({
            include: [{
                model: clientes,
                attributes: ['id', 'apellido', 'nombre', 'fechaNacimiento', 'direccion']
            },
            {
                model: tipoMascotas,
                attributes: ['IdTipoMascota', 'Nombre', 'Descripcion', 'TamañoPromedio', 'VidaPromedio', 'NecesitaLicencia']
            }
            ],
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
        let data = await mascotas.create({
            IdMascota: req.body.IdMascota,
            IdTipoMascota: req.body.IdTipoMascota,
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
        let mascota = await mascotas.findOne({
            attributes: ["IdMascota", "IdTipoMascota", "IdCliente", "NombreMascota", "FechaNacMascota"],
            where: { IdMascota: req.params.id },
        });
        if (!mascota) {
            res.status(404).json({ message: "Mascota no encontrada" });
            return;
        }
        mascota.IdTipoMascota = req.body.IdTipoMascota;
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
        let filasBorradas = await mascotas.destroy({
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
