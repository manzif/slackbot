import "regenerator-runtime";
// import "@babel/polyfill";
import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { listenForEvents } from "./controllers/events";
import { listenForInteractions } from "./controllers/interactions";
import usersInfo from "./api/userInfo";

dotenv.config();
const app = express();
listenForEvents(app);
listenForInteractions(app);
app.use(cors());

const DB_URL =
  process.env.NODE_ENV === "TEST"
    ? process.env.MONGODB_URL_TEST
    : process.env.MONGODB_URL;
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.use("/slack", usersInfo.getUsersInfo);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Bot running at ${port}`);
});

export default app;
