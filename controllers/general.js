import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import OverallStat from "../models/OverallStat.js";

export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const getDashboardStat = async (req, res) => {
    try {
        // Hard coded values
        const currentMonth = "November";
        const currentYear = 2021;
        const currentDay = "2021-11-15"

        // Resent Transactions
        const transactions = await Transaction.find().limit(50).sort({ createdOn: -1 });
        const overallStat = await OverallStat.find({ year: currentYear });
        const {
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory
        } = overallStat[0];

        // Iterate through monthlyData and if month === currentMonth 
        // then current data will return
        const thisMonthStats = overallStat[0].monthlyData.find(({ month }) => {
            return month === currentMonth;
        });
        const todayStats = overallStat[0].dailyData.find(({ date }) => {
            return date === currentDay;
        });

        res.status(200).json({
            totalCustomers,
            yearlyTotalSoldUnits,
            yearlySalesTotal,
            monthlyData,
            salesByCategory,
            thisMonthStats,
            todayStats,
            transactions
        });
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}