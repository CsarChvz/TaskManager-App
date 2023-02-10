const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  await prisma.$connect();
  // await prisma.tasks.create({
  //   data: {
  //     description: "Alle Alle vais",
  //     completed: true,
  //   },
  // });
  await prisma.user.create({
    data: {
      email: "si@gmail.com",
      name: "Si",
      password: "pendejada",
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
