const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const db = require("../base-ORM/sequelize-init");

router.get("/api/veterinarios", async function (req, res, next) {
  let where = {};
  if (req.query.legajo != undefined && req.query.legajo !== "") {
    where.legajo = {
      [Op.like]: "%" + req.query.legajo + "%",
    };
  }
  let items = await db.veterinarios.findAndCountAll({
    attributes: [
        "legajo",
        "nombre",
        "matricula",
        "fechaRegistro",
        "celular",
        "activo",
    ],
    order: [["legajo", "ASC"]],
    where,
  });

  res.json(items.rows);
});




// buscar por nombre con metodo search
router.get("/api/veterinarios/search", async (req, res) => {
  try {
    const { nombre } = req.query;

    // Verificar si el parámetro 'nombre' está presente
    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({
        message: "El parámetro 'nombre' es requerido para realizar la búsqueda",
      });
    }

    // Realizar la búsqueda en la base de datos
    const items = await db.veterinarios.findAndCountAll({
      attributes: [
        "legajo",
        "nombre",
        "matricula",
        "fechaRegistro",
        "celular",
        "activo",

      ],
      where: {
        nombre: {
          [Op.like]: "%" + nombre + "%", // Busqueda parcial por nombre
        },
      },
    });

    // Verificar si se encontraron resultados
    if (items.count === 0) {
      return res.status(404).json({
        message: "No se encontraron veterinarios con ese nombre.",
      });
    }

    // Enviar los resultados
    res.json({
      count: items.count, // Número total de resultados
      veterinarios: items.rows, // Veterinarios encontrados
    });
  } catch (error) {
    // Manejar cualquier error inesperado
    console.error("Error al buscar veterinarios:", error);
    res.status(500).json({
      message: "Ocurrió un error al realizar la búsqueda",
      error: error.message,
    });
  }
});


// crear veterinario
router.post("/api/veterinarios/", async (req, res) => {
  try {
    let data = await db.veterinarios.create({
      legajo: req.body.legajo,
      nombre: req.body.nombre,
      matricula: req.body.matricula,
      fechaRegistro: req.body.fechaRegistro,
      celular: req.body.celular,   
      activo: req.body.activo,   
    });
    
    res.status(200).json(data.dataValues); // Devolver los valores creados con éxito
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear el veterinario:", error);
    res.status(500).json({ message: "Error al crear el veterinario" });
  }
});
  
  // modificar veterinario
// modificar veterinario
router.put("/api/veterinarios/:legajo", async (req, res) => {
  try {
    let item = await db.veterinarios.findOne({
      attributes: ["legajo", "nombre", "matricula", "fechaRegistro", "celular", "activo"],
      where: { legajo: req.params.legajo },
    });

    if (!item) {
      res.status(404).json({ message: "Veterinario no encontrado!! :(" });
      return;
    }

    item.legajo = req.body.legajo;
    item.nombre = req.body.nombre;
    item.matricula = req.body.matricula;
    item.fechaRegistro = req.body.fechaRegistro;
    item.celular = req.body.celular;
    item.activo = req.body.activo;

    await item.save();
    res.sendStatus(204);
  } catch (err) {
    if (err instanceof ValidationError) {
      let message = '';
      err.errors.forEach((x) => { message += x.path + ': ' + x.message + '\n'; });
      res.status(400).json({ message: message });
    } else {
      // Manejo de otros errores (opcional)
      res.status(500).json({ message: "Error en el servidor." });
    }
  }
});



// borrar veterinario
  
router.delete("/api/veterinarios/:legajo", async (req, res) => {
    let bajaFisica = false;
    if(bajaFisica){
      let filasBorradas = await db.veterinarios.destroy({
        where: { legajo: req.params.legajo },
      });
      if (filasBorradas == 1) res.sendStatus(200);
      else res.sendStatus(404);
    } else {
      //baja logica
      try {
        let data = await db.sequelize.query(
          "UPDATE veterinarios SET activo = case when activo = 1 then 0 else 1 end WHERE legajo = :legajo",
          {
            replacements: { legajo: req.params.legajo },
          }
        );
        res.sendStatus(200);
      } catch (error) {
        if(error instanceof ValidationError){
          const message = error.errors.map((x) => x.message);
          res.status(400).json({ message: message });
        } else {
          throw error;
        }
      }   

    }

});
  
module.exports = router;