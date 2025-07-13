import mongoose from "mongoose";

const studentScheam = new mongoose.Schema(
  {
    studentID: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    name: {
      type: String,
      default: "",
      trim: true,
    },

    semister: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
      required: true,
      trim: true,
    },

    department: {
      type: String,
      enum: ["CSE", "EEE", "ICE", "ME", "BBA", "ENG", "LAW"],
      required: true,
    },

    signature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Signature",
    },
    associateGroups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
      },
    ],
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentScheam);

export default Student;
