import jwt from 'jsonwebtoken';
import { Internal, External } from "../utils/ErrorTypesCode.js";
import CustomError from "../utils/ErrorHandling.js";

export const AuthorizationMiddleware = (req, res, next) => {
    try {

        const token = req.cookies.token;

        if (!token) {
            throw new CustomError("Access Denied: No token provided", 401, Internal);
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (error) {

        if (error.name === 'JsonWebTokenError') {
            return next(new CustomError("Invalid token", 401, Internal));
        } else if (error.name === 'TokenExpiredError') {
            return next(new CustomError("Token expired", 401, Internal));
        }

        return next(new CustomError("Authorization failed", 500, External));
    }
};
