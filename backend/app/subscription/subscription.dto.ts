import mongoose from "mongoose";

export interface ISubscription extends Document {
  user: mongoose.Types.ObjectId; // Donor
  fundingPlan: mongoose.Types.ObjectId;
  status: "ACTIVE" | "CANCELLED";
  nextPaymentDate: Date;
}