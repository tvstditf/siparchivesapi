const mongoose = require("mongoose");

const CentreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: String,
      max: 15,
    },
    contactPerson: {
      type: String,
    },
    address: {
      type: String,
      min: 7,
    },
    tradeArea: {
      type: Array,
    },
    tools: {
      type: String,
    },
    equipment: {
      type: String,
    },
    numberOfInstructors: {
      type: String,
    },
    state: {
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
    assessedByTeamLeader: {
      type: String,
    },
    assessedByOfficer1: {
      type: String,
    },
    assessedByOfficer2: {
      type: String,
    },
    assessedByAOLeader: {
      type: String,
    },
    assessedByAOOfficer: {
      type: String,
    },
    yearAssessed: {
      type: String,
    },
    yearReAssessed: {
      type: String,
    },
    operationalStatus: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Centre", CentreSchema);
