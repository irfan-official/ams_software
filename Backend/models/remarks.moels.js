import mongoose from "mongoose"

const remarksSchema = mongoose.Schema({
    groupName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
    },
    studentID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    },
    supervisor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Supervisor"
    },
    remarks: {
        type: String,
        trim: true,
    }
}, {timestamps: true})

export default Remarks = ("Remarks", remarksSchema)