const app = require("express").Router();
const { Temperament } = require("../../db");

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
  
//  let api;
//  await axios
//    .get(`https://api.thedogapi.com/v1/breeds`)
//    .then((res) => (api = res.data));
//  let arr = api.map((el) => el.temperament);
//  let filtrados = arr.filter((el) => el !== null && typeof el !== 'undefined');
//  let juntos = filtrados.map((el) => el.split(","));
//  const array2 = (array) => {
//    let newArray = [];
//    array.forEach((e) => {
//      e.map((el) => newArray.push(el));
//    });
//    let sinEspacios = newArray.map((el) => el.trim());
//    return sinEspacios;
//  };

//  let esteSi = array2(juntos);
//  let temperament = esteSi.filter((item, index) => {
//    return esteSi.indexOf(item) === index;
//  });

app.get("/temps", (req, res) => {
    const a = new Promise((resolve) => {
      temperament.forEach((el) => {
        Temperament.findOrCreate({
          where: { name: el },
        });
      });
      resolve(Temperament.findAll());
    })
      .then((temps2) => {
        return res.status(200).json(temps2);
      })
      .catch((err) => res.status(404).json(err));
 });

 module.exports = app;