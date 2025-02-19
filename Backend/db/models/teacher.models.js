import mongoose from "mongoose";

const teacherSchema = mongoose.Schema(
  {
    name: {
      type: String,
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
    teacher,
  },
  { Timestamp: true }
);

export default Teacher = mongoose.model("Teacher", teacherSchema);
