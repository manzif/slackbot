import { Message, Blocks, Elements } from "slack-block-builder";

const myHobbies = () => {
  console.log('\n\n\n', "multiselect")
  return Message()
    .blocks(
      Blocks.Section({
        text: "What are the first 3 digits on the number scale?",
      }),
      Blocks.Divider(),
      Blocks.Actions().elements(
        Elements.Button({
          text: "Sure One Does",
          actionId: "gotClicked",
        }).danger(),
        Elements.Button({
          text: "One Does Not",
          actionId: "scaredyCat",
        }).primary()
      )
    )
    .asUser()
    .buildToJSON();
};
export default myHobbies;
