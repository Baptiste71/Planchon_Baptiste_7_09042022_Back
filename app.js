const express = require("express");

const { sequelize, User } = require("./models");

const app = express();
app.use(express.json());

app.post("/user", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const users = await User.create({ firstname, lastname, email, password });

    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000 ");
  await sequelize.sync({ force: true });
  console.log("Database synced!");
});
