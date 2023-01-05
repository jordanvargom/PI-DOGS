const app = require("express").Router();
const { Dog } = require("../../db");

app.post("/dogs", (req, res) => {
    const {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      temperament,
      image,
    } = req.body;
  
    if (
      !name ||
      !height_min ||
      !height_max ||
      !weight_min ||
      !weight_max ||
      !life_span ||
      !temperament
    )
      return res.status(404).json("faltan enviar propiedades");
  
    const height2 = `${height_min} - ${height_max}`;
    const weight2 = `${weight_min} - ${weight_max}`;
  
    Dog.create({
      name: name,
      height: height2,
      weight: weight2,
      life_span: life_span,
      image: image
        ? image
        : "https://www.publicdomainpictures.net/pictures/260000/velka/dog-face-cartoon-illustration.jpg",
    })
      .then((dog) => {
        temperament.map((tep) => dog.setTemperaments(tep));
  
        res.status(200).json(dog);
      })
      .catch((err) => console.log(err));
  });
  
  module.exports = app