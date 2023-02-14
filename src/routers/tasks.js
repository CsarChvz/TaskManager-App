const express = require("express");
const tasks = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

tasks.get("/test", async (req, res) => {
  console.log("test");
  res.send("test");
});

tasks.post("/tasks", async (req, res) => {
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

tasks.get("/tasks", async (req, res) => {
  try {
    let tasksData = await prisma.tasks.findMany();
    res.status(200).json(tasksData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

tasks.get("/tasks/:id", async (req, res) => {
  let _id = req.params.id.toString();
  try {
    let tasksData = await prisma.tasks.findUniqueOrThrow({
      where: {
        id: _id,
      },
    });
    res.status(200).json(tasksData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

tasks.patch("/tasks/:id", async (req, res) => {
  // Los campos que se agregaron para actualizar
  const updates = Object.keys(req.body);
  // Estos son los campos que se permiten actualizar
  const allowedUpdates = ["description", "completed"];

  // Funcion que checa si es que se puede hacer la operación
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.send(400).send({
      error: "Invalid updates",
    });
  }

  try {
    let _id = req.params.id.toString();
    const task = await prisma.tasks.update({
      where: {
        id: _id,
      },
      data: {
        ...req.body,
      },
    });
    if (!task) {
      return res.status(404).send();
    }
    res.status(200).send(task);
  } catch (error) {
    return res.status(400).send({ error: Error(error) });
  }
});
module.exports = tasks;
