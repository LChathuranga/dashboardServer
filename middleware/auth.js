import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = (allowedRoles) => async (req, res, next) => {
    const authorizationHeader = req.headers["authorization"];
    if (!authorizationHeader) {
        return res.status(401).json({ error: 'Authorization header is missing' });
    }
    if (authorizationHeader.startsWith('Bearer ')) {
        const token = authorizationHeader.substring('Bearer '.length);
        if (token) {
            try {
                const decode = jwt.verify(token, process.env.JWT_SECRET);
                req.user = await User.findById(decode.userId).select('-password');
                if (allowedRoles.includes(req.user.role)) {
                    console.log(req.user.role, decode.role);
                    next();
                } else {
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
        else {
            res.status(401).json({
                message: 'Not Authorized, no token'
            });
        }
    } else {
        return res.status(401).json({ error: 'Invalid Authorization header format' });
    }
}