const hobbies = {
  blocks: [
    {
      type: "section",
      block_id: "section678",
      text: {
        type: "mrkdwn",
        text: "What are your favorite hobbies?",
      },
      accessory: {
        action_id: "hobbies_list",
        type: "multi_static_select",
        placeholder: {
          type: "plain_text",
          text: "Select items",
        },
        options: [
          {
            text: {
              type: "plain_text",
              text: "Football",
            },
            value: "Football",
          },
          {
            text: {
              type: "plain_text",
              text: "Music",
            },
            value: "Music",
          },
          {
            text: {
              type: "plain_text",
              text: "Sleep",
            },
            value: "Sleep",
          },
          {
            text: {
              type: "plain_text",
              text: "Movies",
            },
            value: "Movies",
          },
          {
            text: {
              type: "plain_text",
              text: "Basketball",
            },
            value: "Basketball",
          },
        ],
      },
    },
  ],
};

export default hobbies;
