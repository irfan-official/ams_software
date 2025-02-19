import mongoose from "mongoose";

const studentScheam = new mongoose.Schema(
  {
    studentID: {
      type: String,
      required: true,
      trim: true,
    },
    studentName: {
      type: String,
      required: true,
      trim: true,
    },
    couseType: {
      type: String,
      required: true,
      trim: true,
      enum: ["Thesis", "IDP"],
    },
  },
  { timestamps: true }
);

export default Student = mongoose.model("Student", studentScheam);
