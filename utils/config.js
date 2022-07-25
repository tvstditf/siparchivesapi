require("dotenv").config();

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const PASS_SECRET_CRYPTOJS = process.env.PASS_SECRET_CRYPTOJS;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const JWT_RFR_SECRET_KEY = process.env.JWT_RFR_SECRET_KEY;
const SEND_GRID_API_KEY = process.env.SEND_GRID_API_KEY;
const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  MONGODB_URI,
  PORT,
  PASS_SECRET_CRYPTOJS,
  JWT_SECRET_KEY,
  JWT_RFR_SECRET_KEY,
  SEND_GRID_API_KEY,
  NODE_ENV,
};
