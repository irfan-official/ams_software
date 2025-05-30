import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
  {
    supervisor: {
      type: mongoose.model.Schema.Types,
      ref: "Teacher",
      required: true,
    },
    groupName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Title",
      required: true
    },
    gropMembers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    }],

    title: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Title",
      },
    ],

    groupTypes: {
      enum: ["Thesis", "IDP"],
      required: true,
    },
    semister: {
      type: String,
      enum: ["1", "2", "3", "4", "5", "6", "7", "8"],
      required: true,
      trim: true,
    },
  },
  { Timestamp: true }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
