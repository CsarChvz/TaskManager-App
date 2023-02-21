const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const auth = async (req, res, next) => {
  try {
    console.log(req.header("Authorization"));
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoed = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoed);
    let id = decoed._id.toString();
    const user = await prisma.user.findFirstOrThrow({
      where: {
        id: id,
      },
    });
    // Se tiene que checar que el token que se esta mandando sea el mismo que se tiene en la base de datos o uno de los que este
    // en la base de datos

    if (!user) {
      throw new Error();
    }

    user.tokens.forEach((element) => {
      if (element.token === token) {
        req.user = user;
        req.token = token;
        next();
      }
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
module.exports = auth;
