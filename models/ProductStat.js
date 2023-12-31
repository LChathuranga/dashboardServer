import mongoose from "mongoose";

const ProductStatSchema = mongoose.Schema({
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
        {
            month: String,
            totalSales: Number,
            totalUnites: Number
        }
    ],
    dailyData: [
        {
            date: String,
            totalSales: Number,
            totalUnites: Number
        }
    ]
}, { timestamps: true });

const ProductStat = mongoose.model("ProductStat", ProductStatSchema);
export default ProductStat;