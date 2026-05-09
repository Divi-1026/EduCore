import jwt from 'jsonwebtoken';
import { ENV } from '../config/env.js';
import { User } from '../model/user.js';
export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.token
        console.log("toke",token)
        if (!token) {
            return res.status(401).json({ message: "Token not found" })
        }

        const decode = jwt.verify(token, ENV.JWT_SECRET)

        const user = await User.findById(decode.userId).select('-password')

        if (!user) {
            return res.status(401).json({ message: "User not found" })
        }

        req.user = user
        next()

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" })
    }
}

export const adminRoute = (req, res, next) => {
    console.log(req.user)
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        return res.status(403).json({ message: "Access Denied. Admin only." })
    }
}
export const educatorRoute = (req, res, next) => {
    if (req.user && req.user.role === "educator") {
        next();
    } else {
        return res.status(403).json({ message: "Access Denied. Educators only." });
    }
};
