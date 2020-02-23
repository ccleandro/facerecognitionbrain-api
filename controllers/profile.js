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

module.exports = {
  handleProfile: handleProfile
};
