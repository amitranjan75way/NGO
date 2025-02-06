
import createHttpError from 'http-errors';
import fundingplanSchema from '../fundingplan/fundingplan.schema';
import subscriptionSchema from './subscription.schema';
import { getFundingPlan } from '../fundingplan/fundingplan.services';
import { addPayment } from '../payment/payment.services';


/**
 * @description Handles the logic for adding a new subscription for a user to a funding plan.
 * It checks the existence of the funding plan, processes the payment, calculates the next payment date based on the funding plan's frequency,
 * and ensures the user is not already subscribed to the same funding plan.
 * 
 * @param {string} userId - The ID of the user subscribing to the funding plan.
 * @param {string} fundingPlanId - The ID of the funding plan the user wants to subscribe to.
 * @param {string} paymentMethodId - The ID of the payment method used for the subscription.
 * @param {number} amount - The amount to be paid for the subscription.
 * 
 * @throws {HttpError} 404 - If the funding plan is not found.
 * @throws {HttpError} 409 - If the user is already subscribed to the funding plan.
 * 
 * @returns {Promise<Object>} - A Promise that resolves to the created subscription object.
 */
export const addSubscriptionService = async (
  userId: string,
  fundingPlanId: string,
  paymentMethodId: string,
  amount: number
) => {
  const fundingPlan = await getFundingPlan(fundingPlanId);



  if (!fundingPlan) {
    throw createHttpError(404, 'Funding plan not found');
  }

  const payment = await addPayment(paymentMethodId, amount, userId);

  // Calculate the next payment date based on the funding plan frequency
  const currentDate = new Date();
  let calculatedNextPaymentDate = new Date(currentDate);

  if (fundingPlan.frequency === 'MONTHLY') {
    calculatedNextPaymentDate.setMonth(currentDate.getMonth() + 1);
  } else if (fundingPlan.frequency === 'QUARTERLY') {
    calculatedNextPaymentDate.setMonth(currentDate.getMonth() + 3);
  } else if (fundingPlan.frequency === 'HALF_YEARLY') {
    calculatedNextPaymentDate.setMonth(currentDate.getMonth() + 6);
  } else if (fundingPlan.frequency === 'YEARLY') {
    calculatedNextPaymentDate.setFullYear(currentDate.getFullYear() + 1);
  }

  // Check if the user is already subscribed to this funding plan
  const existingSubscription = await subscriptionSchema.findOne({
    user: userId,
    fundingPlan: fundingPlanId,
    status: 'ACTIVE',
  });

  if (existingSubscription) {
    throw createHttpError(409, 'User is already subscribed to this funding plan');
  }

  // Create a new subscription
  const newSubscription = new subscriptionSchema({
    user: userId,
    fundingPlan: fundingPlanId,
    nextPaymentDate: calculatedNextPaymentDate,
  });

  await newSubscription.save();

  return newSubscription;
};
