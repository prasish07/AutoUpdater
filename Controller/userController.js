const User = require("../model/user");
const cron = require("node-cron");

const updateDb = async (id) => {
  const names = [
    "Alice",
    "Bob",
    "Charlie",
    "David",
    "Emily",
    "Frank",
    "Gina",
    "Harry",
    "Isabel",
    "John",
  ];
  const randomIndex = Math.floor(Math.random() * names.length);
  const randomName = names[randomIndex];
  const user = await User.findById(id);
  user.name = randomName;
  user.number = user.number + 1;
  await user.save();
};

const createUser = async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(200).json({ msg: user });
  } catch (error) {
    res.status(500).send({ message: "Error in creating user" });
  }
};

const update = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    automaticUpdate(req.params.id);
    const updateUser = await User.findById(req.params.id);
    res.status(200).json({ msg: updateUser });
  } catch (error) {
    res.send("error");
  }
};

const automaticUpdate = (id) => {
  cron.schedule("10,30,50 * * * * *", () => {
    updateDb(id);
    console.log("database updated");
  });
};

module.exports = { createUser, updateDb, update };
