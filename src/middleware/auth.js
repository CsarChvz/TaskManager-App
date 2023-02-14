const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoed = jwt.verify(token, "thisismynewcourse");
    console.log(decoed);
    const user = await prisma.user.findFirst({
      where: {
        id: decoed._id,
      },
    });
    // Se tiene que checar que el token que se esta mandando sea el mismo que se tiene en la base de datos o uno de los que este
    // en la base de datos

    if (!user) {
      throw new Error();
    }
    req.user = user;
    user.tokens.forEach((element) => {
      if (element.token === token) {
        next();
      }
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
module.exports = auth;
