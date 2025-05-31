import mongoose from "mongoose";

const studentScheam = new mongoose.Schema(
  {
    studentID: {
      type: String,
      required: true,
      trim: true,
    },
    signature: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudentSignature",
    },
    associate: [{
      groupName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
      },
      title: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Title"
      }
    }],

  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentScheam);

export default  Student