
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

        const titleOfGroup = await Title.create({
            title: groupName,
            groupTypes: groupTypes,
            supervisor: userID
        });

        const createdGroup = await Group.create({
            supervisor: userID,
            group: titleOfGroup._id,
            groupTypes: groupTypes,
            semister: semister
        });

        // ✅ Send response FIRST
        res.status(201).json({
            success: true,
            message: `Group ${groupName} created Successfully`,
            responseData: createdGroup || [],
        });

        // ✅ Background work (no response logic here)
        (async () => {
            try {
                let IDArray = [];
                let TitleArray = [];

                for (let sID of groupMembers) {
                    if (!sID) continue;

                    let student = await Student.findOne({ studentID: sID });

                    if (!student) {
                        student = await Student.create({ studentID: sID });
                        const signature = await Signature.create({
                            ID: student._id,
                            signature: "",
                        });
                        student.signature = signature._id;
                        await student.save();
                    }

                    IDArray.push(student._id);
                }

                for (let _id of IDArray) {
                    TitleArray.push({ student: _id, title: titleOfGroup._id });
                }

                createdGroup.groupMembers = IDArray;
                createdGroup.title = TitleArray;
                await createdGroup.save();

                titleOfGroup.connectedGroup = createdGroup._id;
                titleOfGroup.studentID = IDArray;
                await titleOfGroup.save();

                await Supervisor.findByIdAndUpdate(
                    userID,
                    { $push: { groups: createdGroup._id } },
                    { new: true }
                );

                for (let sID of IDArray) {
                    await Student.findByIdAndUpdate(
                        sID,
                        {
                            $push: {
                                associate: {
                                    groupName: createdGroup._id,
                                    title: createdGroup._id,
                                },
                            },
                        },
                        { new: true }
                    );
                }
            } catch (bgErr) {
                console.error("Background group creation error:", bgErr);
            }
        })();

    } catch (error) {
        next(error);
    }
};


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

export const createReport = async (req, res, next) => {
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

        res.status(201).json({
            success: true,
            message: "Report created successfully",
            responseData: allReport
        })

        for (let { comment } of supervisorCommentsArray) {
            let Supcomment = await Comment.findById(comment)
            Supcomment.reportID = createdReport._id
            await Supcomment.save()
        }
        for (let { remarks } of remarksArray) {
            let studentRemarks = await Remarks.findById(remarks)
            studentRemarks.reportID = createdReport._id;
            await studentRemarks.save()
        }

        for (let { signature } of studentSignatureArray) {
            let studentSignature = await Signature.findById(signature)
            studentSignature.reportID = createdReport._id;
            await studentSignature.save()
        }

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

export const updateReport = async (req, res, next) => {

    try {
        let { groupID, reportID, studentID, fieldName, inputValue } = req.body;

        const { userID } = req.userID;

        if (!reportID || !fieldName) {
            return res.status(400).json({ error: "Missing reportID or fieldName" });
        }


        if (fieldName === "week") {
            report.week = inputValue;
            await report.save();
        }

        if (fieldName === "date") {
            // Validate date format: DD/MM/YYYY
            const isValidDateFormat = /^\d{2}\/\d{2}\/\d{4}$/.test(inputValue);
            if (!isValidDateFormat) {
                return res.status(400).json({ error: "Date must be in format DD/MM/YYYY (en-GB)" });
            }

            report.date = inputValue;
            await report.save();
        }

        if (fieldName === "present") {

            let report = await Report.findById(reportID);

            let newPresentArray = report.present.map((obj, index) => {
                return (String(obj.studentID) === String(studentID._id) ? { ...obj, presentStatus: Boolean(inputValue) } : obj);
            })
            report.present = newPresentArray;
            await report.save()
        }

        if (fieldName === "supervisorComments") {

            let comment = await Comment.findOne({ reportID: reportID, studentID: studentID._id })

            comment.comment = inputValue;

            await comment.save();

        }

        if (fieldName === "remarks") {

            let remarks = await Remarks.findOne({ reportID: reportID, studentID: studentID._id })

            remarks.remarks = inputValue;

            await remarks.save();
        }

        const newReportDoc = await Report.findById(reportID).populate([
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

        return res.status(400).json({
            success: true,
            responseData: newReportDoc,
            message: "Document update successfully"
        });

    } catch (error) {
        next(error)
    }
}