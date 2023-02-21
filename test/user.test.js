const { beforeEachl } = require("node:test");
const request = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

let userOne = {
  name: "Mike",
  email: "mike@gmail.com",
  password: "MyPass777!",
  age: 27,
  tokens: [
    {
      token: jwt.sign({})
    }
  ]
};

beforeEach(async () => {
  await prisma.user.deleteMany();
  await request(app).post("/users").send(userOne).expect(201);
});

test("Should signup a new user", async () => {
  await request(app).post("/users").send(userOne).expect(201);
});

test("Should login existing user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: userOne.password,
    })
    .expect(200);
});

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/users/login")
    .send({
      email: userOne.email,
      password: "ThisIsNotMyPassword",
    })
    .expect(400);
});
