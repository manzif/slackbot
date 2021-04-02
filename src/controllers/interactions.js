import { createMessageAdapter } from "@slack/interactive-messages";
import timeslot from "../elements/timeslot";
import hobbies from "../elements/hobbies";
import dotenv from "dotenv";
import UserInfo from "../database/model/user";

dotenv.config();

let userData = {
  username: "",
  feelings: "",
  availableAt: "",
  hobbies: [],
};

const slackInteractions = createMessageAdapter(
  process.env.SLACK_SIGNING_SECRET
);
export const listenForInteractions = (app) => {
  app.use("/interactions", slackInteractions.requestListener());
};

// respond to type select
slackInteractions.action(
  { type: "multi_static_select" },
  (payload, respond) => {
    return respondToSelectDropdown(payload, respond);
  }
);

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
    return respondWithTheThirdQuestion(respond);
  } else if (payload.actions[0].action_id === "hobbies_list") {
    const values = payload.actions[0].selected_options;
    // loop through the selected options to retain the values
    for (let i = 0; i < values.length; i++) {
      // push the values into hobbies
      userData.hobbies.push(values[i].value);
    }
    // Check if the user already exists
    const findUser = await UserInfo.findOne({ username: payload.user.name });
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

const respondWithTheThirdQuestion = (respond) => {
  respond({
    text: "",
    attachments: [hobbies],
    replace_original: true,
  });
};
