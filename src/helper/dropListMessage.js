import dotenv from "dotenv";
import { WebClient } from "@slack/web-api";
import axios from "axios";

dotenv.config();
const web = new WebClient(process.env.SLACK_BOT_TOKEN);

const respondToEvent = async (channelId, data) => {
  try {
    await web.chat.postMessage({
      channel: channelId,
      text: "",
      attachments: [data],
    });
    console.log("Message posted!");
  } catch (error) {
    console.log(error);
  }
};

export default respondToEvent;
