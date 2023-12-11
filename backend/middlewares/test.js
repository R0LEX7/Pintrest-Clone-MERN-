const mongoose = require("mongoose");
const User = require("../models/user.model");

const testFun = async (req, res) => {
  try {
    const userData = await User.find();
    res.send(userData);
  } catch (error) {
    console.log("Internal error: " + error);
    res.json({ error: "Internal error: " + error });
  }
};

const testCreate = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const userData = await User.create({ name, email, password });
      res.status(200).send(userData);
    } catch (error) {
      console.log("Internal POST error: " + error);
      res.status(500).json({ error: "Internal POST error: " + error });
    }
  };
  

module.exports = {
  testFun,
  testCreate
};
