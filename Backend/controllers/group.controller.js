
import Group from "../models/group.models.js"
import CustomError from "../utils/ErrorHandling.js"
import { Internal, External } from "../utils/ErrorTypesCode.js"
import Report from "../models/report.models.js"
import Title from "../models/title.model.js"
import Student from "../models/student.models.js"
import Signature from "../models/signature.model.js"
import Supervisor from "../models/supervisor.models.js"
import Comment from "../models/comment.model.js"
import Remarks from "../models/remarks.moels.js"


export const allGroup = async (req, res, next) => {

    try {

        const { userID } = req.userID;

        if (!userID) {
            throw new CustomError("Please Login ", 401, Internal)
        }

        const groups = await Group.find({ supervisor: userID })
            .populate([
                {
                    path: "group",
                    select: "title"
                },
                {
                    path: "supervisor",
                    select: "name"
                },
                {
                    path: "title.student",
                    select: "name studentID"
                },
                {
                    path: "title.title",
                    select: "title"
                }
            ])
            .populate({
                path: "groupMembers",
                select: "studentID"
            }).lean()

        return res.status(200).json({
            success: true,
            message: "",
            responseData: groups || [],
            userID: userID
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

            if (!sID) {
                throw new CustomError("groupMembers are required", 401, Internal)
            }

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

        for (let _id of IDArray) {
            TitleArray.push({
                student: _id,
                title: titleOfGroup._id
            })
        }

        const createdGroup = await Group.create({
            supervisor: userID,
            group: titleOfGroup._id,
            groupMembers: IDArray,
            title: TitleArray,
            groupTypes: groupTypes,
            semister: semister

        })

        titleOfGroup.connectedGroup = createGroup._id;
        titleOfGroup.save();

        await Supervisor.findByIdAndUpdate(
            userID,
            { $push: { groups: createdGroup._id } },
            { new: true }
        );

        for (let sID of IDArray) {
            await Student.findByIdAndUpdate(sID,
                { $push: { associate: { groupName: createdGroup._id, title: createdGroup._id } } },
                { new: true }
            )
        }

        const populatedGroup = await Group.findById(createdGroup._id)
            .populate([
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
        const { groupID, groupName, groupTypes, groupMembers, semister } = req.user;

        console.log("updateGroup == > ", req.user)

        const { userID } = req.userID;

        const group = await Group.findOne({ _id: groupID }).populate({
            path: "group",
            select: "title"
        })

        if (!group) {
            throw new CustomError("Invalid group", 401, External)
        }

        let sIDArray = []
        let TitleArray = [];

        for (let sID of groupMembers) {

            let checkStudent = await Student.findOne({ studentID: sID })

            if (!checkStudent) {
                const createdStudent = await Student.create({
                    studentID: sID,
                })

                const signature = await Signature.create({
                    ID: createdStudent._id,
                    signature: "",
                })

                createdStudent.signature = signature._id;

                await createdStudent.save();

                sIDArray.push(createdStudent._id)

                TitleArray.push({
                    student: createdStudent._id,
                    title: group.group.title
                })
            } else {

                let findTitle = group.title.filter((obj) => {
                    return obj.student.toString() === checkStudent._id.toString()
                })

                sIDArray.push(checkStudent._id)
                TitleArray.push({
                    student: checkStudent._id,
                    title: findTitle[0].title
                })
            }
        }


        const updatedGroup = await Group.findByIdAndUpdate(
            groupID,
            {
                groupTypes,
                groupMembers: sIDArray,
                title: TitleArray,
                semister,
            },
            { new: true } // returns the updated document
        );

        const updatedTitle = await Title.findByIdAndUpdate(updatedGroup.group, {
            title: groupName,
            groupTypes,
            studentID: sIDArray,
        })

        return res.status(200).json({
            success: true,
            message: "Group update successfully",
            responseData: updatedGroup,
        })
    } catch (error) {
        next(error)
    }

}

export const deleteGroup = async (req, res, next) => {

    try {
        const { groupID } = req.body;

        const { userID } = req.userID

        console.log("req.body ==> ", req.body)

        const group = await Group.findOne({ _id: groupID }).populate({
            path: "group",
            select: "title"
        })

        await Report.deleteMany({ group: groupID });

        await Title.deleteMany({ _id: group.group._id })

        await Comment.deleteMany({ group: groupID })

        await Remarks.deleteMany({ group: groupID })

        const updatedSupervisor = await Supervisor.findOneAndUpdate(
            { _id: userID },
            {
                $pull: {
                    groups: groupID,
                },
            },
            { new: true } // return the updated document
        );

        await Group.findByIdAndDelete(groupID);

        await Student.updateMany(
            {
                $or: [
                    { "associate.groupName": groupID },
                    { "associate.title": groupID }
                ]
            },
            {
                $pull: {
                    associate: {
                        $or: [
                            { groupName: groupID },
                            { title: groupID }
                        ]
                    }
                }
            }
        );

        const groups = await Group.find({ supervisor: userID })

        return res.status(200).json({
            success: true,
            responseData: groups,
            message: `${group.group.title || "Group"} deleted`
        })
    } catch (error) {
        next(error)
    }
}

async function findReport(userID, groupID) {
    let obj = await Report.find({ supervisor: userID, group: groupID }).populate([
        {
            path: "group",
            select: "group",
            populate: {
                path: "group",
                select: "title groupTypes"
            }
        },
        {
            path: "supervisor",
            select: "name"
        },
        {
            path: "studentID",
            select: "studentID"
        },
        {
            path: "studentSignature.studentID",
            select: "studentID name"
        },
        {
            path: "studentSignature.signature",
            select: "ID signature",
        },
        {
            path: "title.studentID",
            select: "studentID name"
        },
        {
            path: "title.title",
            select: "title courseType",
        },
        {
            path: "present.studentID",
            select: "studentID name"
        },
        {
            path: "supervisorComments.studentID",
            select: "studentID name"
        },
        {
            path: "supervisorComments.comment",
            select: "comment",
        },
        {
            path: "remarks.studentID",
            select: "studentID name"
        },
        {
            path: "remarks.remarks",
            select: "remarks",
        },
    ])
    return obj
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

        const group = await Group.findOne({ _id: groupID }).populate([
            {
                path: "title.student",
                select: "studentID name"
            }, {
                path: "title.title",
                select: "title"
            }
        ])

        const report = await findReport(userID, groupID) //////////////////////////////////////////////////////

        let responseData2 = [];

        for (let { student, title, } of group.title) {

            responseData2.push(
                {
                    "studentID": student.studentID,
                    "studentName": student.name,
                    "courseType": group.groupTypes,
                    "title": title.title
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

function weekFinder(length) {
    let week = length

    if (length === 0) {
        week += 1;
    }
    return week
}

export const TestcreateReport = async (req, res, next) => {
    try {
        const { groupID } = req.body;

        const { userID } = req.userID;

        const group = await Group.findOne({ _id: groupID }).populate([
            {
                path: "title.student",
            },
            {
                path: "title.title"
            }
        ])

        let report = await Report.find({ group: groupID }).lean();

        let studentIDArray = [];
        let studentSignatureArray = []
        let titleArray = []
        let presentArray = []
        let supervisorCommentsArray = []
        let remarksArray = []

        for (let { student, title } of group.title) {

            const comment = await Comment.create({
                group: group._id,
                studentID: student._id,
                supervisor: userID,
                comment: ""
            })

            let remarks = await Remarks.create({
                group: groupID,
                studentID: student._id,
                supervisor: userID,
                remarks: ""
            })

            const findSignature = await Signature.findOne({
                ID: student._id,
            })

            if (!findSignature) {
                const signature = await Signature.create({
                    ID: student._id,
                    signature: "",
                })

                studentSignatureArray.push({
                    studentID: student._id,
                    signature: signature._id
                })

            } else {
                studentSignatureArray.push({
                    studentID: student._id,
                    signature: findSignature._id
                })
            }

            studentIDArray.push(student._id)

            titleArray.push({
                studentID: student._id,
                title: title._id
            })

            presentArray.push({
                studentID: student._id,
                presentStatus: true,
            })

            supervisorCommentsArray.push({
                studentID: student._id,
                comment: comment._id
            })

            remarksArray.push({
                studentID: student._id,
                remarks: remarks._id
            })

        }

        const createdReport = await Report.create({
            group: groupID,
            supervisor: userID,
            week: weekFinder(report.length),
            date: (new Date()).toLocaleDateString('en-GB'),

            studentID: studentIDArray,
            studentSignature: studentSignatureArray,
            title: titleArray,
            present: presentArray,
            supervisorComments: supervisorCommentsArray,
            remarks: remarksArray,
        })

        const allReport = await findReport(userID, groupID)

        return res.status(201).json({
            success: true,
            message: "Report created successfully",
            responseData: allReport
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

        console.log("Test 1")

        for (let sID of studentID) {

            let signature = await Signature.findOne({ ID: sID });

            console.log("Test 2")

            SignatureArray.push(signature)

            console.log("Test 3")

            let comments = await Comment.create({
                group: groupID,
                studentID: sID,
                supervisor: userID,
                comment: "",
            })

            console.log("Test 4")

            CommentArray.push(comments._id)

            console.log("Test 5")

            let obj = {
                group: groupID,
                studentID: sID,
                supervisor: userID,
                remarks: ""
            }

            console.log("obj => ", obj)

            let remarks = await Remarks.create({
                group: groupID,
                studentID: sID,
                supervisor: userID,
                remarks: ""
            })

            console.log("Test 6")

            RemarksArray.push(remarks._id)

            console.log("Test 7")
        }



        console.log("Test 8 passed")

        const createdReport = await Report.create({
            group: groupID,
            supervisor: userID,
            week: preevWeek,
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

export const deleteReport = async (req, res, next) => {

    try {
        const { reportID } = req.body;

        const { userID } = req.userID

        await Report.findByIdAndDelete({ _id: reportID })

        const reports = await Report.find({ supervisor: userID })

        return res.status(200).json({
            success: true,
            responseData: reports,
            message: "Deleted successfully"
        })
    } catch (error) {
        next(error)
    }
}

// edit Details route