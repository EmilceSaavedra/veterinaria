const request = require("supertest");
const app = require("../app");

const consulta = {
  Fecha: new Date().toISOString(),
  Observacion: "Malestar estomacal, se receto medicamento",
  Precio: 150.07,
  IdMascota: 1,
  IdCliente: 1,
  LegajoVeter: 1,
};
const consultaModificada = {
  IdConsulta: 1313,
  Fecha: new Date().toISOString(),
  Observacion: "Malestar estomacal, se receto medicamento",
  Precio: 160.14,
  IdMascota: 8,
  IdCliente: 8,
  LegajoVeter: 8,
};

describe("GET /api/consultas", function () {
  it("Devolveria todas las consultas", async function () {
    const res = await request(app)
      .get("/api/consultas")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          IdConsulta: expect.any(Number),
          Fecha: expect.any(String),
          Observacion: expect.any(String),
          Precio: expect.any(Number),
          IdMascota: expect.any(Number),
          IdCliente: expect.any(Number),
          LegajoVeter: expect.any(Number),
        }),
      ])
    );
  });
});

describe("GET /api/consultas/:id", () => {
  it("Deberia devolver la consulta con el IdConsulta 2", async () => {
    const res = await request(app).get("/api/consultas/2");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdConsulta: expect.any(Number),
        Fecha: expect.any(String),
        Observacion: expect.any(String),
        Precio: expect.any(Number),
        IdMascota: expect.any(Number),
        IdCliente: expect.any(Number),
        LegajoVeter: expect.any(Number),
      })
    );
  });
});

describe("POST /api/consultas", () => {
  it("Deberia devolver la consulta que acabo de crear", async () => {
    const res = await request(app).post("/api/consultas").send(consulta);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        IdConsulta: expect.any(Number),
        Fecha: expect.any(String),
        Observacion: expect.any(String),
        Precio: expect.any(Number),
        IdMascota: expect.any(Number),
        IdCliente: expect.any(Number),
        LegajoVeter: expect.any(Number),
      })
    );
  });
});

describe("PUT /api/consultas/:id", () => {
  it("Deberia devolver la consulta con el IdConsulta 3 modificada", async () => {
    const res = await request(app)
      .put("/api/consultas/3")
      .send(consultaModificada);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/consultas/:id", () => {
  it("Deberia devolver la consulta con el IdConsulta 11 borrada", async () => {
    const res = await request(app).delete("/api/consultas/11");
    expect(res.statusCode).toEqual(200);
  });
});
