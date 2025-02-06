import mongoose from "mongoose";

export interface IPayment extends Document {
  user: mongoose.Types.ObjectId;
  subscription: mongoose.Types.ObjectId;
  transactionId: string;
  amount: number;
  status: "COMPLETED" | "FAILED";
}

export interface ICardDetails {
  cardNumber: string;
  cardHolderName: string;
  expiryDate: string;
  cvv: string;
}

export interface IBankAccountDetails {
  accountNumber: string;
  accountHolderName: string;
  routingNumber: string;
}

export interface IPaymentMethod {
  user: mongoose.Schema.Types.ObjectId; 
  methodType: "CARD" | "BANK_ACCOUNT";
  cardDetails?: ICardDetails; 
  bankAccountDetails?: IBankAccountDetails; 
  isPrimary?: boolean; 
}

