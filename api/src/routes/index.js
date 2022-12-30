const { Router } = require("express");
const dogRoutes = require("./dogRoutes.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/", dogRoutes);

module.exports = router;
