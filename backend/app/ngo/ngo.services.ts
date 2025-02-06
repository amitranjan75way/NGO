import ngofundSchema from "./ngofund.schema";
import ngofundhistorySchema from "./ngofundhistory.schema";
import createHttpError from "http-errors";


/**
 * @description Service function to raise funds by setting or updating the NGO's total goal amount.
 * It checks whether there is an active fund and whether the goal has been reached.
 * It logs changes in the goal amount to the history and resets the collected amount accordingly.
 * @param {number} totalGoalAmount - The new total goal amount for the NGO's fund.
 * @returns {Promise<object>} Returns the updated NGO fund object.
 * @throws {HttpError} Throws a 409 error if funding is already generated and the goal is not reached.
 * @throws {HttpError} Throws a 409 error if there is no change in the goal amount.
 */
export const raiseFundService = async (totalGoalAmount: number) => {
  let ngofund = await ngofundSchema.findOne();

  // Check if the goal is already set and active
  if (ngofund && !ngofund.isGoalReached) {
    throw createHttpError(409, 'Funding is already generated and goal has not been reached yet.');
  }

  // Check if the total goal amount and the total collected amount are the same
  if (ngofund && ngofund.totalGoalAmount === ngofund.totalCollectedAmount) {
    // Log the current goal to history before resetting the goal
    await ngofundhistorySchema.create({
      ngoFundId: ngofund._id,
      oldGoal: ngofund.totalGoalAmount,
      newGoal: totalGoalAmount,
      updatedAt: new Date(),
    });

    // Reset the goal and collected amount for a new raise
    ngofund.totalGoalAmount = totalGoalAmount;
    ngofund.totalCollectedAmount = 0;  // Reset the collected amount
    ngofund.isGoalReached = false; // Mark the new goal as not reached

    await ngofund.save();
    return ngofund;
  }

  // If there's no existing fund or the goal has been reached, create a new one
  if (!ngofund || ngofund.isGoalReached) {
    // Log the previous goal to the history before updating
    if (ngofund && ngofund.totalGoalAmount !== totalGoalAmount) {
      const oldGoal = ngofund.totalGoalAmount;

      // Save old goal in the history before updating
      await ngofundhistorySchema.create({
        ngoFundId: ngofund._id,
        oldGoal,
        newGoal: totalGoalAmount,
        updatedAt: new Date(),
      });
    }

    // Update the NGO fund record with the new goal
    if (!ngofund) {
      ngofund = new ngofundSchema({ totalGoalAmount });
    } else {
      ngofund.totalGoalAmount = totalGoalAmount;
    }

    // Reset the collected amount and goal reached flag if it's a new goal
    ngofund.totalCollectedAmount = 0;
    ngofund.isGoalReached = false;

    await ngofund.save();

    return ngofund;
  }
};

