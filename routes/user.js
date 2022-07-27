const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndDeskOfficer,
  verifyTokenAndAdmin,
} = require("../utils/verifyToken");

//Update User
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Delete User
router.delete("/:id", verifyTokenAndDeskOfficer, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User Information has been deleted");
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get User
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all Users
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
