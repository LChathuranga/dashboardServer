import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = (allowedRoles) => async (req, res, next) => {
    let token;
    if (req.cookies && req.cookies.jwt) {
        token = req.cookies.jwt;
    } else {
        console.log("JWT cookie is undefined");
    }

    if(token){
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decode.userId).select('-password');
            if (allowedRoles.includes(req.user.role)) {
                console.log(req.user.role, decode.role);
                next();
            }else{
                res.status(401).json({
                    message: 'Not Authorized to access'
                });
            }
        } catch (error) {
            res.status(401).json({
                message: 'Not Authorized, invalid token'
            });
        }
    }
    else{
        res.status(401).json({
            message: 'Not Authorized, no token'
        });
    }
}