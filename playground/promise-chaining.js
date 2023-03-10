const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

prisma.user
  .update({
    where: {
      id: "63ea9dc4251cecdb1c5f8ad2",
    },
    data: {
      email: "cesarconfigs@gmail.com",
    },
  })
  .then((user) => {
    return prisma.user.count();
  })
  .then((c) => {
    console.log(c);
  })
  .catch((e) => {
    console.log(e);
  });
