const db = require("aa-sqlite");

async function CrearBDSiNoExiste() {
  await db.open("./.data/veterinaria.db");





  let existe = false;
  let res = null;

  // Crear tabla consultas
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'consultas'",
    []
  );

  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      `CREATE table consultas (
        IdConsulta INTEGER PRIMARY KEY AUTOINCREMENT, 
        Fecha TEXT NOT NULL,
        Observacion TEXT NOT NULL, 
        Precio REAL NOT NULL, 
        IdCliente INTEGER NOT NULL, 
        LegajoVeter INTEGER NOT NULL,
        IdTratamiento INTEGER NOT NULL,
        FOREIGN KEY (IdCliente) REFERENCES clientes(IdCliente),
        FOREIGN KEY (LegajoVeter) REFERENCES veterinarios(legajo),
        FOREIGN KEY (IdTratamiento) REFERENCES tratamientos(IdTratamiento));`
    );
    console.log("Tabla Consultas creada!");
    await db.run(
      `INSERT INTO consultas (Fecha, observacion, IdTratamiento, Precio, IdCliente, LegajoVeter) VALUES 
        ('2024-05-25','Nose' , 5, 2500, 3, 11050),
        ('2024-05-25','Nose' , 6, 7000, 2, 11314),
        ('2024-05-25','Nose' , 8, 2500, 5,11314),
        ('2024-05-26','Nose' , 10, 2500, 4, 19899),
        ('2024-05-26','Nose' , 1, 67000, 9, 11314),
        ('2024-05-26','Nose' , 4, 12000, 7, 14207),
        ('2024-05-26','Nose' , 7, 3000, 1, 11314),
        ('2024-05-27','Nose' , 9, 2500, 6, 11358),
        ('2024-05-27','Nose' , 2, 12000, 10, 19899),
        ('2024-05-27','Nose' , 3, 17000, 8, 14207)`
    );
  }
  {
    // Crear tabla Especialidades y veterinarios
   

    let existe = false;
    let res = null;
    
    // Verificar si la tabla 'Especialidades' existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'Especialidades'",
      []
    );
    if (res.contar === 0) {
      await db.run(
        "CREATE TABLE Especialidades(id INTEGER PRIMARY KEY, tipo TEXT NOT NULL);"
      );
      console.log("Tabla Especialidades creada!");
    
      // Insertar diferentes tipos de especialidades veterinarias
      await db.run(
        `INSERT INTO Especialidades (id, tipo) VALUES 
        (1, 'Cirugía de Animales'),
        (2, 'Veterinaria canina'),
        (3, 'Veterinaria especializada en especies'),
        (4, 'Oftalmología Veterinaria'),
        (5, 'Neurología Veterinaria'),
        (6, 'Veterinaria zoológica')`
      );
    }
    
    // Reiniciar variables para la siguiente verificación
    existe = false;
    res = null;
    
    // Verificar si la tabla 'veterinarios' existe
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'veterinarios'",
      []
    );
    if (res.contar === 0) {
      await db.run(
        `CREATE TABLE veterinarios(
          legajo INTEGER NOT NULL PRIMARY KEY, 
          nombre TEXT NOT NULL, 
          matricula TEXT NOT NULL, 
          fechaRegistro TEXT NOT NULL, 
          celular INTEGER NULL, 
          activo BOOLEAN,
          idEspecialidad INTEGER,
          FOREIGN KEY (idEspecialidad) REFERENCES Especialidades(id)
        );`
      );
      console.log("Tabla veterinarios creada!");
    
      // Insertar registros con especialidades correspondientes
      await db.run(
        `INSERT INTO veterinarios VALUES 
        (12456, 'Julian Rodriguez', 'M1050', '2009-07-25', 351111226, 1, 2), 
        (14567, 'Mateo Videla', 'M5551', '2015-11-12', 3514666235, 1, 4), 
        (18901, 'Rodrigo DePaul', 'M8400', '2019-03-06', 351654895, 1, 3), 
        (14589, 'Leandro Paredes', 'M9899', '2024-09-30', 387622695, 1, 5),
        (12890, 'Juan Pintos', 'M1314', '2021-09-24', 325156984, 1, 2),
        (12541, 'Angel Videla', 'M1225', '2022-07-21', 351256330, 1, 1),
        (12682, 'Sebastian Aviles', 'M6677', '2020-03-25', 351789011, 1, 6),
        (12203, 'Fernanda Garcia', 'M1358', '2012-04-12', 351254101, 1, 3),
        (12814, 'Soledad Pastorutti', 'M5596', '2018-06-08', 351659840, 1, 2),
        (12395, 'Tomas Pintos', 'M4207', '2015-08-01', 351256987, 1, 4)`
      );
    }
    


    //Crear Tabla para mascotas
    res = await db.get(
      "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name = 'mascotas'",
      []
    );
    if (res.contar > 0) existe = true;
    if (!existe) {
      await db.run(
        `CREATE TABLE mascotas (
        IdMascota INTEGER PRIMARY KEY AUTOINCREMENT,
        IdTipoMascota INTEGER NOT NULL,
        IdCliente INTEGER NOT NULL,
        NombreMascota TEXT NOT NULL,
        FechaNacMascota DATE,
        FOREIGN KEY(IdTipoMascota) REFERENCES tipoMascotas(IdTipoMascota),
        FOREIGN KEY(IdCliente) REFERENCES clientes(id));`
      );
      
      console.log("Tabla mascotas creada!");
      await db.run(
        `INSERT INTO mascotas (IdMascota, IdTipoMascota, IdCliente, NombreMascota, FechaNacMascota) VALUES 
        (1, 1, 3, 'Luna', '2018-03-25'),
        (2, 2, 5, 'Rocco', '2019-11-12'),
        (3, 4, 7, 'Mia', '2017-03-06'),
        (4, 5, 4, 'Lola', '2018-09-30'),
        (5, 3, 9, 'Toby', '2021-09-24'),
        (6, 6, 2, 'Beto', '2022-07-21'),
        (7, 1, 6, 'Toby', '2020-03-25'),
        (8, 9, 10, 'Luna', '2012-04-12'),
        (9, 3, 8, 'Mia', '2018-06-08'),
        (10, 2, 1, 'Rocco', '2015-08-01')`
      );
    }

    // Crear tabla tipoMascotas
    try {
      const res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'tipoMascotas'"
      );

      if (res.contar === 0) {
        await db.run(
          `CREATE TABLE tipoMascotas (
        IdTipoMascota INTEGER PRIMARY KEY AUTOINCREMENT,
        Nombre TEXT NOT NULL,
        Descripcion TEXT,
        TamañoPromedio TEXT,
        VidaPromedio INTEGER,
        NecesitaLicencia BOOLEAN DEFAULT 0
      )`
        );
        console.log("Tabla tipoMascotas creada!");

        await db.run(
          `INSERT INTO tipoMascotas (Nombre, Descripcion, TamañoPromedio, VidaPromedio, NecesitaLicencia) VALUES 
        ('Perro', 'Animal de compañía leal y juguetón.', 'Mediano', 10, 0),
        ('Gato', 'Mascota independiente y curiosa.', 'Pequeño', 15, 0),
        ('Pez', 'Animal acuático de diversos colores.', 'Pequeño', 5, 0),
        ('Loro', 'Ave colorida que puede imitar sonidos.', 'Mediano', 50, 1),
        ('Caballo', 'Animal de carga y transporte.', 'Grande', 25, 0),
        ('Conejo', 'Mascota pequeña y cariñosa.', 'Pequeño', 8, 0),
        ('Raton', 'Pequeño roedor que puede ser mascota.', 'Pequeño', 2, 0),
        ('Lagartija', 'Reptil pequeño y ágil.', 'Pequeño', 5, 0),
        ('Mono', 'Animal inteligente y juguetón.', 'Mediano', 25, 1),
        ('Tigre', 'Gran felino carnívoro, no es mascota.', 'Grande', 15, 1)`
        );
        console.log("Registros iniciales insertados!");
      } else {
        console.log("La tabla tipoMascotas ya existe.");
      }
    } catch (error) {
      console.error("Error al crear la tabla o insertar registros:", error);
    }

    // Crear tabla clientes
    try {
      const res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'clientes'"
      );

      if (res.contar === 0) {
        await db.run(
          `CREATE TABLE clientes(
        Id INTEGER PRIMARY KEY AUTOINCREMENT, 
        apellido TEXT NOT NULL, 
        nombre TEXT NOT NULL, 
        fechaNacimiento DATE NOT NULL, 
        direccion TEXT)`
        );
        console.log("Tabla clientes creada!");

        await db.run(
          `INSERT INTO clientes (apellido, nombre, fechaNacimiento, direccion) VALUES 
        ('Gomez', 'Ana', '1990-05-25', 'Av. Siempre Viva 123'),
        ('Perez', 'Juan', '1985-11-12', 'Calle Falsa 123'),
        ('Rodriguez', 'Luis', '1997-03-06', 'Av. Siempre Viva 456'),
        ('Gonzalez', 'Maria', '1998-09-30', 'Calle Falsa 456'),
        ('Fernandez', 'Carlos', '1995-09-24', 'Av. Siempre Viva 789'),
        ('Lopez', 'Laura', '1992-07-21', 'Calle Falsa 789'),
        ('Martinez', 'Pedro', '1990-03-25', 'Av. Siempre Viva 159'),
        ('Sanchez', 'Silvia', '1988-04-12', 'Calle Falsa 159'),
        ('Gimenez', 'Jorge', '1991-06-08', 'Av. Siempre Viva 357'),
        ('Garcia', 'Marta', '1993-08-01', 'Calle Falsa 357');`
        );
        console.log("Registros iniciales insertados!");
      } else {
        console.log("La tabla clientes ya existe.");
      }
    } catch (error) {
      console.error("Error al crear la tabla o insertar registros:", error);
    }

    // Crear tabla turnos
    try {
      const res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'turnos'"
      );

      if (res.contar === 0) {
        await db.run(
          `CREATE TABLE turnos(
        IdTurno INTEGER PRIMARY KEY AUTOINCREMENT, 
        Apellido TEXT NOT NULL, 
        Nombre TEXT NOT NULL, 
        Fecha DATE NOT NULL, 
        Hora TIME NOT NULL, 
        Activo BOOLEAN)`
        );
        console.log("Tabla turnos creada!");

        await db.run(
          `INSERT INTO turnos (Apellido, Nombre, Fecha, Hora, Activo) VALUES 
        ('Gomez', 'Ana', '2024-05-25', '18:00', 1),
        ('Perez', 'Juan', '2024-08-25', '19:00', 1),
        ('Rodriguez', 'Luis', '2024-06-25', '16:00', 1),
        ('Gonzalez', 'Maria', '2024-05-13', '15:30', 1),
        ('Fernandez', 'Carlos', '2024-09-22', '14:00', 1),
        ('Lopez', 'Laura', '2024-09-18', '17:30', 1),
        ('Martinez', 'Pedro', '2024-10-17', '18:30', 1),
        ('Sanchez', 'Silvia', '2024-05-09', '13:00', 1),
        ('Gimenez', 'Jorge', '2024-07-30', '11:30', 1),
        ('Garcia', 'Marta', '2024-09-18', '12:00', 1);`
        );
        console.log("Registros iniciales insertados!");
      } else {
        console.log("La tabla turnos ya existe.");
      }
    } catch (error) {
      console.error("Error al crear la tabla o insertar registros:", error);
    }

    // Crear tabla tratamientos
    try {
      const res = await db.get(
        "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' AND name = 'tratamientos'"
      );

      if (res.contar === 0) {
        await db.run(
          `CREATE TABLE tratamientos(
        IdTratamiento INTEGER PRIMARY KEY AUTOINCREMENT, 
        NombreTratamiento TEXT NOT NULL,
        Descripcion TEXT NOT NULL
      );`
        );
        console.log("Tabla tratamientos creada!");

        await db.run(
          `INSERT INTO tratamientos (NombreTratamiento, Descripcion) VALUES 
        ('Revisión general', 'Chequeo completo del estado de salud'),
        ('Vacunación', 'Aplicación de vacunas de rutina'),
        ('Consulta por alergia', 'Evaluación de síntomas alérgicos'),
        ('Chequeo de rutina', 'Consulta periódica para mantener el control de salud'),
        ('Cirugía menor', 'Procedimiento quirúrgico de baja complejidad'),
        ('Desparasitación', 'Tratamiento para eliminar parásitos'),
        ('Revisión dental', 'Evaluación y limpieza dental'),
        ('Consulta por infección', 'Diagnóstico y tratamiento de infección'),
        ('Control postoperatorio', 'Seguimiento después de cirugía'),
        ('Examen de laboratorio', 'Realización de análisis de laboratorio');`
        );
        console.log("Registros iniciales insertados!");
      } else {
        console.log("La tabla tratamientos ya existe.");
      }
    } catch (error) {
      console.error("Error al crear la tabla o insertar registros:", error);
    }
    await db.close(); 
  }
}
CrearBDSiNoExiste();
module.exports = CrearBDSiNoExiste;
