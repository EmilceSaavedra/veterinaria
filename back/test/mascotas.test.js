const request = require("supertest");
const app = require("../index");
const db = require("../base-ORM/sequelize-init");
describe("Endpoints /api/mascotas",()=>{

    describe("GET", () => {
        it("Hay una lista de Mascotas", async () => {
            const res = await request(app).get("/api/mascotas");
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(expect.any(Array));
        });
    });
    
    describe("GET By Id", () => {
        const id = 3
        it("Deberia devolver un solo la Mascota, que posee un id, o informar que no fue encontrado", async () => {
            const res = await request(app).get(`/api/mascotas/${id}`);
            if(res.status === 200){
                //expect(res.statusCode).toEqual(200);
                expect(res.body).toEqual(expect.objectContaining({
                    IdMascota: expect.any(Number),
                    TipoMascota: expect.any(String),
                    IdCliente: expect.any(Number),
                    NombreMascota: expect.any(String),
                    FechaNacMascota: expect.any(String),
                 
                }));
            }else{
                expect(res.body).toEqual({message: "Mascota no encontrado"});
            };

        });
    });
    
    describe("POST", () => {
        const animalNuevo = {
            TipoMascota: 1,
            IdCliente: 3,
            NombreMascota: "Fido",
            FechaNacMascota: "2010-04-06",
           
        };
        it("Deberia devolver una nueva Mascota creada", async () => {
            const res = await request(app).post("/api/mascotas/").send(animalNuevo);
            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(expect.objectContaining({
                IdMascota: expect.any(Number),
                IdTipoMascota: expect.any(Number),
                IdCliente: expect.any(Number),
                NombreMascota: expect.any(String),
                FechaNacMascota: expect.any(String),
                
            }));
        });
    });

    describe("PUT", () => {
        it("Deberia actualizar a una mascota o informar que no fue encontrado", async () => {
            const animalNuevo = {
                TipoMascota: 1,
                IdCliente: 3,
                NombreMascota: "Fido",
                FechaNacMascota: "2010-04-06"
                
            };
            const animalId = 8; 
            const res = await request(app).put(`/api/mascotas/${animalId}`).send(animalNuevo);
            if(res.status === 200){
                const animalActualizado = await db.mascotas.findOne({
                    attributes: ["IdMascota","TipoAnimal","IdCliente", "NombreMascota","FechaNacMascota"],
                    where: { IdMascota: animalId },
                }); 

                expect(animalNuevo.TipoMascota).toEqual(animalActualizado.TipoMascota);
                expect(animalNuevo.IdCliente).toEqual(animalActualizado.IdCliente);
                expect(animalNuevo.NombreMascota.toLowerCase()).toEqual(animalActualizado.NombreMascota.toLowerCase());
                expect(new Date(animalNuevo.FechaNacMascota)).toEqual(new Date(animalActualizado.FechaNacMascota));
                
            }else{
                expect(res.body).toEqual({message: "Mascota no encontrado"})
            }

        });
    
    });



    describe("DELETE", () => {
        it("Deberia eliminar a una mascota o informar que no fue encontrado", async () => {
            const mascotaId = 7; 
            const res = await request(app).delete(`/api/mascotas/${mascotaId}`);
        
            if(res.status === 200){
                expect(res.body). toEqual({message: "Mascota eliminado"})
            }else{
                expect(res.body). toEqual({message: "Mascota no encontrado"})
            }
            

        });
    
    });
});


