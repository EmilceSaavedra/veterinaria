const request = require("supertest");
const app = require("../app");

const veterinarioNuevo = {
  legajo: 1111,
  nombre: "Mendes Sergio",
  matricula: "Mc9999",
  fechaRegistro: new Date().toISOString(),
  celular: 351895632,
  Activo: true,
  
};
const veterinarioModificado = {
    legajo: 1890,
    nombre: "Mendes Sergio",
    matricula: "Mc9999",
    fechaRegistro: new Date().toISOString(),
    celular: 351895632,
    Activo: false,
};

describe("GET /api/veterinarios", function () {
  it("Devolveria todos los veterinarios", async function () {
    const res = await request(app)
      .get("/api/veterinarios")
      .set("content-type", "application/json");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
            legajo: expect.any(Number),
            nombre: expect.any(String),
            matricula: expect.any(String),
            fechaRegistro: expect.any(String),
            celular:expect.any(Number),
            Activo: expect.any(Boolean),
        }),
      ])
    );
  });
});

describe("GET /api/veterinarios/:legajo", () => {
  it("Deberia devolver el veterinario con el legajo 1268", async () => {
    const res = await request(app).get("/api/veterinarios/1268");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        legajo: expect.Number = 1268,
        nombre: expect.any(String),
        matricula: expect.any(String),
        fechaRegistro: expect.any(String),
        celular:expect.any(Number),
        Activo: expect.any(Boolean),
      })
    );
  });
});

describe("POST /api/veterinarios", () => {
  it("Deberia devolver el veterinario que acabo de crear", async () => {
    const res = await request(app).post("/api/veterinarios").send(veterinarioNuevo);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(
      expect.objectContaining({
        legajo: expect.any(Number),
        nombre: expect.any(String),
        matricula: expect.any(String),
        fechaRegistro: expect.any(String),
        celular:expect.any(Number),
        Activo: expect.any(Boolean),
      })
    );
  });
});

describe("PUT /api/veterinarios/:legajo", () => {
  it("Deberia devolver la veterinario con el legajo 1281 modificado", async () => {
    const res = await request(app)
      .put("/api/veterinarios/1281")
      .send(veterinarioModificado);
    expect(res.statusCode).toEqual(200);
  });
});

describe("DELETE /api/veterinarios/:legajo", () => {
  it("Deberia devolver el veterinario con el legajo NUEVO borradoo", async () => {
    const res = await request(app).delete("/api/veterinarios/"+veterinarioNuevo.legajo);
    expect(res.statusCode).toEqual(200);
  });
});
