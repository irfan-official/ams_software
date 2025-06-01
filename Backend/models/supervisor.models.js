import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import { Internal, External } from "../utils/ErrorTypesCode.js";
import CustomError from "../utils/ErrorHandling.js"

const supervisorSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    groups: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
  }],
    dept: {
      type: String,
      enum:["CSE", "EEE", "ICE", "ME", "BBA", "LAW", "ENG"],
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { Timestamp: true }
);


supervisorSchema.pre('save', async function (next) {
  try {
   
    if (!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();

  } catch (err) {
    next(new CustomError("Internal server Error", 500, External)); 
  }
});

supervisorSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (err) {
    throw new CustomError("Password comparison failed", 400, Internal)
  }
};

const Supervisor = mongoose.model("Supervisor", supervisorSchema);

export default Supervisor;