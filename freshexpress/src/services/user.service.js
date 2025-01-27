const db = require("../models/index.js");
const { user: User } = db;

const newUser = new User({ req, res });
const user = await newUser(req.body);
user.save();
res.send({ status: 200 });

module.exports = {
  newUser,
};
