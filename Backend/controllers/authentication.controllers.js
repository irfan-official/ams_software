import Supervisor from "../models/supervisor.models.js"

export const RegisterController = async (req, res) => {
    try {

        const { name, dept, email, password } = req.user;


        const createdUser = await Supervisor.create({
            name, dept, email, password
        })

        if (!createdUser) {
            return new Error()
        }

        return res.status(201).json({
            status: true,
            message: ` welcome to ams`
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            error: err.message,

        })
    }
}

export const LoginController = async (req, res) => {
    try {

        const { email, password } = req.user;

        const createdUser = await Supervisor.findOne({
            name, dept, email, password
        })

        if (!createdUser) {
            return new Error()
        }

        return res.status(201).json({
            status: true,
            message: ` welcome to ams`
        })

    } catch (err) {
        return res.status(500).json({
            status: false,
            err: err.message,

        })
    }
}