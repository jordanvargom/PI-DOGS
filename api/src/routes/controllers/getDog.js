const axios = require("axios");
const app = require("express").Router();
const { Dog, Temperament } = require("../../db");

// Obtener un listado de las primeras 8 razas de perro
// Debe devolver solo los datos necesarios para la ruta principal

app.get("/dog", async (req, res) => {
    try {
      const { name } = req.query;
      if (!name) return res.status(400).json("no se envio ningun nombre");
  
      let dogs;
      await axios
        .get("https://api.thedogapi.com/v1/breeds")
        .then((res) => (dogs = res.data));
      const db = await Dog.findAll();
      if (db.length) {
        for (let i = 0; i < db.length; i++) {
          let perrito = db[i];
          let temperaments = await perrito.getTemperaments();
          perrito = perrito.dataValues;
          temperaments = temperaments.map((el) => el.dataValues.name);
          perrito.temperament = temperaments.toString();
          dogs.push(perrito);
        }
      }
      let filtrados = dogs.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      if (filtrados.length) return res.status(200).json(filtrados);
      res.status(404).json("no encontre razas");
    } catch (error) {
      console.log(error);
    }
  });

module.exports = app;