const axios = require("axios");
const app = require("express").Router();
const { Dog, Temperament } = require("../db");

// Obtener un listado de las primeras 8 razas de perro
// Debe devolver solo los datos necesarios para la ruta principal

app.get("/dogs", async (req, res) => {
  try {
    const db = await Dog.findAll();
    let api;
    await axios
      .get("https://api.thedogapi.com/v1/breeds?limit=1")
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

let temperament = [
  "Stubborn",
  "Curious",
  "Playful",
  "Adventurous",
  "Active",
  "Fun-loving",
  "Aloof",
  "Clownish",
  "Dignified",
  "Independent",
  "Happy",
  "Wild",
  "Hardworking",
  "Dutiful",
  "Outgoing",
  "Friendly",
  "Alert",
  "Confident",
  "Intelligent",
  "Courageous",
  "Loyal",
  "Brave",
  "Docile",
  "Responsive",
  "Composed",
  "Receptive",
  "Faithful",
  "Loving",
  "Protective",
  "Trainable",
  "Responsible",
  "Energetic",
  "Gentle",
  "Affectionate",
  "Devoted",
  "Assertive",
  "Dominant",
  "Strong Willed",
  "Obedient",
  "Reserved",
  "Kind",
  "Sweet-Tempered",
  "Tenacious",
  "Attentive",
  "Steady",
  "Bold",
  "Proud",
  "Reliable",
  "Fearless",
  "Lively",
  "Self-assured",
  "Cautious",
  "Eager",
  "Good-natured",
  "Spirited",
  "Companionable",
  "Even Tempered",
  "Rugged",
  "Fierce",
  "Refined",
  "Joyful",
  "Agile",
  "Amiable",
  "Excitable",
  "Determined",
  "Self-confidence",
  "Hardy",
  "Calm",
  "Good-tempered",
  "Watchful",
  "Hard-working",
  "Feisty",
  "Cheerful",
  "Sensitive",
  "Easygoing",
  "Adaptable",
  "Trusting",
  "Lovable",
  "Territorial",
  "Keen",
  "Familial",
  "Rational",
  "Bright",
  "Quick",
  "Powerful",
  "Gay",
  "Stable",
  "Quiet",
  "Inquisitive",
  "Strong",
  "Sociable",
  "Patient",
  "Suspicious",
  "Great-hearted",
  "Merry",
  "Vocal",
  "Tolerant",
  "Mischievous",
  "People-Oriented",
  "Bossy",
  "Cunning",
  "Athletic",
  "Boisterous",
  "Cooperative",
  "Trustworthy",
  "Self-important",
  "Respectful",
  "Thoughtful",
  "Generous",
  "Cat-like",
  "Sturdy",
  "Benevolent",
  "Clever",
  "Bubbly",
  "Opinionated",
  "Aggressive",
  "Extroverted",
  "Charming",
  "Unflappable",
  "Spunky",
  "Diligent",
  "Willful",
  "Fast",
  "Vigilant",
];

app.get("/temps", async (req, res) => {
  try {
    await temperament.forEach((el) => {
      Temperament.findOrCreate({
        where: { name: el },
      });
    });
    setTimeout(async () => {
      const temps2 = await Temperament.findAll();
      return res.status(200).json(temps2);
    }, 0);
  } catch (error) {
    console.log(error);
  }
});

// {
//     "name": "pinky",
//     "height_min" : "2",
//     "height_max" : "4",
//     "weight_min" : "2",
//     "weight_max" : "4",
//     "life_span": "16",
//     "temperament": []
// }

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
      console.log(dog)
      temperament.map(tep => dog.setTemperaments(tep))

      res.status(200).json(dog);
    })
    .catch((err) => console.log(err));
});


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


module.exports = app;
