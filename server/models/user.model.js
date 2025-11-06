import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  avatar: String,
  role: {
    type: String,
    enum: ["user", "admin"], // allowed values
    default: "user", // default role
  },
});

export const UserSchema = mongoose.model("User", userSchema);
