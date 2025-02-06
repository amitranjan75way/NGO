import mongoose, { Schema, Document } from "mongoose";
import { IFundingGoalHistory } from "./ngo.dto";


const FundingGoalHistorySchema = new Schema<IFundingGoalHistory>(
  {
    ngoFundId: { type: Schema.Types.ObjectId, ref: "NGOFund", required: true },
    oldGoal: { type: Number, required: true, default: 0 },
    newGoal: { type: Number, required: true, default: 0 },
    updatedAt: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IFundingGoalHistory>(
  "FundingGoalHistory",
  FundingGoalHistorySchema
);
