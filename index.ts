const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
async function main() {
  await prisma.$connect();
  await prisma.tasks.create({
    data: {
      description: "Alle Alle vais",
      completed: true,
    },
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
