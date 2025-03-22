// // veterinarios.test.js
// const request = require("supertest");
// const app = require("../index");

// // Datos de prueba
// const veterinarioNuevo = {
//   legajo: 11111,
//   nombre: "Mendes Sergio",
//   matricula: "M9999",
//   fechaRegistro: new Date().toISOString().split('T')[0],
//   celular: 3518956321,
//   activo: true,
//   idEspecialidad: 1
// };

// describe("Test API Veterinarios", () => {
  
//   // GET - Listar veterinarios
//   describe("GET /api/veterinarios", () => {
//     it("debería listar todos los veterinarios", async () => {
//       const res = await request(app).get("/api/veterinarios");
//       expect(res.statusCode).toBe(200);
//       expect(Array.isArray(res.body)).toBe(true);
//     });

//     it("debería filtrar por legajo", async () => {
//       const res = await request(app).get("/api/veterinarios?legajo=11314");
//       expect(res.statusCode).toBe(200);
//       if (res.body.length > 0) {
//         expect(res.body[0].legajo).toBe(11314);
//       }
//     });
//   });

//   // POST - Crear veterinario
//   describe("POST /api/veterinarios", () => {
//     it("debería crear un nuevo veterinario", async () => {
//       const res = await request(app)
//         .post("/api/veterinarios")
//         .send(veterinarioNuevo);

//       expect(res.statusCode).toBe(201);
//       expect(res.body.message).toContain('creado con éxito');
//     });

//     it("debería rechazar datos incompletos", async () => {
//       const veterinarioIncompleto = { nombre: "Test" };
//       const res = await request(app)
//         .post("/api/veterinarios")
//         .send(veterinarioIncompleto);

//       expect(res.statusCode).toBe(400);
//     });
//   });

//   // PUT - Modificar veterinario
//   describe("PUT /api/veterinarios/:legajo", () => {
//     it("debería modificar un veterinario", async () => {
//       const modificacion = {
//         ...veterinarioNuevo,
//         nombre: "Mendes Sergio Modificado"
//       };

//       const res = await request(app)
//         .put(`/api/veterinarios/${veterinarioNuevo.legajo}`)
//         .send(modificacion);

//       expect(res.statusCode).toBe(200);
//       expect(res.body.message).toContain('modificado con éxito');
//     });
//   });

//   // DELETE - Eliminar veterinario
//   describe("DELETE /api/veterinarios/:legajo", () => {
//     it("debería eliminar un veterinario", async () => {
//       const res = await request(app)
//         .delete(`/api/veterinarios/${veterinarioNuevo.legajo}`);
//       expect(res.statusCode).toBe(200);
//     });

//     it("debería manejar legajo inexistente", async () => {
//       const res = await request(app)
//         .delete("/api/veterinarios/99999");
//       expect(res.statusCode).toBe(404);
//     });
//   });
// }); 