const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();
const port = process.env.port || 3000;

const useTaskRoutes = require("./routers/tasks");
const useUserRouter = require("./routers/users");

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

async function main() {
  await prisma.$connect();
  // await prisma.tasks.create({
  //   data: {
  //     description: "Alle Alle vais",
  //     completed: true,
  //   },
  // });
  const id = "63ee64401e480c469972e6f8";
  // Get all taskks from the id and the user data from the id

  // const task = await prisma.tasks.findMany({
  //   where: {
  //     ownerId: id,
  //   },
  //   include: {
  //     owner: true,
  //   },
  // });

  // // console.log(task);
  // const user = await prisma.user.findUnique({
  //   where: {
  //     id: id,
  //   },
  //   include: {
  //     tasks: true,
  //   },
  // });
  // console.log(user);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
