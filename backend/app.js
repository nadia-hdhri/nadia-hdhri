const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const adminRoutes = require("./routes/Admin");
const AgriculteurRoutes = require("./routes/Agriculteur");

const ingenieurRoutes = require("./routes/ingenieur");
const planteRoutes = require("./routes/plante");
const maladieRoutes = require("./routes/maladie");

const httperror = require("./models/error");

const mongoose = require("mongoose");

app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api/Agriculteur", AgriculteurRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/ingenieur", ingenieurRoutes);
app.use("/api/plante", planteRoutes);
app.use("/api/maladie", maladieRoutes);

app.use((req, res, next) => {
  const error = new httperror("could not find that page", 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "an unknown error occurred " });
});

mongoose
  .connect(
    "mongodb+srv://nedia:nedia@cluster0.ndope.mongodb.net/Plante?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch((err) => {
    console.log(err);
  });
