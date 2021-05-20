const express = require("express");
const route = express.Router();

const AgriculteurControllers = require("../controllers/Agriculteur");

const { check } = require("express-validator");




route.post(
  "/signup",
  check("name").not().isEmpty(),
  check("email").normalizeEmail(),
  check("password").isLength({ min: 8 }),
  AgriculteurControllers.signup
);

route.patch(
  "/:userId",
  check("name").not().isEmpty(),
  check("email").normalizeEmail(),
  check("password").isLength({ min: 8 }),
  AgriculteurControllers.updateAgriculteur
);


route.post(
  "/login",
  check("email").not().isEmpty(),
  check("password").normalizeEmail(),
  AgriculteurControllers.login
);
route.get("/:id", AgriculteurControllers.getAgriculteurById);
route.get("/:id", AgriculteurControllers.getAllAgriculteur);
route.delete("/:id", AgriculteurControllers.deleteAgriculteur);

module.exports = route;
