
import ngofundSchema from '../ngo/ngofund.schema';
import createHttpError from 'http-errors';
import fundingplanSchema from './fundingplan.schema';


/**
 * @description Creates a new funding plan if the conditions are met (no active funding or goal reached).
 * @param {string} name - The name of the funding plan.
 * @param {number} amount - The amount of the funding plan.
 * @param {string} frequency - The frequency of the funding plan (e.g., "MONTHLY", "QUARTERLY").
 * @throws {Error} Throws an error if there is no active NGO fund or the goal has already been reached.
 * @throws {Error} Throws an error if a funding plan with the same amount and frequency already exists.
 * @returns {Promise<object>} The newly created funding plan.
 */
export const createFundingPlanService = async (name: string, amount: number, frequency: string) => {
  // Check if there is an active funding (NGO fund) first
  const ngoFund = await ngofundSchema.findOne();
  if (!ngoFund || ngoFund.isGoalReached) {
    // If no active funding or the goal is already reached, throw an error
    throw createHttpError(400, 'No funding is required at the moment, or the goal has already been reached.');
  }

  // Check if there is already an active funding plan with the same amount and frequency
  const existingPlan = await fundingplanSchema.findOne({
    amount,
    frequency,
    isClosed: false,
  });

  if (existingPlan) {
    // If a plan already exists with the same amount and frequency, throw an error
    throw createHttpError(409, 'A funding plan with the same amount and frequency is already active.');
  }

  // If no active plan exists, create the new funding plan
  const newFundingPlan = new fundingplanSchema({
    ngoFund: ngoFund._id,
    name,
    amount,
    frequency,
  });

  // Save the new plan to the database
  await newFundingPlan.save();

  return newFundingPlan;
};


/**
 * @description Fetches a funding plan by its ID.
 * @param {string} id - The ID of the funding plan to fetch.
 * @returns {Promise<object | null>} The fetched funding plan or null if not found.
 */
export const getFundingPlan = async(id: string) => {
  const fundPlan = await fundingplanSchema.findById(id);
  return fundPlan;
}


/**
 * @description Fetches all active (non-closed) funding plans from the database.
 * @returns {Promise<Array>} An array of active funding plans.
 * @throws {Error} Throws an error if no active funding plans are found.
 */
export const showAllFundingPlans = async () => {
  // Fetch all funding plans that are not closed
  const fundingPlans = await fundingplanSchema.find({ isClosed: false }).populate('ngoFund', 'totalGoalAmount totalCollectedAmount');

  // If no plans are found, throw an error
  if (!fundingPlans || fundingPlans.length === 0) {
    throw createHttpError(404, 'No active funding plans found.');
  }

  return fundingPlans;
};
