const express = require("express");
const user = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");
//    @@@ POST - End points
user.post("/users", async (req, res) => {
  try {
    let password = await bcrypt.hash(req.body.password, 8);
    let datos = await prisma.user.create({
      data: {
        ...req.body,
        password,
      },
    });
    res.status(201).json(datos);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

//    @@@ GET - End points

user.get("/users", async (req, res) => {
  try {
    let usersData = await prisma.user.findFirst();
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

user.get("/users/:id", async (req, res) => {
  // Para conseguir el id de la ruta, tenemos que solicitar el parametro de la ruta
  // Esto se hace con el metodo params de express
  // ej: req.params.id

  let _id = req.params.id.toString();
  try {
    let usersData = await prisma.user.findUniqueOrThrow({
      where: {
        id: _id,
      },
    });
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @@@ PATCH - End points

user.patch("/users/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) => {
    return allowedUpdates.includes(update);
  });

  let _id = req.params.id.toString();

  if (!isValidOperation) {
    return res.send(400).send({ error: "Invalid updates!" });
  }
  try {
    let usersData = await prisma.user.update({
      where: {
        id: _id,
      },
      data: {
        ...req.body,
      },
    });
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// @@@ DELETE - End points
user.delete("/users/id", async (req, res) => {
  try {
    let _id = req.params.id.toString();
    let userDeleted = await prisma.user.delete({
      where: {
        id: _id,
      },
    });

    if (!userDeleted) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send(userDeleted);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});
user.delete("/tasks/id", async (req, res) => {
  try {
    let _id = req.params.id.toString();
    let userDeleted = await prisma.user.delete({
      where: {
        id: _id,
      },
    });

    if (!userDeleted) {
      return res.status(404).send({ error: "User not found" });
    }
    return res.status(200).send(userDeleted);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = user;
