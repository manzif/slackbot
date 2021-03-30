import { createMessageAdapter } from "@slack/interactive-messages";
import articleOrBookButton from "../elements/articleOrBookButton.json";
import dropListMessage from "../helper/dropListMessage";
import timeslot from "../elements/timeslot.json";
import { respondToEvent } from "./events";
import respondToButtons  from "./respondToButtons"
import dotenv from "dotenv";

dotenv.config();
const slackInteractions = createMessageAdapter(process.env.SLACK_SIGNING_SECRET);

export const listenForInteractions = (app) => {
  app.use("/interactions", slackInteractions.requestListener());
}

// respond to type select
slackInteractions.action({ type: 'select' }, (payload, respond) => {
  return respondToSelectDropdown(payload, respond);
})

// respond to type button
slackInteractions.action({ type: "button" }, (payload, respond) => {
  respondToButtons.respond(payload, respond);
});

const respondToSelectDropdown = (payload, respond) => {
  const selectedOption = payload.actions[0].selected_options[0].value
  const userInf0 = []
  console.log("\n\n\n", payload.callback_id);
  if (payload.callback_id === 'feelings') {
    userInf0.push({username: payload.user.name, feelings: selectedOption});
    return dropListMessage(payload.channel.id, timeslot);
   } else if (payload.callback_id === "timeslot") {
     userInf0.push({ timeslot: selectedOption });
     console.log("\n\n\n", userInf0);
   }
  // Return a replacement message
  return { text: 'Processing...' }
}

const respondWithArticleOrBookNoButton = (text, callbackId, respond) => {
  articleOrBookButton.callback_id = callbackId
  articleOrBookButton.text = 'Do you prefer an article or a book?'
  respond({
    text: text,
    attachments: [articleOrBookButton],
    replace_original: true
  })
}
