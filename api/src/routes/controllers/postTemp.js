const app = require("express").Router();
const { Temperament } = require("../../db");

app.post("/temps", (req, res) => {
    const { temperament } = req.body;
    if (!temperament) res.status(404).json("temperaments need to be sent");
    Temperament.create({
      name: temperament,
    })
      .then((dog) => {
        console.log(dog.dataValues);
        res.status(200).json(dog);
      })
      .catch((error) => console.log(error));
  });
  
module.exports = app