import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {},
  email: {},
  password: {},
  teacher
}, { Timestamp: true });

const user = mongoose.model("user", userSchema);

export default user;
