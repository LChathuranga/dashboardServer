import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && await user.matchPasswords(password)) {
        generateToken(res, user._id, user.role);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            role: user.role,
            email: user.email
        });
    }
    else {
        res.status(401).json({
            message: "Not Authenticated"
        });
    }
}

export const register = async () => {
    const { name, email, password, city, state, country, occupation, phone } = req.body;

    const isUserExit = await User.findOne({ email });

    if (isUserExit) {
        res.status(400).json({
            message: "User Already Exit"
        });
    }

    const user = await User.create({
        name,
        email,
        password,
        city,
        state,
        country,
        occupation,
        phone
    });

    if (user) {
        generateToken(res, user._id, user.role);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role
        });
    }
    else {
        res.status(500).json({ message: "Invalid User Data" });
    }
}

export const logoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0)
    });
    res.status(200).json({
        message: "User Logged out"
    });
}