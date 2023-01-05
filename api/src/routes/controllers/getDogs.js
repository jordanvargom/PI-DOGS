const axios = require("axios");
const app = require("express").Router();
const { Dog, Temperament } = require("../../db");

// Obtener un listado de las primeras 8 razas de perro
// Debe devolver solo los datos necesarios para la ruta principal

app.get("/dogs", async (req, res) => {
  try {
    const db = await Dog.findAll();
    let api;
    await axios
      .get("https://api.thedogapi.com/v1/breeds")
      .then((res) => (api = res.data));
    if (db.length) {
      for (let i = 0; i < db.length; i++) {
        let perrito = db[i];
        let temperaments = await perrito.getTemperaments();
        perrito = perrito.dataValues;
        temperaments = temperaments.map((el) => el.dataValues.name);
        perrito.temperament = temperaments.toString();
        api.push(perrito);
      }
      return res.status(200).json(api);
    }
    res.status(200).json(api);
  } catch (error) {
    console.log(error);
  }
});

module.exports = app;