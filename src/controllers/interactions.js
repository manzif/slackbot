import { createMessageAdapter } from "@slack/interactive-messages";
import timeslot from "../elements/timeslot";
import dotenv from "dotenv";
import UserInfo from "../database/model/user";

dotenv.config();

let userData = {
  username: "",
  feelings: "",
  availableAt: "",
};

const slackInteractions = createMessageAdapter(
  process.env.SLACK_SIGNING_SECRET
);
export const listenForInteractions = (app) => {
  app.use("/interactions", slackInteractions.requestListener());
};

// respond to type select
slackInteractions.action({ type: "select" }, (payload, respond) => {
  return respondToSelectDropdown(payload, respond);
});

const respondToSelectDropdown = async (payload, respond) => {
  const selectedOption = payload.actions[0].selected_options[0].value;
  if (payload.callback_id === "feelings") {
    userData.username = payload.user.name;
    userData.feelings = selectedOption;
    return respondWithTheSecondQuestion(respond);
  } else if (payload.callback_id === "timeslot") {
    userData.availableAt = selectedOption;
    // Check if the user already exists
    const findUser = await UserInfo.findOne({ username: payload.user.name})
    if (findUser) {
      //Update the user info
      await findUser.updateOne(userData);
      return { text: "Thank you" };
    }
    await UserInfo.create(userData);

    return { text: "Thank you" };
  }
  // Return a replacement message
  return { text: "Processing..." };
};

const respondWithTheSecondQuestion = (respond) => {
  respond({
    text: "",
    attachments: [timeslot],
    replace_original: true,
  });
};
