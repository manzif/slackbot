import { Schema, model } from "mongoose";

const usersSchema = new Schema({
  username: {
    type: String,
    required: [true, "user id is required"]
  },
  feelings: {
    type: String,
    required: [true, "name is required"],
  },
  availableAt: {
    type: String
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const Users = model("Users", usersSchema);

export default Users;
