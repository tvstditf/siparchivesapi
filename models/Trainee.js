const mongoose = require("mongoose");

const TraineeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
    },
    profilePicture: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
    },
    gender: {
      type: String,
    },
    disability: {
      type: Boolean,
      default: false,
    },
    disabilityType: {
      type: String,
    },
    address: {
      type: String,
      min: 7,
    },
    sip: {
      type: String,
    },
    tradeArea: {
      type: String,
    },
    state: {
      type: String,
    },
    centreId: {
      type: String,
    },
    year: {
      type: String,
    },
    bank: {
      type: String,
    },
    accountNumber: {
      type: String,
    },
    bvn: {
      type: String,
    },
    nationality: {
      type: String,
    },
    town: {
      type: String,
    },
    localGovernmentArea: {
      type: String,
    },
    educationalBackground: {
      type: String,
    },
    nextOfkin: {
      type: String,
    },
    maritalStatus: {
      type: String,
    },
    guarantor: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Trainee", TraineeSchema);
