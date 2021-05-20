const httpError = require("../models/error");

const maladie = require("../models/maladie");
const plante = require ("../models/plante");

const { validationResult } = require("express-validator");

const ajoutmaladie = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { nom, description, cause, planteId} = req.body;

  const createdMaladie = new maladie({
       nom,
      description,
      cause,
    /* traitements:[]*/
    });

    let existingPlante;
    try {
      existingPlante = await plante.findById(planteId);
    } catch {
      const error = new httpError("failed to fetch try again later", 500);
      return next(error);
    }
    
    try {
     createdMaladie.save();
    existingplante.maladies.push(createdMaladie);
    existingplante.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  res.status(201).json({ maladie: createdMaladie });
};

const updateMaladie = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { nom, description, cause } = req.body;
  const id = req.params.id;
  let existingmaladie;
  try {
    existingmaladie = await maladie.findById(id);
  } catch {
    const error = new httpError("problem", 500);
    return next(error);
  }

  existingmaladie.nom = nom;
  existingmaladie.description = description;
  existingmaladie.cause = cause;
  

  try {
    existingmaladie.save();
  } catch {
    const error = new httpError("failed to patch", 500);
    return next(error);
  }

  res.status(200).json({ maladie: existingmaladie });
};

const getMaladie = async (req, res, next) => {
  let existingmaladie;
  try {
    existingmaladie = await maladie.find({},"-password");
  } catch {
    const error = new httpError("failed to fetch try again later", 500);
    return next(error);
  }
  res.json({ maladie: existingmaladie });
};

const getMaladieById = async (req, res, next) => {
  const id = req.params.id;
  let existingmaladie;
  try {
    existingmaladie = await maladie.findById(id);
  } catch {
    const error = new httpError("failed to fetch try again later", 500);
    return next(error);
  }
  res.json({ maladie: existingmaladie });
};

exports.ajoutmaladie = ajoutmaladie;
exports.updateMaladie = updateMaladie;
exports.getMaladie = getMaladie;
exports.getMaladieById = getMaladieById


