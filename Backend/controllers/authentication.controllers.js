import Supervisor from "../models/supervisor.models.js"
import { Internal } from "../utils/ErrorTypesCode.js";
import CustomError from "../utils/ErrorHandling.js"

export const RegisterController = async (req, res, next) => {
    try {

        const { name, dept, email, password } = req.user;


        const createdUser = await Supervisor.create({
            name, dept, email, password
        })

        if (!createdUser) {
            throw new CustomError("Sorry User is not Created for Internal Server Error", 500, Internal)
        }

        return res.status(201).json({
            status: true,
            message: ` welcome to ams`
        })

    } catch (error) {
        return next(error)
    }
}

export const LoginController = async (req, res, next) => {
    try {

        const { email, password } = req.user;

        const createdUser = await Supervisor.findOne({
            email
        })

           console.log("test 1")

        if (!createdUser) {
            throw new CustomError("User not found !", 404, Internal)
        }

           console.log("test 2")

        const isMatch = await createdUser.comparePassword(password);

           console.log("test 3")

        if (!isMatch) throw new CustomError("Invalid Password", 400, Internal)

               console.log("test 4")

        return res.status(201).json({
            status: true,
            message: ` welcome to ams`
        })

    } catch (err) {
        return next(err)
    }
}