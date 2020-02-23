const handleSignin = (knex, bcrypt) => (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json("incorrect form submission");
  }
  knex
    .select("email", "hash")
    .from("login")
    .where("email", "=", email)
    .then(data => {
      console.log(data[0]);
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        knex
          .select("*")
          .from("users")
          .where("email", "=", email)
          .then(user => {
            res.json(user[0]);
          })
          .catch(err => res.status(400).json("unable to get user"));
      } else {
        res.status(400).json("wrong credentials");
      }
    })
    .catch(err => res.status(400).json(err));
};

module.exports = {
  handleSignin: handleSignin
};
