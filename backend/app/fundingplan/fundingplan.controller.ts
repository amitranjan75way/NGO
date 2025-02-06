import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import * as fundingPlanService from './fundingplan.services';
import { createResponse } from '../common/helper/response.hepler';


/**
 * @description Creates a new funding plan with the provided details.
 * @param {Request} req - Express request object containing funding plan details.
 * @param {Response} res - Express response object to send the response.
 * @returns {Promise<void>} A response indicating the creation of the funding plan.
 */
export const createFundingPlan = asyncHandler(async (req: Request, res: Response) => {
  const { name, amount, frequency } = req.body;

  // Call service to handle creating the funding plan
  const result = await fundingPlanService.createFundingPlanService(name, amount, frequency);

  res.send(createResponse(result, "Funding plan created successfully"));
});


/**
 * @description Fetches all active funding plans from the database.
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object containing the active funding plans.
 * @returns {Promise<void>} A response containing the active funding plans.
 */

export const showFundingPlans = asyncHandler(async (req: Request, res: Response) => {
  // Call the service to get all active funding plans
  const fundingPlans = await fundingPlanService.showAllFundingPlans();

  // Send the response with funding plans data
  res.status(200).send(createResponse(fundingPlans, 'Active funding plans fetched successfully.'));
});
