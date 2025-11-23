import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";
import Visit from "./models/Visit.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((e) => console.log("Mongo Error:", e));

async function getIpLocation(ip) {
  try {
    const { data } = await axios.get(`https://ipapi.co/${ip}/json/`);
    return data;
  } catch {
    return { error: "IP lookup failed" };
  }
}

app.post("/api/collect", async (req, res) => {
  let clientIp =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket.remoteAddress;

  const ipLocation = await getIpLocation(clientIp);

  const visit = new Visit({
    ip: clientIp,
    browser: req.body.browser,
    os: req.body.os,
    device: req.body.device,
    screenWidth: req.body.screenWidth,
    screenHeight: req.body.screenHeight,
    timezone: req.body.timezone,
    preciseLocation: req.body.preciseLocation,
    ipLocation,
    headers: req.headers
  });

  await visit.save();
  res.json({ status: "ok" });
});

app.get("/api/visits", async (req, res) => {
  const data = await Visit.find().sort({ createdAt: -1 });
  res.json(data);
});


app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});
