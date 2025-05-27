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
    batch: {
      type: Number,
      required: true,
      trim: true,
    },
    department: {
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
  { timestamps: true }
);

export default Student = mongoose.model("Student", studentScheam);
