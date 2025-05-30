import mongoose from "mongoose";

const studentSignatureSchema = mongoose.Schema({
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    signature: {
        type: String,
        default: "",
    }
},{timestamps: true})

export default StudentSignature = mongoose.model("StudentSignature", studentSignatureSchema)