import { Internal } from "../utils/ErrorTypesCode.js";
import CustomError from "../utils/ErrorHandling.js"
import Report from "../models/report.models";
import Student from "../models/student.models.js";
import Group from "../models/group.models.js";
import Title from "../models/title.model.js";

export const createGroupMiddleware = (req, res, next) => {
    try {
        let { groupName = "", groupTypes = "", groupMembers = [], semister = "" } = req.body

        groupName = groupName.trim();
        groupTypes = groupTypes.trim();
        semister = semister.trim();

        if (!groupName || !groupTypes || !semister || groupMembers.length < 1) {
            throw new CustomError("All fields are required", 400, Internal)
        }

        const validGroupTypes = ["Thesis", "IDP"]

        const validSemister = ["1", "2", "3", "4", "5", "6", "7", "8"]

        if (!validSemister.includes(semister)) {
            throw new CustomError("Enter a valid semister", 400, Internal)
        }

        if (!validGroupTypes.includes(groupTypes)) {
            throw new CustomError("Enter a valid groupTypes", 400, Internal)
        }
        req.user = { groupName, groupTypes, groupMembers, semister }

        next()


    } catch (error) {
        next(error)
    }
}


function weekFinder(report) {
    let week = report.length

    if (report.length === 0) {
        week += 1;
    }
    return week
}

const createReportMiddleware = async (req, res, next) => {

    try {
        let { groupID = "", studentID = [], titleID = [] } = req.body;
        
        let report = await Report.find({ group: groupID }).lean();

        const {preevWeek = weekFinder(report) } = req.body;

        let group = await Group.findOne({ _id: groupID }).lean();
        let title = await Title.findOne({ _id: titleID }).lean();

        if (!groupID || !preevWeek || !studentID || !title) {
            throw new CustomError("All fields are required", 401, Internal)
        }

        if (!group) {
            throw new CustomError("Invalid group", 401, Internal)
        }

        if (!title) {
            throw new CustomError("Invalid group title", 401, Internal)
        }

        for (sID of studentID) {

            try {
                let student = Student.findOne({ _id: sID })

                if (!student) {
                    throw new CustomError("Invalid Student, please insert the correct student ID", 401, Internal)
                }
            } catch (error) {
                next(error)
            }

        }

        req.user = { groupID, preevWeek, studentID, title };

        next();

    } catch (error) {
        next(error)
    }

}

const updateGroupMiddleware = (req, res, next) => {
    let {groupID="", groupName = "", groupTypes = "", groupMembers = [], semister = ""} = req.body;

        groupID = groupID.trim();
        groupName = groupName.trim();
        groupTypes = groupTypes.trim();
        semister = semister.trim();

        if (!groupID || !groupName || !groupTypes || !semister || groupMembers.length < 1) {
            throw new CustomError("All fields are required", 400, Internal)
        }

        const validGroupTypes = ["Thesis", "IDP"]

        const validSemister = ["1", "2", "3", "4", "5", "6", "7", "8"]

        if (!validSemister.includes(semister)) {
            throw new CustomError("Enter a valid semister", 400, Internal)
        }

        if (!validGroupTypes.includes(groupTypes)) {
            throw new CustomError("Enter a valid groupTypes", 400, Internal)
        }

        req.user = {groupID, groupName, groupTypes, groupMembers, semister}

}