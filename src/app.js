const express = require("express");
const bodyParser = require("body-parser");

const multer = require("multer");
require("dotenv").config();
const app = express();

const useTaskRoutes = require("./routers/tasks");
const useUserRouter = require("./routers/users");

// Multer Isntances
const upload = multer({
  dest: "images",
});

// Se coloca el middle ware para que se pueda leer el body de la peticion

app.post("/upload", upload.single("upload"), (req, res) => {
  // Guardamos el archivo como binario
  res.send();
});

// Setamos los valores para el servidor para que nos devuelva un JSON
app.set(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Seteamos las rutas y las mandamos a llamar en el archivo o servidor principal
app.use(useTaskRoutes);
app.use(useUserRouter);

// @@ Routes - Endpoints
module.exports = app;
