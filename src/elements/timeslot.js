const timeslot = {
  "text": "when are you free this week for a walk?",
  "fallback": "Upgrade your Slack client to use messages like these.",
  "color": "#3AA3E3",
  "attachment_type": "default",
  "callback_id": "timeslot",
  "actions": [
    {
      "name": "time_slot_list",
      "text": "when are you free?",
      "type": "select",
      "options": [
        {
          "text": "12:00, 12.30",
          "value": "12:00, 12.30"
        },
        {
          "text": "12.30, 13.00",
          "value": "12.30, 13.00"
        },
        {
          "text": "13.00, 13.30",
          "value": "13.00, 13.30"
        },
        {
          "text": "13.30, 14.00",
          "value": "13.30, 14.00"
        },
        {
          "text": "14.00, 14.30",
          "value": "14.00, 14.30"
        },
        {
          "text": "14.30, 15.00",
          "value": "14.30, 15.00"
        },
        {
          "text": "15.00, 15.30",
          "value": "15.00, 15.30"
        },
        {
          "text": "15.30, 16.00",
          "value": "15.30, 16.00"
        },
        {
          "text": "16.00, 16.30",
          "value": "16.00, 16.30"
        },
        {
          "text": "16.30, 17.00",
          "value": "16.30, 17.00"
        },
        {
          "text": "17.00, 17.30",
          "value": "17.00, 17.30"
        },
        {
          "text": "17.30, 18.00",
          "value": "17.30, 18.00"
        }
      ]
    }
  ]
}
module.exports = timeslot;
