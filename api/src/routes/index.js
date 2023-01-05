const { Router } = require("express");
//const dogRoutes = require("./dogRoutes.js");
const getDogs = require("./controllers/getDogs")
const getDog = require("./controllers/getDog")
const getDogsById = require("./controllers/getDogsById")
const getTemps = require("./controllers/getTemps")
const postDogs = require("./controllers/postDogs")
const postTemp = require("./controllers/postTemp")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", getDogs);
router.use("/", getDog);
router.use("/", getDogsById);
router.use("/", getTemps);
router.use("/", postDogs);
router.use("/", postTemp);

module.exports = router;
