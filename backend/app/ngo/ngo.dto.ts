import mongoose from "mongoose";

export interface INGOFund extends Document {
  totalGoalAmount: number; 
  totalCollectedAmount: number; 
  isGoalReached: boolean;
}

export interface IFundingGoalHistory extends Document {
  ngoFundId: mongoose.Types.ObjectId; 
  oldGoal: number;
  newGoal: number;
  updatedAt: Date;
}