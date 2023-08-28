const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
const { app } = require("../index");
const expect = chai.expect;
const animes = require("../anime.json")


describe("API SERIES", async() =>{
    describe("GET/", () =>{
        it("Debería darme un mensaje de bienvenida", (done)=>{
        chai
            .request(app)
            .get("/")
            .end((err, res)=> {
                expect(err).to.be.null
                expect(res).to.have.status(200)
                expect(res.text).to.equal("Bienvenidos a la prueba")
                done();
            });
        })
    });

    describe("GET/series", () =>{
        it("Debería retornar todos los animes", async ()=>{
            const response = await  chai.request(app).get("/series").send();
                expect(response).to.have.status(200);
            });
        })
        describe("GET/series", () =>{
            it("Debería retornar objeto con los animes", async ()=>{
                const response = await  chai.request(app).get("/series").send();
                    expect(response.body).to.deep.equal(animes);
                });
            })
            describe("POST/series", () =>{
                it("Agregar un nuevo anime", async ()=>{
                    const nuevoAnime = {
                        "id": 7,
                        "nombre":"Chainsawman",
                        "genero":"Shonen", 
                        "año":"2023",
                        "autor":"Tatsuki Fujitomo",
                    }
                    const response = await  chai.request(app).post("/series").send(nuevoAnime);
                        expect(response).to.have.status(201);
                    });
                })
            
            describe("PUT/series/:id", () =>{
                it("Modificar una serie", async (done)=>{
                    const animes = await chai.request(app).get("/series").send();
                    const idArreglos = Object.keys(animes)
                    const id = idArreglos[5]
                    const nuevaSerie = {
                        "nombre":"Jujutsu Kaisen",
                        "genero":"Shonen", 
                        "año":"2023",
                        "autor":"Gege Akutami",
                    }
                    const response = await chai.request(app).put(`/series/${id}`).send(nuevaSerie);
                    expect(response).to.have.status(202)
                    done()
                })
            })
    });