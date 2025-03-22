const express = require("express"); 
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const db = require("../base-ORM/tratamientos");

router.get("/api/tratamientos", async function (req, res, next) {
    let data = await db.tratamientos.findAll({
      attributes: [
        "IdTratamiento", 
        "NombreTratamiento", 
        "Descripcion", 
        ],
    });
    res.json(data);
  });
  

router.get("/api/tratamientos/:id", async function (req, res, next) {
    let items = await db.tratamientos.findOne({
      attributes: [
        "IdTratamiento", 
        "NombreTratamiento", 
        "Descripcion", 
        ],
      where: { IdTratamiento: req.params.id },
    });
    res.json(items);
  });

router.post("/api/tratamientos/", async (req, res) => {
    try {
      let data = await db.tratamientos.create({
        IdTratamiento: req.body.IdTratamiento,
        NombreTratamineto: req.body.NombreTratamineto,
        Descripcion: req.body.Descripcion,
       
      });
      res.status(200).json(data.dataValues); 
    } catch (error) {
    
    console.error("Error al crear el tratamiento:", error);
    res.status(500).json({ message: "Error al crear el tratamiento" });
  }
});
  
  router.put("/api/tratamientos/:id", async (req, res) => {
    try {
      let tratamiento = await db.tratamientos.findOne({
        attributes: [
            "IdTratamiento", 
            "NombreTratamiento", 
            "Descripcion", 
            ],
        where: { IdTratamiento: req.params.id },
      });
      if (!tratamiento) {
        res.status(404).json({ message: "Tratamiento no encontrado" });
        return;
      }
      tratamiento.IdTratamiento = req.body.IdTratamiento;
      tratamiento.NombreTratamineto = req.body.NombreTratamineto;
      tratamiento.Descripcion = req.body.Descripcion;
      await tratamiento.save();
      res.sendStatus(204);
    } catch (error) {
        console.error("Error al actualizar el tratamiento:", error);
        res.status(500).json({ message: "Error al actualizar el tratamiento" });
    }
});
  
  router.delete("/api/tratamientos/:id", async (req, res) => {
    try {
        let filasBorradas = await db.tratamientos.destroy({
            where: { IdTratamiento: req.params.id },
        });
        if (filasBorradas == 1) res.status(200).json({ message: "Tratamiento eliminado" });
        else res.status(404).json({ message: "Tratamiento no encontrado" });
    } catch (error) {
        console.error("Error al eliminar el tratamiento:", error);
        res.status(500).json({ message: "Error al eliminar el tratamiento" });
    }
});
  

module.exports = router;