
import Group from "../models/group.models.js"
import CustomError from "../utils/ErrorHandling.js"
import { Internal, External } from "../utils/ErrorTypesCode.js"
import Report from "../models/report.models.js"
import Title from "../models/title.model.js"
import Student from "../models/student.models.js"
import Signature from "../models/signature.model.js"
import Supervisor from "../models/supervisor.models.js"
import Comment from "../models/comment.model.js"
import Remarks from "../models/report.models.js"

export const allGroup = async (req, res, next) => {

    try {

        const { userID } = req.userID;

        if (!userID) {
            throw new CustomError("Please Login ", 401, Internal)
        }

        const groups = await Group.find({ supervisor: userID }).lean();

        return res.status(200).json({
            success: true,
            message: "",
            responseData: groups || [],
        })

    } catch (error) {
        next(error)
    }
}

export const createGroup = async (req, res, next) => {

    try {

        const { groupName, groupTypes, groupMembers, semister } = req.user;

        const { userID } = req.userID;

        let IDArray = [];
        let TitleArray = [];

        for (let sID of groupMembers) {

            const checkPresenceStudent = await Student.findOne({ studentID: sID })

            if (!checkPresenceStudent) {
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
            } else {
                IDArray.push(checkPresenceStudent._id)
            }
        }

        const titleOfGroup = await Title.create({
            title: groupName,
            groupTypes: groupTypes,
            studentID: IDArray,
            supervisor: userID
        })

        groupMembers.forEach((sID) => {

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

        await Supervisor.findByIdAndUpdate(
            userID,
            { $push: { groups: createdGroup._id } },
            { new: true }
        );

        for (let sID of IDArray) {
            await Student.findByIdAndUpdate(sID,
                { $push: { associate: {groupName: createdGroup._id, title: createdGroup._id} } },
                { new: true }
            )
        }

        const populatedGroup = await Group.findById(createdGroup._id)
            .populate([
                {
                    path: "title",
                    select: "title"
                },
                {
                    path: "group",
                    select: "title"
                },
                {
                    path: "supervisor",
                    select: "name"
                }
            ])
            .populate({
                path: "groupMembers",
                select: "studentID"
            });

        return res.status(200).json({
            success: true,
            message: `Group ${populatedGroup.group.title} created Successfully`,
            responseData: populatedGroup || [],
        })

    } catch (error) {
        next(error)
    }
}

export const updateGroup = async (req, res, next) => {

    try {
        const { groupID, groupTypes, groupMembers, semister } = req.body;

        const { userID } = req.userID;

        const updatedGroup = await Group.findByIdAndUpdate(
            groupID,
            {
                groupTypes,
                groupMembers,
                semister,
            },
            { new: true } // returns the updated document
        );

        return res.status(200).json({
            success: true,
            message: "Group update successfully",
            responseData: updatedGroup,
        })
    } catch (error) {
        next(error)
    }

}

export const groupReport = async (req, res, next) => {

    try {

        const { groupID } = req.body

        const { userID } = req.userID;

        if (!groupID) {
            throw new CustomError("Invalid Group", 404, Internal)
        }

        if (!userID) {
            throw new CustomError("Please Login ", 401, Internal)
        }

        const report = await Report.find({ supervisor: userID, group: groupID }).populate([
            {
                path: "group",
                select: "group",
                populate: {
                    path: "group",
                    select: "title groupTypes"
                }
            }, {
                path: "supervisor",
                select: "name"
            }, {
                path: "studentID",
                select: "studentID"
            }, {
                path: "studentSignature",
                select: "ID signature",
                populate: { path: "ID", select: "studentID" }
            }, {
                path: "title",
                select: "studentID title courseType",
                populate: { path: "studentID", select: "studentID" }
            }, {
                path: "supervisorComments",
                select: "studentID comment",
                populate: { path: "studentID", select: "studentID" }
            }, {
                path: "remarks",
                select: "studentID remarks",
                populate: { path: "studentID", select: "studentID" }
            },
        ])

        let responseData2 = [];

        for (let {studentID, title, groupTypes} of report.title) {

            let student = await Student.findOne({studentID: sTD})

            topArr.push(
                {
                    "studentID": studentID,
                    "studentName": student.name,
                    "courseType": groupTypes,
                    "title": title
                }
            )
        }


        if (!report) {
            throw new CustomError("No group exist", 404, Internal)
        }

        return res.status(200).json({
            success: true,
            message: "",
            responseData1: report || [],
            responseData2: responseData2 || [],
        })

    } catch (error) {
        next(error)
    }
}

export const createReport = async (req, res, next) => {

    try {
        const { groupID, preevWeek, studentID, title } = req.user

        const { userID } = req.userID;

        let SignatureArray = [];
        let CommentArray = [];
        let RemarksArray = [];

        for (sID of studentID) {

            let signature = await Signature.findOne({ ID: sID });
            SignatureArray.push(signature)

            let comments = await Comment.create({
                group: groupID,
                studentID: sID,
                supervisor: userID,
                comment: "",
            })

            CommentArray.push(comments._id)

            let remarks = await Remarks.create({
                group: groupID,
                studentID: sID,
                supervisor: userID,
                remarks: ""
            })

            RemarksArray.push(remarks._id)
        }

        const createdReport = await Report.create({
            group: groupID,
            supervisor: userID,
            week: preevWeek || 1111,
            date: (new Date()).toLocaleDateString('en-GB'),
            studentID: studentID,
            studentSignature: SignatureArray,
            title: title,
            supervisorComments: CommentArray,
            remarks: RemarksArray,
        })

        if (!createReport) {
            throw new CustomError("Internal server Error", 500, External)
        }

        return res.status(201).json({
            success: true,
            message: "Created a report successfully!",
            responseData: createdReport
        })
    } catch (error) {
        next(error)
    }
}

export const updateReport = async (req, res, next) => {

    try {

        const { userID } = req.userID;
        const { groupID } = req.body;

        const checkGroup = await Report.findOne({ _id: groupID, supervisor: userID })

        if (!checkGroup) {
            throw new CustomError("Invalid Group", 401, External)
        }

        const {
            week = checkGroup.week,
            date = checkGroup.date,
            studentID = checkGroup.studentID,
            studentSignature = checkGroup.studentSignature,
            title = checkGroup.title,
            supervisorComments = checkGroup.supervisorComments,
            remarks = checkGroup.remarks
        } = req.body


        const updatedGroup = await Report.findByIdAndUpdate(
            groupID,
            {
                week: week,
                date: date,
                studentID: studentID,
                studentSignature: studentSignature,
                title: title,
                supervisorComments: supervisorComments,
                remarks: remarks,
            },
            { new: true }
        );

        const allReport = await Report.find({ _id: groupID, supervisor: userID })

        return res.status(200).json({
            success: true,
            message: "Update successfully",
            responseData: allReport,
        })

    } catch (error) {
        next(error)
    }
}




