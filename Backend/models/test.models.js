import mongoose from "mongoose"

const studentSchema = mongoose.Schema({
    groupName: {},
    studentName: {},
    studentID: {},
    title: {},

},{timestamps: true})


export default Student = mongoose.model("Student", studentSchema)