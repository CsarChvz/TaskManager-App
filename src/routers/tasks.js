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

tasks.get("/tasks", auth, async (req, res) => {
  try {
    let tasksData = await prisma.tasks.findMany({
      where: {
        owner: {
          id: req.user.id.toString(),
        },
      },
      include: {
        owner: true,
      },
    });
    res.status(200).json(tasksData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

tasks.get("/tasks/:id", auth, async (req, res) => {
  try {
    let _id = req.params.id.toString();
    // Get all tasks from a user

    // Para obtener la tarea de un usuario, tenemos que checar que la tarea que se este llamando, pertenezca al usuario que esta haciendo la petición
    let tasksData = await prisma.tasks.findMany({
      where: {
        id: _id,
        owner: {
          id: req.user.id.toString(),
        },
      },

      include: {
        owner: true,
      },
    });
    res.status(200).json(tasksData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

tasks.patch("/tasks/:id", auth, async (req, res) => {
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
    let idTask = req.params.id.toString();
    let idUser = req.user.id.toString();
    // Nada más tenemos que obtener la task, checamos que el id del usuario que esta haciendo la petición, sea el mismo que el que esta en la tarea
    let task = await prisma.tasks.findFirstOrThrow({
      where: {
        id: idTask,
        owner: {
          id: idUser,
        },
      },
    });

    if (!task) {
      return res.status(404).send();
    } else {
      let taskUpdate = await prisma.tasks.update({
        where: {
          id: idTask,
        },
        data: {
          ...req.body,
        },
      });
      res.status(200).json(taskUpdate);
    }

    if (!task) {
      return res.status(404).json(error.message);
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

tasks.delete("/tasks/:id", auth, async (req, res) => {
  try {
    let idTask = req.params.id.toString();
    let idUser = req.user.id.toString();
    // Nada más tenemos que obtener la task, checamos que el id del usuario que esta haciendo la petición, sea el mismo que el que esta en la tarea
    let task = await prisma.tasks.findFirstOrThrow({
      where: {
        id: idTask,
        owner: {
          id: idUser,
        },
      },
    });

    if (!task) {
      return res.status(404).send();
    } else {
      let taskDelete = await prisma.tasks.delete({
        where: {
          id: idTask,
        },
      });
      res.status(200).json();
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

module.exports = tasks;
