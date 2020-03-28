const express = require("express");
const dotenv = require("dotenv").config();
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const morgan = require("morgan");
const knex = require("knex")({
  client: "pg",
  //INFO FROM docker-compose.yml
  //connection: process.env.POSTGRES_URI
  connection: {
    //host: process.env.POSTGRES_HOST,
    host: process.env.DB_HOST,
    //user: process.env.POSTGRES_USER,
    user: process.env.DB_USER,
    //password: process.env.POSTGRES_PASSWORD,
    password: process.env.DB_PASS,
    //database: process.env.POSTGRES_DB
    database: "smart-brain"
  }
});
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const auth = require("./controllers/authorization");

const app = express();

app.use(express.json());
app.use(morgan("combined"));
app.use(cors());

app.get("/", (req, res) => {
  knex
    .select()
    .from("users")
    .then(data => {
      res.send(data);
    });
});
//FIRST WAY TO CALL HIGH ORDER FUNCTION - a function that returns another function
app.post("/signin", signin.signinAuthentication(knex, bcrypt));
//SECOND WAY TO CALL
app.post("/register", (req, res) => {
  register.handleRegister(req, res, knex, bcrypt);
});

app.get("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfile(req, res, knex);
});

//TODO work with age and hobby
app.post("/profile/:id", auth.requireAuth, (req, res) => {
  profile.handleProfileUpdate(req, res, knex);
});

app.put("/image", auth.requireAuth, (req, res) => {
  image.handleImage(req, res, knex);
});

app.post("/imageUrl", auth.requireAuth, (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log("App is running in port 3000!");
});
