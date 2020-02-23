const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "leandro",
    password: "1234",
    database: "smart-brain"
  }
});
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  knex
    .select()
    .from("users")
    .then(data => {
      res.send(data);
    });
});
//FIRST WAY TO CALL
app.post("/signin", signin.handleSignin(knex, bcrypt));
//SECOND WAY TO CALL
app.post("/register", (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, knex);
});

app.put("/image", (req, res) => {
  image.handleImage(req, res, knex);
});

app.post("/imageUrl", (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("App is running in port 3000");
});
