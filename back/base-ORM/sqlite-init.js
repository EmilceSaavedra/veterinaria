const db = require("aa-sqlite");

async function CrearBDSiNoExiste() {
  await db.open("./.data/veterinaria.db");

  let existe = false;
  let res = null;
// Crear tabla consultas<
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
        Foreign Key (IdCliente) REFERENCES clientes (IdCliente),
        Foreign Key (LegajoVeter) REFERENCES veterinarios (LegajoVeter)
        );

        `
    );
    console.log("Tabla Consultas creada!");
    await db.run(
      `INSERT INTO consultas (IdConsulta, Fecha, Observacion, Precio, IdCliente, LegajoVeter) VALUES 
        (1,'2024-05-25', 'Revisión general', 2500, 3, 11050),
        (2,'2024-05-25', 'Vacunación', 7000, 2, 11314),
        (3,'2024-05-25', 'Consulta por alergia', 2500, 5,11314),
        (4,'2024-05-26', 'Chequeo de rutina', 2500, 4, 19899),
        (5,'2024-05-26', 'Cirugía menor', 67000, 9, 11314),
        (6,'2024-05-26', 'Desparasitación', 12000, 7, 14207),
        (7,'2024-05-26', 'Revisión dental', 3000, 1, 11314),
        (8,'2024-05-27', 'Consulta por infección', 2500, 6, 11358),
        (9,'2024-05-27', 'Control postoperatorio', 12000, 10, 19899),
        (10,'2024-05-27', 'Examen de laboratorio', 17000, 8, 14207)`
    );
  }
{
   // Crear tabla veterinarios
  let existe = false;
  let res = null;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'veterinarios'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table veterinarios( legajo INTEGER NOT NULL PRIMARY KEY, nombre text NOT NULL, matricula text NOT NULL, fechaRegistro text NOT NULL, celular INTEGER NULL, activo BOOLEAN);"
    );
    console.log("tabla veterinarios creada!");
    await db.run(
      `INSERT INTO veterinarios VALUES 
        (12456, 'Julian Rodriguez', 'M1050', '2009-07-25', 351111226, 1), 
        (14567, 'Mateo Videla', 'M5551', '2015-11-12', 3514666235, 1), 
        (18901, 'Rodrigo DePaul', 'M8400', '2019-03-06', 351654895, 1), 
        (14589, 'Leandro Paredes', 'M9899', '2024-09-30', 387622695, 1),
        (12890, 'Juan Pintos', 'M1314', '2021-09-24', 325156984, 1),
        (12541, 'Angel Videla', 'M1225', '2022-07-21', 351256330, 1),
        (12682, 'Sebastian Aviles', 'M6677', '2020-03-25', 351789011, 1),
        (12203, 'Fernanda Garcia', 'M1358', '2012-04-12', 351254101, 1),
        (12814, 'Soledad Pastorutti', 'M5596', '2018-06-08', 351659840, 1),
        (12395, 'Tomas Pintos', 'M4207', '2015-08-01', 351256987, 1)`
    );
  }

  
  existe = false;
  res = null;

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
        TipoMascota TEXT NOT NULL,
        IdCliente INTEGER NOT NULL,
        NombreMascota TEXT NOT NULL,
        FechaNacMascota DATE,
        FOREIGN KEY(IdCliente) REFERENCES clientes(Id))`
    );
    console.log("Tabla mascotas creada!");
    await db.run(
      `INSERT INTO mascotas (IdMascota, TipoMascota, IdCliente, NombreMascota, FechaNacMascota) VALUES 
        (1,'Perro', 3, 'Luna', '2018-03-25'),
        (2,'Gato', 5, 'Rocco', '2019-11-12'),
        (3,'Conejo', 7, 'Mia', '2017-03-06'),
        (4,'Perro', 4, 'Lola', '2018-09-30'),
        (5,'Gato', 9, 'Toby', '2021-09-24'),
        (6,'Hamster', 2, 'Beto', '2022-07-21'),
        (7,'Perro', 6, 'Toby', '2020-03-25'),
        (8,'Gato', 10, 'Luna', '2012-04-12'),
        (9,'Conejo', 8, 'Mia', '2018-06-08'),
        (10,'Hamster', 1, 'Rocco', '2015-08-01')`
    );
  }

  // Crear tabla clientes
  
  existe = false;
  res = null;
  res = await db.get(
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'clientes'",
    []
  );
  if (res.contar > 0) existe = true;
  if (!existe) {
    await db.run(
      "CREATE table clientes( Id INTEGER PRIMARY KEY AUTOINCREMENT, apellido text NOT NULL, nombre text NOT NULL, fechaNacimiento text NOT NULL, direccion text);"
    );
    console.log("tabla clientes creada!");
    await db.run(
      `INSERT INTO clientes VALUES 
        (1, 'Gomez', 'Ana', '1990-05-25', 'Av. Siempre Viva 123'),
        (2, 'Perez', 'Juan', '1985-11-12', 'Calle Falsa 123'),
        (3, 'Rodriguez', 'Luis', '1997-03-06', 'Av. Siempre Viva 456'),
        (4, 'Gonzalez', 'Maria', '1998-09-30', 'Calle Falsa 456'),
        (5, 'Fernandez', 'Carlos', '1995-09-24', 'Av. Siempre Viva 789'),
        (6, 'Lopez', 'Laura', '1992-07-21', 'Calle Falsa 789'),
        (7, 'Martinez', 'Pedro', '1990-03-25', 'Av. Siempre Viva 159'),
        (8, 'Sanchez', 'Silvia', '1988-04-12', 'Calle Falsa 159'),
        (9, 'Gimenez', 'Jorge', '1991-06-08', 'Av. Siempre Viva 357'),
        (10, 'Garcia', 'Marta', '1993-08-01', 'Calle Falsa 357')`
    );




  }


  db.close();
}
}
CrearBDSiNoExiste()
module.exports =  CrearBDSiNoExiste;
