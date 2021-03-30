import { createEventAdapter } from "@slack/events-api";
import { WebClient } from "@slack/web-api";
import feelings from "../elements/feelings.json"
import dropListMessage from "../helper/dropListMessage"
import dotenv from "dotenv";
import axios from "axios"

dotenv.config();
const web = new WebClient(process.env.SLACK_BOT_TOKEN);
const slackEvents = createEventAdapter(process.env.SLACK_SIGNING_SECRET);

export const listenForEvents = (app) => {
  app.use("/slack/events", slackEvents.requestListener());
}

slackEvents.on("app_mention", (event) => {
  console.log(
    `Received an app_mention event from user ${event.user} in channel ${event.channel}`
  );
  dropListMessage(event.channel, feelings);
  // respondToEvent(event.channel);
});

// All errors in listeners are caught here. If this weren't caught, the program would terminate.
slackEvents.on("error", (error) => {
  console.log(`error: ${error}`);
});


export const respondToEvent = async (channelId) => {
  try {
    await web.chat.postMessage({
      channel: channelId,
      text: "",
      attachments: [feelings],
    });
    console.log("Message posted!");
  } catch (error) {
    console.log(error);
  }
}
