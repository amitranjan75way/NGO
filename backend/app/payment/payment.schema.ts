import mongoose from "mongoose";
import { IPayment } from "./payment.dto";

const PaymentSchema = new mongoose.Schema<IPayment>(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    subscription: { type: mongoose.Schema.Types.ObjectId, ref: "Subscription", required: true },
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ["COMPLETED", "FAILED"], required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IPayment>("Payment", PaymentSchema);
