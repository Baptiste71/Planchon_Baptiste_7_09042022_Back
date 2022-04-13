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

app.get("/user", async (req, res) => {
  try {
    const users = await User.findAll();

    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

app.get("/user/:uuid", async (req, res) => {
  const uuid = req.params.uuid;
  try {
    const userDb = await User.findOne({
      where: { uuid },
    });

    return res.json(userDb);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Something went wrong!" });
  }
});

app.listen({ port: 5000 }, async () => {
  console.log("Server up on http://localhost:5000 ");
  await sequelize.authenticate();
  console.log("Database connected!");
});
