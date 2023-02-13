const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

await prisma.user.update({
  where: {
    id: "63ea9dc4251cecdb1c5f8ad2",
  },
});
