const express = require("express");
const route = express.Router();

const maladieControllers = require("../controllers/maladie");

const { check } = require("express-validator");

route.post(
  "/ajoutmaladie",
  check("nom").not().isEmpty(),

  check("description").not().isEmpty(),

  check("cause").not().isEmpty(),

  maladieControllers.ajoutmaladie
);

route.patch(
  '/:id',
  check("nom").not().isEmpty(),

  check("description").not().isEmpty(),

  check("cause").not().isEmpty(),

  maladieControllers.updateMaladie
);

route.get('/', maladieControllers.getMaladie);
route.get('/:id', maladieControllers.getMaladieById);

module.exports = route;
