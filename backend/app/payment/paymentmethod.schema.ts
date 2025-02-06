import mongoose from "mongoose";
import { IPaymentMethod } from "./payment.dto"; 

const PaymentMethodSchema = new mongoose.Schema<IPaymentMethod>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    methodType: {
      type: String,
      enum: ["CARD", "BANK_ACCOUNT"],
      required: true,
    },
    cardDetails: {
      cardNumber: { 
        type: String, 
        required: function () { 
          return this.methodType === 'CARD'; 
        } },
      cardHolderName: { 
        type: String, 
        required: function () { 
          return this.methodType === 'CARD'; 
        } },
      expiryDate: { 
        type: String, 
        required: function () { 
          return this.methodType === 'CARD'; 
        } },
      cvv: { 
        type: String, 
        required: function () { 
          return this.methodType === 'CARD'; 
        } },
    },
    bankAccountDetails: {
      accountNumber: { 
        type: String, 
        required: function () { 
          return this.methodType === 'BANK_ACCOUNT'; 
        } },
      accountHolderName: { 
        type: String, required: function () { 
          return this.methodType === 'BANK_ACCOUNT'; 
        } },
      routingNumber: { 
        type: String, required: function () { 
          return this.methodType === 'BANK_ACCOUNT'; 
        } },
    },
    isPrimary: { 
      type: Boolean, 
      default: false 
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPaymentMethod>("PaymentMethod", PaymentMethodSchema);
