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
  const id = "63ee64401e480c469972e6f8";
  const task = await prisma.tasks.findUnique({
    where: {
      id,
    },
  });
  console.log(task);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
