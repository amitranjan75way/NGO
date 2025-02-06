import mongoose from "mongoose";
import { ISubscription } from "./subscription.dto";

const SubscriptionSchema = new mongoose.Schema<ISubscription>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    fundingPlan: { type: mongoose.Schema.Types.ObjectId, ref: "FundingPlan", required: true },
    status: { type: String, enum: ["ACTIVE", "CANCELLED"], default: "ACTIVE" },
    nextPaymentDate: { type: Date, required: true }, 
  },
  { timestamps: true }
);

export default mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
