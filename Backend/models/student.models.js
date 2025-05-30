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
      default: "",
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

    // studentName: {
    //   type: String,
    //   trim: true,
    // },
    // batch: {
    //   type: Number,
    //   trim: true,
    // },
    // department: {
    //   type: String,
    //   trim: true,
    // },
    // password: {
    //   type: String,
    //   trim: true,
    // },
  },
  { timestamps: true }
);

export default Student = mongoose.model("Student", studentScheam);
