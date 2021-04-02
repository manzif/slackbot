import "regenerator-runtime";
import "babel-polyfill";
import express from "express";
import logger from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import { listenForEvents } from "./controllers/events";
import { listenForInteractions } from "./controllers/interactions";
import usersInfo from "./api/userInfo";

dotenv.config();
const app = express();
listenForEvents(app);
listenForInteractions(app);
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });
app.use(logger("dev")); // log requests to the console
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(routes);
app.use("/slack", usersInfo.getUsersInfo);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Bot running at ${port}`);
});

export default app;
