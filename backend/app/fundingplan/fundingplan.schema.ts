import mongoose from "mongoose";
import { IFundingPlan } from "./fundingplan.dto";


const FundingPlanSchema = new mongoose.Schema<IFundingPlan>(
  {
    ngoFund: { type: mongoose.Schema.Types.ObjectId, ref: "NGOFund", required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    frequency: { type: String, enum: ["MONTHLY", "QUARTERLY", "HALF_YEARLY", "YEARLY"], required: true },
    collectedAmount: { type: Number, default: 0 },
    isClosed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IFundingPlan>("FundingPlan", FundingPlanSchema);
