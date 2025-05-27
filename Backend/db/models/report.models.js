import mongoose from "mongoose";

const reportModel = new mongoose.Schema(
  {
    week: {
      type: Number,
      required: true,
      trim: true,
    },
    Date: {
      type: Date,
      required: true,
      trim: true,
    },
    studentID: [
      {
        type: String,
        required: true,
        trim: true,
      },
    ],
    studentSignature: [
      {
        type: String,
        defaullt: "",
        trim: true,
      },
    ],
    supervisorComments: [
      {
        type: String,
        defaullt: "",
        trim: true,
      },
    ],
    remarks: [
      {
        type: String,
        defaullt: "",
        trim: true,
      },
    ],
  },
  { timestamps: true }
);

export default Report = mongoose.model("Report", reportModel);
