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

app.get("/users", async (req, res) => {
  try {
    let usersData = await prisma.user.findFirst();
    res.status(200).json(usersData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
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

app.get("/tasks", async (req, res) => {
  try {
    let tasksData = await prisma.tasks.findMany();
    res.status(200).json(tasksData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/tasks/:id", async (req, res) => {
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

// @@@ PATCH - End points

app.patch("/users/:id", async (req, res) => {
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

app.patch("/tasks/:id", async (req, res) => {
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

// @@@ DELETE - End points
app.delete("/users/id", async (req, res) => {
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
app.delete("/tasks/id", async (req, res) => {
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

app.listen(port, () => {
  console.log("Port listen");
});
