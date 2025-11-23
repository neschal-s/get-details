import mongoose from "mongoose";

const visitSchema = new mongoose.Schema({
  ip: String,
  browser: String,
  os: String,
  device: String,
  screenWidth: Number,
  screenHeight: Number,
  timezone: String,
  preciseLocation: Object,
  ipLocation: Object,
  headers: Object,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("visit", visitSchema);
