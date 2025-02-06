import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import { createResponse } from '../common/helper/response.hepler';
import createHttpError from 'http-errors';
import * as paymentMethodService from './payment.services';


/**
 * @description Controller to handle adding a new payment method for the authenticated user.
 * It validates the user session and calls the service to add the payment method.
 * @param {Request} req - Express request object, containing the payment method data in the body.
 * @param {Response} res - Express response object, used to send back the response.
 * @returns {Promise<void>} Sends a success response with the newly added payment method data.
 * @throws {HttpError} Throws a 404 error if the user is not found.
 */

export const addNewPaymentMethod = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw createHttpError(404, "User not found, please login again");
  }
  const userId = user._id;

  // Call the service
  const paymentMethod = await paymentMethodService.addPaymentMethod(userId, req.body);

  res.send(createResponse(paymentMethod, "Payment method added successfully"))
});


/**
 * @description Controller to handle deleting a payment method for the authenticated user.
 * It validates the user session and calls the service to delete the specified payment method.
 * @param {Request} req - Express request object, containing the payment method ID as a URL parameter.
 * @param {Response} res - Express response object, used to send back the response.
 * @returns {Promise<void>} Sends a success response with the result of the deletion.
 * @throws {HttpError} Throws a 401 error if the user is not authenticated.
 */

export const deletePaymentMethod = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw createHttpError(401, "User not authenticated.");
  }
  const userId = user._id;
  const { paymentMethodId } = req.params;

  // Call the service
  const result = await paymentMethodService.deletePaymentMethod(userId, paymentMethodId);

  res.send(createResponse(result, "Payment method deleted"));
});


/**
 * @description Controller to fetch all payment methods for the authenticated user.
 * It validates the user session and calls the service to fetch the payment methods.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object, used to send back the response.
 * @returns {Promise<void>} Sends a success response with the list of payment methods.
 * @throws {HttpError} Throws a 401 error if the user is not authenticated.
 */
export const getUserPaymentMethods = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    throw createHttpError(401, "User not authenticated.");
  }

  const userId = user._id;

  // Call the service
  const paymentMethods = await paymentMethodService.getAllPaymentMethods(userId);

  res.send(createResponse(paymentMethods, "payment methods fetched successfully"));
});

