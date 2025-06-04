import mongoose from "mongoose"

const commentSchema = mongoose.Schema({
    group: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group",
        required: true,
    },
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supervisor",
        required: true,
    },
    comment: {
        type: String,
        trim: true,
        default: "",
    }
}, {timestamps: true})

const Comment = mongoose.model("Comment", commentSchema)

export default Comment