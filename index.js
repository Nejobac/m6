const express = require("express");
const app = express();
const fs = require("fs");


//Midlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// Endpoints

//Subir servidor
app.get("/", (req, res) => {
    res.status(200).send("Bienvenidos a la prueba");
});

//Mostrar el objeto json
app.get("/series", (req, res) => {
    const data = fs.readFileSync("./anime.json", 'utf-8')
    const animeNombres = JSON.parse(data)
    res.status(200).json(animeNombres)
});

//traer elemento por el id
app.get("/series/:key", (req, res) => {
    const key = req.params.key
    const data = fs.readFileSync("./anime.json", 'utf-8')
    const animeNombres = JSON.parse(data)
    res.json({ anime: animeNombres[key] })
})

//traer elemento por el nombre
app.get("/series/nombre/:nombre", (req, res) => {
    let {nombre} = req.params
    nombre = nombre.toLocaleLowerCase().replace('-', ' ');
    const data = fs.readFileSync("./anime.json", 'utf-8')
    const animeNombres = JSON.parse(data)
    const arrayAnime = Object.values(animeNombres)
    const animeFiltro = arrayAnime.find(animeObj => {
        let nombreAnime = animeObj.nombre.toLocaleLowerCase()
        if (nombreAnime == nombre){
            return animeObj
        }})
        
    res.json(animeFiltro)

})


/*app.get("/series/nombre/:nombre", (req, res) => {
    const key = req.params.key
    const data = fs.readFileSync("./anime.json", 'utf-8')
    const animeNombres = JSON.parse(data)
    res.json({ anime: animeNombres[key] })
})*/

//agregar objeto por el id
app.post("/series", (req, res) => {
    const nuevaSerie = req.body
    const data = fs.readFileSync("./anime.json", 'utf-8')
    const animeNombres = JSON.parse(data)
    const animeID = (Object.keys(animeNombres).length) + 1
    console.log(animeID)
    animeNombres[animeID] = nuevaSerie
    fs.writeFileSync("./anime.json", JSON.stringify(animeNombres), 'utf-8')
    //res.send("Series de animación añadida")
    res.status(201).json(animeNombres)
});

//actualizar objeto por el id

app.put("/series/:id", (req, res) => {
    const llave = req.params.id
    const data = fs.readFileSync("./anime.json", 'utf-8')
    const animeNombres = JSON.parse(data)
    if(Object.hasOwn(animeNombres, llave)){
        const body = req.body
        animeNombres[llave] = body
        fs.writeFileSync("./anime.json", JSON.stringify(animeNombres))
        res.send("arhivo se ha actualizado con exito")
        res.status(202).json(animeNombres)
    }
})
//Borrar objeto a través del id
app.delete("/series/:id", (req, res) => {
    const id = req.params.id
    const data = fs.readFileSync("./anime.json", 'utf-8')
    const animeNombres = JSON.parse(data)
    if(Object.hasOwn(animeNombres, id)){
        delete animeNombres[id]
        fs.writeFileSync("./anime.json", JSON.stringify(animeNombres))
        res.send("arhivo se ha eliminado con exito")
    }

})


app.listen(3000, () => console.log("Escuchando puerto 3000"));
module.exports = { app };


/* Ejemplo
app.put("/series/:id", (req, res) => {
    let llave = req.params.id
    let cambioSerie = req.body
    const data = fs.readFileSync("./anime.json", 'utf-8')
    const animeNombres = JSON.parse(data)
    animeNombres[llave].nombre = cambioSerie.nombre
    animeNombres[llave].genero = cambioSerie.genero
    animeNombres[llave].año = cambioSerie.año
    animeNombres[llave].autor = cambioSerie.autor
    fs.writeFileSync("./anime.json", JSON.stringify(animeNombres))
    res.send("arhivo se ha actualizado con exito")
})*/