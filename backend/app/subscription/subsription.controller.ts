import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import { createResponse } from '../common/helper/response.hepler';
import * as subscriptionService from './subsription.services';
import createHttpError from 'http-errors';


/**
 * @description Handles the creation of a new subscription for a user.
 * Validates the user's authentication, retrieves necessary parameters (fundingPlanId, paymentMethodId),
 * and calls the service to add the subscription.
 * 
 * @route POST /subscriptions/:fundingPlanId/:paymentMethodId
 * @access Protected (requires authentication)
 * 
 * @param {Request} req - The HTTP request object containing the user, fundingPlanId, paymentMethodId, and amount in the request body.
 * @param {Response} res - The HTTP response object used to send back the created subscription data.
 * 
 * @throws {HttpError} 404 - If the user is not found (not authenticated).
 * 
 * @returns {Response} - A response containing the created subscription and a success message.
 */
export const addSubscription = asyncHandler(async (req: Request, res: Response) => {
  const user = req.user;
  if(!user) {
    throw createHttpError(404, "user not found, please login again")
  }
  const userId = user._id
  const { fundingPlanId, paymentMethodId } = req.params;
  const { amount } = req.body;

  const subscription = await subscriptionService.addSubscriptionService(userId, fundingPlanId, paymentMethodId, amount);

  res.status(201).send(createResponse(subscription, 'Subscription successfully created.'));
});
