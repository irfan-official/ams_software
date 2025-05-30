import mongoose from "mongoose";

const supervisorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    dept: {
      type: String,
      enum:["CSE", "EEE", "ICE", "ME", "BBA", "LAW", "ENG"],
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { Timestamp: true }
);

export default Supervisor = mongoose.model("Supervisor", supervisorSchema);
