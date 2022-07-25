const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 20,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 8,
    },
    phoneNumber: {
      type: String,
      required: true,
      max: 15,
      unique: true,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    //Authentication and Authorization Schema Code
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isMgt: {
      type: Boolean,
      default: false,
    },
    isAO: {
      type: Boolean,
      default: true,
    },
    isDeskOfficer: {
      type: Boolean,
      default: false,
    },

    //Communication Code
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
