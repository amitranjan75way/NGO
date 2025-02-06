import mongoose from "mongoose";

export interface IFundingPlan extends Document {
  ngoFund: mongoose.Types.ObjectId;
  name: string;
  amount: number;
  frequency: "MONTHLY" | "QUARTERLY" | "HALF_YEARLY" | "YEARLY";
  collectedAmount: number;
  isClosed: boolean;
}