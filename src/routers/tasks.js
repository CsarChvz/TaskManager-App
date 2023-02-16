const express = require("express");
const tasks = express.Router();

const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = require("../middleware/auth");

// __ Creación de tarea __

tasks.post("/tasks", auth, async (req, res) => {
  try {
    let task = await prisma.tasks.create({
      data: {
        ...req.body,
        owner: {
          connect: {
            id: req.user.id.toString(),
          },
        },
      },
    });
    res.status(201).json(task);
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

tasks.delete("/tasks/id", async (req, res) => {
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
module.exports = tasks;
