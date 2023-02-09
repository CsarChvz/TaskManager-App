const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  await prisma.$connect();

  await prisma.tasks.create({
    data: {
      title: "Testing Node.js",
      description: "Create a Node.js tasks application",
    },
  });

  await prisma.tasks.create({
    data: {
      title: "Learning Java",
      description: "Creating some Java APIs",
    },
  });
  await prisma.tasks.create({
    data: {
      title: "Testing Out Flask APIs",
      description: "Set up some Flask APIs",
    },
  });

  const tasks = await prisma.tasks.findMany();

  console.dir(tasks, { depth: Infinity });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
