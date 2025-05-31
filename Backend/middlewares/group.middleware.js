import { Internal } from "../utils/ErrorTypesCode.js";
import CustomError from "../utils/ErrorHandling.js"

export const createGroupMiddleware = (req, res, next) => {
    try {
        let { groupName = "", groupTypes = "", gropMembers = [], semister = "" } = req.body

        groupName = groupName.trim();
        groupTypes = groupTypes.trim();
        semister = semister.trim();

        if (!groupName || !groupTypes || !semister || gropMembers.length < 1) {
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
        req.user = { groupName, groupTypes, gropMembers, semister }
        console.log("Test 1")
        next()


    } catch (error) {
        next(error)
    }
}