import jwt from "jsonwebtoken"

export default function AssignCookies(res, payload, Options) {
    // const payload = { userId: user._id };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });

    res.cookie('token', token, Options);
}