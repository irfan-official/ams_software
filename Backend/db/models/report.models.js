import mongoose from "mongoose";

const reportModel = new mongoose.Schema(
  {
    week: {
      type: Number,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
      trim: true,
    },
    present: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        status: Boolean,
      },
    ],
  },
  { timestamps: true }
);

export default Report = mongoose.model("Report", reportModel);
