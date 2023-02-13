const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
let bodyParser = require("body-parser");
const app = express();
const port = process.env.port || 3000;

// Setamos los valores para el servidor para que nos devuelva un JSON
app.set(express.json());
app.post("/users", (req, res) => {
  console.log("Body", req.body);
  res.send("Andres");
});

app.listen(port, () => {
  console.log("Port listen");
});
