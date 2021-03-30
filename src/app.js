import "babel-polyfill";
import express from "express";
import logger from "morgan";
import bodyParser from "body-parser";
import routes from "./routes";
import dotenv from "dotenv";
import cors from "cors";
import { listenForEvents } from "./controllers/events";
import { listenForInteractions } from "./controllers/interactions";
import { listenForCommands } from "./controllers/slashCommand";

dotenv.config();
const app = express();
listenForEvents(app);
listenForInteractions(app);
listenForCommands(app);
app.use(cors());

app.use(logger("dev")); // log requests to the console
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Bot running at ${port}`);
});

