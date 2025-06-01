import mongoose from "mongoose";
import Group from "./group.models";

const titleSchema = mongoose.Schema({
    title: {
        type: "String",
        required: true,
        trim: true,
    },
    groupTypes: {
        type: "String",
        required: true,
        trim: true,
    },
    studentID: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    }],
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supervisor",
        required: true,
    },
}, { timestamps: true })

const Title = mongoose.model("Title", titleSchema)
export default Title