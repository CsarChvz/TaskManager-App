const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma.tasks
  .delete({
    where: {
      id: "",
    },
  })
  .tnen((task) => {
    return prisma.tasks.findMany({
      where: {
        completed: false,
      },
    });
  })
  .then((c) => {
    console.log(c);
  })
  .catch((e) => {
    console.log(e);
  });
