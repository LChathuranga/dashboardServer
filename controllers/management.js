import mongoose from "mongoose";
import User from "../models/User.js"
import Transaction from "../models/Transaction.js";

export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({ role: "admin" }).select("-password");
        res.status(200).json(admins);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const getUserPerformance = async (req, res) => {
    try {
        const { id } = req.params;
        const userWithStats = await User.aggregate([
            // Here first the Id find in the User model and then it match with User data, 
            // Then we can lookup in the affilatestat model(table) with this data
            // THIS IS VERY SIMILAR TO SQL JOINS

            { $match: { _id: new mongoose.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats"
                }
            },
            { $unwind: "$affiliateStats" }
        ]);
        const saleTransactions = await Promise.all(
            userWithStats[0].affiliateStats.affiliateSales.map((id) => {
                return Transaction.findById(id);
            })
        );
        const filteredSaleTransactions = saleTransactions.filter(
            (transaction) => transaction !== null
        );

        res.status(200).json({ user: userWithStats[0], sales: filteredSaleTransactions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
} 