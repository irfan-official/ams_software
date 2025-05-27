import mongoose from "mongoose";

const createPageSchema = mongoose.Schema({
  semister: {
    type: Number,
    trim: true,
    required: true,
  },
  lastWeek: {
    type: Number,
    trim: true,
    required: true,
  },
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      trim: true,
      required: true,
    },
  ],
});

export const CreatePage = mongoose.model("CreatePage", createPageSchema);
