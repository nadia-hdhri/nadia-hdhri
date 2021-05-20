const httpError = require("../models/error");

const Agriculteur = require("../models/Agriculteur");

const { validationResult } = require("express-validator");

const jwt = require("jsonwebtoken");

const signup = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { name, email, password } = req.body;
  let existinguser;
  try {
    existinguser = await Agriculteur.findOne({ email: email });
  } catch (err) {
    const error = new httpError("problems!!!", 500);
    return next(error);
  }

  if (existinguser) {
    const error = new httpError("user exist", 422);
    return next(error);
  }

  const createduser = new Agriculteur({
    name,
    email,
    password,
  });

  try {
    await createduser.save();
  } catch (err) {
    const error = new httpError("failed signup", 500);
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      { userId: createduser.id, email: createduser.email },
      "secret-thinks",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }

  res
    .status(201)
    .json({
      Agriculteur: createduser.id,
      email: createduser.email,
      token: token,
    });
};

const login = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("ivalid input passed", 422));
  }

  const { email, password } = req.body;
  let existingUser;

  try {
    existingUser = await Agriculteur.findOne({ email: email });
  } catch {
    return next(new httpError("ivalid input passed", 422));
  }
  if (!existingUser || existingUser.password !== password) {
    return next(new httpError("invalid input passed ", 422));
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      "secret-thinks",
      { expiresIn: "1h" }
    );
  } catch (err) {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.status(200).json({ Agriculteur: existingUser, token: token });
};

const getAgriculteurById = async (req, res, next) => {
  const id = req.params.id;
  let existingUser;
  try {
    existingUser = await agriculteur.findById(id);
  } catch {
    const error = new httpError("failed signup try again later", 500);
    return next(error);
  }
  res.json({ Agriculteur: existingUser });
};

const getAllAgriculteur = async (req, res, next) => {
  let existingUser;
  try {
    existingUser = await Agriculteur.find({}, "-password");
  } catch {
    const error = new httpError("failed to fetch try again later", 500);
    return next(error);
  }
  res.json({ Agriculteur: existingUser });
};

const deleteAgriculteur = async (req, res, next) => {
  const id = req.params.id;
  let existingUser;

  try {
    existingUser = await Agriculteur.findById(id);
  } catch {
    return next(new httpError("failed to fetch !!", 500));
  }
  if (!existingUser) {
    return next(new httpError("user does not exist !!", 500));
  }
  try {
    existingUser.remove();
  } catch {
    return next(new httpError("failed !!!", 500));
  }
  res.status(200).json({ message: "deleted" });
};

const updateAgriculteur = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new httpError("invalid input passed ", 422));
  }

  const { name, email, password } = req.body;
  const UserId = req.params.userId;
  let existingUser;
  try {
    existingUser = await Agriculteur.findById(UserId);
  } catch {
    const error = new httpError("problem", 500);
    return next(error);
  }

  existingUser.name = name;
  existingUser.email = email;
  existingUser.password = password;

  try {
    existingUser.save();
  } catch {
    const error = new httpError("failed to patch", 500);
    return next(error);
  }

  res.status(200).json({ Agriculteur: existingUser });
};

exports.signup = signup;
exports.login = login;
exports.getAgriculteurById = getAgriculteurById;
exports.getAllAgriculteur = getAllAgriculteur;
exports.deleteAgriculteur = deleteAgriculteur;
exports.updateAgriculteur = updateAgriculteur;
