const request = require("supertest");
const app = require("../app");

const clientes = {
  apellido: "Ramirez",
  nombre: "Richard",
  fechaNacimiento: new Date().toISOString(),
  direccion: "Esquel 321",
};
const clienteModificado = {
  id: 15,
  apellido: "Ciccone",
  nombre: "Madonna",
  fechaNacimiento: new Date().toISOString(),
  direccion: "Java 876",
};

describe("GET /api/clientes", function () {
  it("Devolveria todos los clientes", async function () {
    const res = await request(app)
      .get("/api/clientes")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(Number),
          apellido: expect.any(String),
          nombre: expect.any(String),
          fechaNacimiento: expect.any(String),
          direccion: expect.any(String),
        }),
      ])
    );
  });
});

describe("GET /api/clientes/:id", () => {
  it("Deberia devolver el clientes con el id 7", async () => {
    const res = await request(app).get("/api/clientes/7");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        apellido: expect.any(String),
        nombre: expect.any(String),
        fechaNacimiento: expect.any(String),
        direccion: expect.any(String),
      })
    );
  });
});

describe("POST /api/clientes", () => {
  it("Deberia devolver al cliente que acabo de crear", async () => {
    const res = await request(app).post("/api/clientes").send(clientes);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        apellido: expect.any(String),
        nombre: expect.any(String),
        fechaNacimiento: expect.any(String),
        direccion: expect.any(String),
      })
    );
  });
});

describe("PUT /api/clientes/:id", () => {
  it("Deberia devolver al cliente con el id 2 modificado", async () => {
    const res = await request(app)
      .put("/api/clientes/2")
      .send(clienteModificado);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE", () => {
  it("Deberia eliminar a un cliente o informar que no fue encontrado", async () => {
      const clienteId = 7; 
      const res = await request(app).delete(`/api/clientes/${clienteId}`);
      //expect(res.status).toBe(200);
      if(res.status === 200){
          expect(res.body). toEqual({message: "Cliente eliminado"})
      }else{
          expect(res.body). toEqual({message: "No se pudo eliminar el cliente"})
      }
  });





});