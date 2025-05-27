import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
  {
    supervisor: {
      type: mongoose.model.Schema.Types,
      ref: "Teacher",
    },
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    gropMembers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
        trim: true,
      },
    ],
    groupTypes: {
      enum: ["Thesis", "IDP"],
      required: true,
    },
    groupTitle: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { Timestamp: true }
);

const Group = mongoose.model("Group", groupSchema);
export default Group;
