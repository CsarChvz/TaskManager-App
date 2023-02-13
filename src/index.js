const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const port = process.env.port || 3000;

// Setamos los valores para el servidor para que nos devuelva un JSON
app.set(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// @@ Routes - Endpoints

//    @@@ POST - End points
app.post("/users", async (req, res) => {
  try {
    let datos = await prisma.user.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).json(datos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.post("/tasks", async (req, res) => {
  try {
    let datos = await prisma.tasks.create({
      data: {
        ...req.body,
      },
    });
    res.status(201).json(datos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//    @@@ GET - End points

app.listen(port, () => {
  console.log("Port listen");
});
