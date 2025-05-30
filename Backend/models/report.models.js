import mongoose from "mongoose";

const reportModel = new mongoose.Schema(
  {
    groupName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group", // reffer to the groupName
      required: true,
    },

    week: {
      type: Number,
      default: 1,
      required: true,
      trim: true,
    },

    date: {
      type: String,
      default: (new Date()).toLocaleDateString('en-GB'),
      required: true,
      trim: true,
    },

    studentID: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student", //reffer to the Student studentID
      required: true,
    }],

    studentSignature: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "StudentSignature",
      },
    ],

    title: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Title",
        required: true,
      }
    ],

    supervisorComments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: true,
      },
    ],
    remarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Remarks",
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export default Report = mongoose.model("Report", reportModel);
