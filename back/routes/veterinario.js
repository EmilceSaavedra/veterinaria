const express = require("express");
const router = express.Router();
const { Op, ValidationError } = require("sequelize");
const db = require("../base-ORM/veterinarios.js");


// Mostrar todos los veterinarios ---------------------------------------------------
router.get("/api/veterinarios", async function (req, res, next) {
  let where = {};
  
  if (req.query.legajo != undefined && req.query.legajo !== "") {
    where.legajo = {
      [Op.like]: "%" + req.query.legajo + "%",
    };
  }

  try {
    let items = await db.Veterinarios.findAndCountAll({
      attributes: [
        "legajo",
        "nombre",
        "matricula",
        "fechaRegistro",
        "celular",
        "activo"
      ],
      order: [["legajo", "ASC"]],
      where,
      include: [
        {
          model: db.Especialidades,
          attributes: ["tipo"], // Incluye solo el atributo 'tipo' de la tabla Especialidades
        }
      ]
    });

    // Formatear el resultado para mostrar `tipo` de especialidad
    const veterinarios = items.rows.map(veterinario => ({
      legajo: veterinario.legajo,
      nombre: veterinario.nombre,
      matricula: veterinario.matricula,
      fechaRegistro: veterinario.fechaRegistro,
      celular: veterinario.celular,
      activo: veterinario.activo,
      especialidad: veterinario.Especialidade ? veterinario.Especialidade.tipo : null,
    }));

    res.json(veterinarios);
  } catch (error) {
    console.error("Error al obtener los veterinarios:", error);
    res.status(500).json({ message: "Ocurrió un error al obtener los veterinarios" });
  }
});


// Buscar veterinario con el método search ---------------------------------------------------
// Buscar veterinario con el método search ---------------------------------------------------
router.get("/api/veterinarios/search", async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre || nombre.trim() === "") {
      return res.status(400).json({
        message: "El parámetro 'nombre' es requerido para realizar la búsqueda",
      });
    }

    const items = await db.Veterinarios.findAndCountAll({
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
          [Op.like]: `%${nombre.toLowerCase()}%`,
        },
      },
      include: [
        {
          model: db.Especialidades,
          attributes: ["tipo"], 
        }
      ],
      order: [["legajo", "ASC"]],
    });

    // Enviar respuesta con lista vacía si no hay coincidencias
    const veterinarios = items.rows.map(veterinario => ({
      legajo: veterinario.legajo,
      nombre: veterinario.nombre,
      matricula: veterinario.matricula,
      fechaRegistro: veterinario.fechaRegistro,
      celular: veterinario.celular,
      activo: veterinario.activo,
      especialidad: veterinario.Especialidade ? veterinario.Especialidade.tipo : null,
    }));

    res.status(200).json({
      count: items.count,
      veterinarios: veterinarios, // Será un array vacío si no hay resultados
    });

  } catch (error) {
    console.error("Error al buscar veterinarios:", error);
    res.status(500).json({
      message: "Ocurrió un error al realizar la búsqueda",
      error: error.message,
    });
  }
});


// Crear veterinario -------------------------------------------------------------------
router.post("/api/veterinarios", async (req, res) => {
  const activo = req.body.activo !== undefined ? req.body.activo : true;
  const { legajo, nombre, matricula, fechaRegistro, celular, idEspecialidad } = req.body;

  if (!legajo || !nombre || !matricula || !celular || idEspecialidad === undefined) {
      return res.status(400).json({
          message: "Faltan datos obligatorios para crear un veterinario",
      });
  }

  const fechaFinalRegistro = fechaRegistro || new Date().toISOString().split('T')[0];

  try {
      const veterinarioExistente = await db.Veterinarios.findOne({
          where: { [Op.or]: [{ legajo }, { matricula }] }
      });

      if (veterinarioExistente) {
          return res.status(400).json({
              message: "Ya existe un veterinario con este legajo o matrícula",
          });
      }

      const especialidadExiste = await db.Especialidades.findByPk(idEspecialidad);
      if (!especialidadExiste) {
          return res.status(400).json({
              message: "La especialidad seleccionada no existe",
          });
      }

      const nuevoVeterinario = await db.Veterinarios.create({
          legajo,
          nombre,
          matricula,
          fechaRegistro: fechaFinalRegistro,
          celular,
          activo,
          idEspecialidad,
      });

      res.status(201).json({ message: `El veterinario con legajo ${legajo} fue creado con éxito.` });
  } catch (error) {
      console.error("Error al crear veterinario:", error);
      res.status(500).json({
          message: "Ocurrió un error al crear el veterinario",
          error: error.message,
      });
  }
});

// Borrar veterinario ---------------------------------------------------------------
router.delete("/api/veterinarios/:legajo", async (req, res) => {
  let bajaFisica = false;
  if (bajaFisica) {
    let filasBorradas = await db.Veterinarios.destroy({
      where: { legajo: req.params.legajo },
    });
    if (filasBorradas === 1) res.sendStatus(200);
    else res.sendStatus(404);
  } else {
    // Baja lógica
    try {
      await db.sequelize.query(
        "UPDATE veterinarios SET activo = CASE WHEN activo = 1 THEN 0 ELSE 1 END WHERE legajo = :legajo",
        {
          replacements: { legajo: req.params.legajo },
        }
      );
      res.sendStatus(200);
    } catch (error) {
      console.error("Error al realizar baja lógica:", error);
      if (error instanceof ValidationError) {
        const message = error.errors.map((x) => x.message);
        res.status(400).json({ message });
      } else {
        res.status(500).json({ message: "Error en el servidor." });
      }
    }
  }
});

// Modificar veterinario ---------------------------------------------------------------
router.put("/api/veterinarios/:legajo", async (req, res) => {
  const { legajo } = req.params;
  const { nombre, matricula, fechaRegistro, celular, idEspecialidad } = req.body;

  // Validación de datos obligatorios
  if (!nombre || !fechaRegistro || !matricula || !celular || idEspecialidad === undefined) {
      return res.status(400).json({
          message: "Faltan datos obligatorios para modificar un veterinario",
      });
  }

  // Validar tipos de datos
  if (
      typeof nombre !== "string" ||
      typeof matricula !== "string" ||
      typeof celular !== "number" ||
      typeof idEspecialidad !== "number"
  ) {
      return res.status(400).json({
          message: "Datos inválidos en el formato",
      });
  }

  // Validar formato de la fecha
  if (fechaRegistro && new Date(fechaRegistro) > new Date()) {
      return res.status(400).json({
          message: "La fecha de registro no puede ser mayor a la fecha actual",
      });
  }

  try {
      // Verificar que la especialidad existe
      const especialidadExiste = await db.Especialidades.findByPk(idEspecialidad);
      if (!especialidadExiste) {
          return res.status(400).json({
              message: "La especialidad seleccionada no existe",
          });
      }

      // Crear objeto dinámico con datos a actualizar (excluyendo el legajo)
      const datosActualizados = { nombre, matricula, fechaRegistro, celular, idEspecialidad };

      // Actualizar el veterinario
      const resultado = await db.Veterinarios.update(datosActualizados, { where: { legajo } });

      if (resultado[0] === 0) {
          return res.status(404).json({
              message: "No se encontró un veterinario con ese legajo",
          });
      }

      res.status(200).json({
          message: `El veterinario con legajo ${legajo} fue modificado con éxito.`,
      });
  } catch (error) {
      console.error("Error al modificar veterinario:", error);
      res.status(500).json({
          message: "Ocurrió un error al modificar el veterinario",
          error: error.message,
      });
  }
});


module.exports = router;

