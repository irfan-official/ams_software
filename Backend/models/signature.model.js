import mongoose from "mongoose";

const signatureSchema = mongoose.Schema({
    ID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    reportID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Report",
    },
    signature: {
        type: String,
        trim: true,
    }
},{timestamps: true})

const Signature = mongoose.model("Signature", signatureSchema)
export default  Signature