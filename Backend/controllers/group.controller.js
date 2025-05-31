
import Group from "../models/group.models.js"
import CustomError from "../utils/ErrorHandling.js"
import { Internal, External } from "../utils/ErrorTypesCode.js"
import Report from "../models/report.models.js"
import Title from "../models/title.model.js"
import Student from "../models/student.models.js"
import Signature from "../models/signature.model.js"

export const allGroup = async (req, res, next) => {

    try {

        const { userID = "" } = req.user;

        if (!userID) {
            throw new CustomError("Please Login ", 401, Internal)
        }

        const groups = await Group.find({ supervisor: userID }).lean();

        return res.status(200).json({
            success: true,
            redirect: false,
            message: "",
            responseData: groups || [],
        })

    } catch (error) {
        next(error)
    }
}

export const groupReport = async (req, res, next) => {

    try {

        const { groupID } = req.body

        const { userID = "" } = req.user;

        if (!groupID) {
            throw new CustomError("Invalid Group", 404, Internal)
        }

        if (!userID) {
            throw new CustomError("Please Login ", 401, Internal)
        }

        const report = await Report.find({ supervisor: userID, group: groupID }).lean()

        return res.status(200).json({
            redirect: false,
            message: "",
            responseData: report || [],
        })

    } catch (error) {
        next(error)
    }
}

export const createGroup = async (req, res, next) => {

    try {

        const { groupName, groupTypes, gropMembers, semister } = req.user;

        const { userID } = req.user;

        let IDArray = [];
        let TitleArray = [];

         console.log("Test 2")

        for (let sID of gropMembers) {

            const createdStudent = await Student.create({
                studentID: sID,
            })

            const signature = await Signature.create({
                ID: createdStudent._id,
                signature: "",
            })

            createdStudent.signature = signature._id;

            await createdStudent.save();

            IDArray.push(createdStudent._id)
        }


        const titleOfGroup = await Title.create({
            title: groupName,
            studentID: IDArray,
            supervisor: userID
        })

        gropMembers.forEach((sID) => {

            TitleArray.push(titleOfGroup._id)
        })

        const createdGroup = await Group.create({
            supervisor: userID,
            group: titleOfGroup._id,
            groupMembers: IDArray,
            title: TitleArray,
            groupTypes: groupTypes,
            semister: semister

        })

        return res.status(200).json({
            redirect: false,
            message: "",
            responseData: createdGroup || [],
        })

    } catch (error) {
        next(error)
    }
}



