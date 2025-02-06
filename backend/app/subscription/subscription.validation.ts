import { body, param } from "express-validator";

export const addSubscription = [
  param("fundingPlanId")
    .notEmpty()
    .withMessage("Funding plan ID is required")
    .isMongoId()
    .withMessage("Invalid funding plan ID"),

  param("paymentMethodId")
    .notEmpty()
    .withMessage("paymentMethodId is required")
    .isMongoId()
    .withMessage("Invalid paymentMethodId"),

  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value) => value > 0)
    .withMessage("Amount must be greater than 0"),
];
