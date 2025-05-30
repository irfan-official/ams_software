import mongoose from "mongoose";

const representSchema = mongoose.Schema({
  studentID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  studentName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
  },
  couseType: {
    type: String,
    required: true,
    trim: true,
    enum: ["Thesis", "IDP"],
  },
  title: {
    type: String,
    trim: true,
  },
});

export const Represent = mongoose.model("Represent", representSchema);
