const express = require("express");
const route = express.Router();

const planteControllers = require("../controllers/plante");

const { check } = require("express-validator");

route.post(
  "/ajoutplante",
  check("nom").not().isEmpty(),
  check("type").not().isEmpty(),
  planteControllers.ajoutplante
);

route.patch("/:id",
  check("nom").not().isEmpty(),
  check("type").not().isEmpty(),
  planteControllers.updateplante);

route.delete('/:id',planteControllers.deleteplante);
route.get('/:id',planteControllers.getPlanteById);
route.get('/:',planteControllers.getPlante);

module.exports = route;