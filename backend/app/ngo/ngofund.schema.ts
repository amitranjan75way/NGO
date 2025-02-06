import mongoose, { Schema, Document } from "mongoose";
import { INGOFund } from "./ngo.dto";



const NGOFundSchema = new Schema<INGOFund>(
  {
    totalGoalAmount: { type: Number, required: true, default: 0 },
    totalCollectedAmount: { type: Number, default: 0 },
    isGoalReached: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<INGOFund>("NGOFund", NGOFundSchema);
