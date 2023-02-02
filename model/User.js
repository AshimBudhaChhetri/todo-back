import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true, //should always present
      maxlength: 32, //maximum length
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    //todoList: {
    //type: Array,
    //default: [],
    // },
  },
  { timespams: true }
);

const user = mongoose.model("User", userSchema);

export default user;
