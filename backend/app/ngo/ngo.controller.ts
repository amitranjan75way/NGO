import asyncHandler from 'express-async-handler';
import { type Request, type Response } from 'express';
import * as ngoService from './ngo.services';
import { createResponse } from '../common/helper/response.hepler';


/**
 * @description Handles the process of raising funds by calling the service to update the total goal amount for the NGO.
 * @param {Request} req - The request object containing the `totalGoalAmount` in the body.
 * @param {Response} res - The response object used to send the response with a success message.
 * @returns {Promise<void>} Sends a response with the result of the fund raising process.
 */

export const raiseFund = asyncHandler(async(req: Request, res: Response)=> {
  const { totalGoalAmount } = req.body;

  const response = await ngoService.raiseFundService(totalGoalAmount);

  res.send(createResponse(response, "Fund raised successfully"));
});