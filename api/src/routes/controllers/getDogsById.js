const axios = require("axios");
const app = require("express").Router();
const { Dog } = require("../../db");

app.get("/dogs/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      let dog;
      await axios
        .get(`https://api.thedogapi.com/v1/breeds`)
        .then((res) => (dog = res.data));
      let filtrados = await dog.filter((d) => d.id == id);
      if (filtrados.length) return res.status(200).json(filtrados);
      let db = await Dog.findAll({
        where: { id: id },
      });
  
      if (db.length) {
        for (let i = 0; i < db.length; i++) {
          let perrito = db[i];
          let temperaments = await perrito.getTemperaments();
          perrito = perrito.dataValues;
          temperaments = temperaments.map((el) => el.dataValues.name);
          perrito.temperament = temperaments.toString();
          return res.status(200).json(perrito);
        }
      }
  
      return res.status(200).json(`no encontre la raza con el id ${id}`);
    } catch (error) {
      console.log(error);
    }
});

module.exports = app;