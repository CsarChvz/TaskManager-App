const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const port = process.env.port || 3000;

const useTaskRoutes = require("./routers/tasks");
const useUserRouter = require("./routers/users");

// Middleware
// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send("GET requests are disabled");
//   } else {
//     next();
//   }
// });

// Middleware -- Mantener
app.use((req, res, next) => {
  res.status(503).send("Site is currently down. Check back soon!");
});

// Setamos los valores para el servidor para que nos devuelva un JSON
app.set(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Seteamos las rutas y las mandamos a llamar en el archivo o servidor principal
app.use(useTaskRoutes);
app.use(useUserRouter);

// @@ Routes - Endpoints

app.listen(port, () => {
  console.log("Port listen");
});
