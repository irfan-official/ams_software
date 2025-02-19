import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
  {
    groupName: {
      type: String,
      required: true,
      trim: true,
    },
    gropMembers: [
      {
        typr: String,
        required: true,
        trim: true,
      },
    ],
    groupTypes: {
      enum: ["Thesis", "IDP"],
      default: "Thesis",
    },
  },
  { Timestamp: true }
);

const groups = mongoose.model("groups", groupSchema);
export default groups;
