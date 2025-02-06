import { body, param } from "express-validator";
import mongoose from "mongoose";

export const addPaymentMethod = [
  body("methodType")
    .isIn(["CARD", "BANK_ACCOUNT"])
    .withMessage("Invalid method type. Choose either CARD or BANK_ACCOUNT"),
  
  body("cardDetails").custom((value, { req }) => {
    if (req.body.methodType === "CARD") {
      if (!value) throw new Error("Card details are required for CARD method");
      if (!value.cardNumber || !value.cardHolderName || !value.expiryDate || !value.cvv) {
        throw new Error("All card details must be provided");
      }
      if (!/^\d{16}$/.test(value.cardNumber)) throw new Error("Invalid card number");
      if (!/^\d{3,4}$/.test(value.cvv)) throw new Error("Invalid CVV");
    }
    return true;
  }),

  body("bankAccountDetails").custom((value, { req }) => {
    if (req.body.methodType === "BANK_ACCOUNT") {
      if (!value) throw new Error("Bank account details are required for BANK_ACCOUNT method");
      if (!value.accountNumber || !value.accountHolderName || !value.routingNumber) {
        throw new Error("All bank account details must be provided");
      }
      if (!/^\d{9,18}$/.test(value.accountNumber)) throw new Error("Invalid bank account number");
      if (!/^\d{9}$/.test(value.routingNumber)) throw new Error("Invalid routing number");
    }
    return true;
  }),
];


export const deletePaymentMethod = [
  param("paymentMethodId")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid payment method ID format."),
];

