 const feelings = {
  "text": "Welcome. How are you doing?",
  "fallback": "Upgrade your Slack client to use messages like these.",
  "attachment_type": "default",
  "callback_id": "feelings",
  "actions": [
    {
      "name": "feelings_list",
      "text": "Tell me how are you",
      "type": "select",
      "options": [
        {
          "text": "Doing Well",
          "value": "doing_Well"
        },
        {
          "text": "Neutral",
          "value": "neutral"
        },
        {
          "text": "Feeling Lucky",
          "value": "feeling_lucky"
        }
      ]
    }
  ]
}
export default feelings;
