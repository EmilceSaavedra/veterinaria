const express = require("express");
const router = express.Router();
const { tipoMascotas } = require("../base-ORM/tipoMascotas");

router.get("/api/tipoMascotas", async (req, res) => {
  try {
    const tiposMascotas = await tipoMascotas.findAll();
    return res.json(tiposMascotas);
  } catch (error) {
    console.error("Error al obtener tipos de mascotas:", error);
    res.status(500).json({ message: "Error al obtener tipos de mascotas" });
  }
});

router.get("/api/tipoMascotas/:id", async (req, res) => {
  try {
    let tipoMascota = await tipoMascotas.findOne({
      where: { IdTipoMascota: req.params.id },
    });
    if (tipoMascota) {
      res.json(tipoMascota);
    } else {
      res.status(404).json({ message: "Tipo de Mascota no encontrada" });
    }
  } catch (error) {
    console.error("Error al obtener el Tipo de Mascota:", error);
    res.status(500).json({ message: "Error al obtener el Tipo de Mascota" });
  }
});

router.post("/api/tipoMascotas", async (req, res) => {
  try {
    let data = await tipoMascotas.create({
      Nombre: req.body.Nombre,
      Descripcion: req.body.Descripcion,
      TamañoPromedio: req.body.TamañoPromedio,
      VidaPromedio: req.body.VidaPromedio,
      NecesitaLicencia: req.body.NecesitaLicencia,
    });
    res.status(201).json(data.dataValues);
  } catch (error) {
    console.error("Error al crear el Tipo de mascota:", error);
    res.status(500).json({ message: "Error al crear el Tipo de mascota" });
  }
});

router.put("/api/tipoMascotas/:id", async (req, res) => {
  try {
    let tipoMascota = await tipoMascotas.findOne({
      where: { IdTipoMascota: req.params.id },
    });
    if (!tipoMascota) {
      res.status(404).json({ message: "Tipo de Mascota no encontrada" });
      return;
    }
    
    // Actualizar las propiedades
    tipoMascota.Nombre = req.body.Nombre;
    tipoMascota.Descripcion = req.body.Descripcion;
    tipoMascota.TamañoPromedio = req.body.TamañoPromedio;
    tipoMascota.VidaPromedio = req.body.VidaPromedio;
    tipoMascota.NecesitaLicencia = req.body.NecesitaLicencia;

    await tipoMascota.save();
    res.status(200).json(tipoMascota); // Devolver el objeto actualizado
  } catch (error) {
    console.error("Error al actualizar el tipo de mascota:", error);
    res.status(500).json({ message: "Error al actualizar el tipo de mascota" });
  }
});

router.delete("/api/tipoMascotas/:id", async (req, res) => {
  try {
    let filasBorradas = await tipoMascotas.destroy({
      where: { IdTipoMascota: req.params.id },
    });
    if (filasBorradas === 1) {
      res.status(200).json({ message: "Tipo de Mascota eliminada" });
    } else {
      res.status(404).json({ message: "Tipo de Mascota no encontrada" });
    }
  } catch (error) {
    console.error("Error al eliminar el Tipo de mascota:", error);
    res.status(500).json({ message: "Error al eliminar el Tipo de mascota" });
  }
});

module.exports = router;

