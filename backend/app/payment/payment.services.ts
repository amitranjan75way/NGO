import createHttpError from "http-errors";
import { IPayment, IPaymentMethod } from "./payment.dto";
import paymentmethodSchema from "./paymentmethod.schema";
import mongoose from "mongoose";
import paymentSchema from "./payment.schema";


/**
 * @description Service function to add a new payment method for the user.
 * It checks if the payment method already exists, ensures only one primary payment method, 
 * and saves the new payment method to the database.
 * @param {string} userId - The ID of the user adding the payment method.
 * @param {IPaymentMethod} paymentData - The payment method data to be added.
 * @returns {Promise<IPaymentMethod>} The newly added payment method.
 * @throws {HttpError} Throws a 400 error if the payment method already exists.
 * @throws {HttpError} Throws a 500 error if there is an issue saving the payment method.
 */

export const addPaymentMethod = async (
  userId: string,
  paymentData: IPaymentMethod
) => {
  // Check if the same payment method already exists
  const existingPayment = await paymentmethodSchema.findOne({
    user: userId,
    methodType: paymentData.methodType,
    ...(paymentData.methodType === "CARD"
      ? { "cardDetails.cardNumber": paymentData.cardDetails?.cardNumber }
      : {
          "bankAccountDetails.accountNumber":
            paymentData.bankAccountDetails?.accountNumber,
        }),
  });

  if (existingPayment) {
    throw createHttpError(400, "This payment method is already added.");
  }

  // If setting primary, unset existing primary
  if (paymentData.isPrimary) {
    await paymentmethodSchema.updateMany(
      { user: userId },
      { isPrimary: false }
    );
  }

  // Create new payment method
  const newPaymentMethod = new paymentmethodSchema({
    user: userId,
    methodType: paymentData.methodType,
    cardDetails: paymentData.cardDetails,
    bankAccountDetails: paymentData.bankAccountDetails,
    isPrimary: paymentData.isPrimary || false,
  });

  await newPaymentMethod.save();
  return newPaymentMethod;
};


/**
 * @description Service function to delete a payment method for the user.
 * It ensures that the payment method exists, belongs to the correct user, 
 * and deletes the payment method from the database.
 * @param {string} userId - The ID of the user requesting deletion.
 * @param {string} paymentMethodId - The ID of the payment method to be deleted.
 * @returns {Promise<Object>} The result message of the deletion.
 * @throws {HttpError} Throws a 404 error if the payment method is not found.
 * @throws {HttpError} Throws a 403 error if the user is not authorized to delete the payment method.
 */

export const deletePaymentMethod = async (
  userId: string,
  paymentMethodId: string
) => {
  // Find the payment method
  const paymentMethod = await paymentmethodSchema.findById(paymentMethodId);

  if (!paymentMethod) {
    throw createHttpError(404, "Payment method not found.");
  }

  // Ensure the payment method belongs to the user
  if (paymentMethod.user.toString() !== userId) {
    throw createHttpError(
      403,
      "You are not authorized to delete this payment method."
    );
  }

  // Delete the payment method
  await paymentmethodSchema.findByIdAndDelete(paymentMethodId);

  return { message: "Payment method deleted successfully." };
};


/**
 * @description Service function to fetch all payment methods for the user.
 * It returns a list of payment methods associated with the given user ID.
 * @param {string} userId - The ID of the user whose payment methods are being fetched.
 * @returns {Promise<IPaymentMethod[]>} The list of payment methods for the user.
 * @throws {HttpError} Throws a 404 error if no payment methods are found for the user.
 */
export const getAllPaymentMethods = async (userId: string) => {
  // Fetch all payment methods for the user
  const paymentMethods = await paymentmethodSchema.find({ user: userId });

  if (!paymentMethods.length) {
    throw createHttpError(404, "No payment methods found.");
  }

  return paymentMethods;
};


/**
 * @description Service function to generate a unique transaction ID.
 * The transaction ID is generated based on the current timestamp and a random number.
 * @returns {string} The generated transaction ID.
 */
const generateTransactionId = (): string => {
  return `TXN-${Date.now()}-${Math.floor(Math.random() * 10000)}`;
};



/**
 * @description Service function to add a payment for the given payment method.
 * It checks if the payment method exists, belongs to the user, and processes the payment.
 * @param {string} paymentMethodId - The ID of the payment method to be used for the payment.
 * @param {number} amount - The amount to be paid.
 * @param {string} userId - The ID of the user making the payment.
 * @returns {Promise<IPayment>} The created payment object.
 * @throws {HttpError} Throws a 404 error if the payment method does not exist.
 * @throws {HttpError} Throws a 403 error if the payment method does not belong to the user.
 * @throws {HttpError} Throws a 500 error if there is an issue processing the payment.
 */
export const addPayment = async (
  paymentMethodId: string,
  amount: number,
  userId: string
) => {
  // Step 1: Check if the payment method exists
  const paymentMethod = await paymentmethodSchema.findById(paymentMethodId);

  if (!paymentMethod) {
    throw createHttpError(404, "This payment method does not exist.");
  }

  // Step 2: Ensure the payment method belongs to the correct user
  if (paymentMethod.user.toString() !== userId) {
    throw createHttpError(
      403,
      "This payment method does not belong to the user."
    );
  }

  try {
    // Step 4: Save the new payment entry to the database
    const payment = new paymentSchema({
      user: userId,
      subscription: paymentMethod._id,
      transactionId: generateTransactionId(),
      amount,
      status: "COMPLETED",
    });
    await payment.save();
    return payment; // Optionally return the created payment
  } catch (error) {
    console.error("Error creating payment:", error);
    throw createHttpError(
      500,
      "Internal server error while processing payment."
    );
  }
};
