const handleProfile = (req, res, knex) => {
  const { id } = req.params;
  knex
    .where({ id: id })
    .select("*")
    .from("users")
    .then(user => {
      console.log(user);
      if (user.length) res.json(user[0]);
      else res.status(400).json("no such user");
    })
    .catch(err => {
      res.status(400).json(err);
    });
};

const handleProfileUpdate = (req, res, knex) => {
  const { id } = req.params;
  const { name, age, hobby } = req.body.formInput;
  knex("users")
    .where({ id })
    .update({ name })
    .then(resp => {
      if (resp) {
        res.json("success");
      } else {
        res.status(400).json("Unable to update");
      }
    })
    .catch(err => res.status(400).json("Error updating user"));
};

module.exports = {
  handleProfile: handleProfile,
  handleProfileUpdate
};
