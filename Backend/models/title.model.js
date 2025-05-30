import mongoose from "mongoose";

const titleSchema = mongoose.Schema({
        title: {
            type: "Schema",
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
}, {timestamps: true})

export default Title = mongoose.model("Title", titleSchema)