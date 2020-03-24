const dotenv = require("dotenv").config();
const Clarifai = require("clarifai");

const app = new Clarifai.App({
  apiKey: process.env.KEY_API_CLARIFAI
});

const handleApiCall = (req, res) => {
  app.models
    .predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
      res.json(data);
    })
    .catch(err => res.status(400).json("unable to work with API"));
};

const handleImage = (req, res, knex) => {
  const { id } = req.body;
  knex("users")
    .where("id", "=", id)
    .increment("entries", 1)
    .returning("entries")
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json(err));
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
};
