import { body } from 'express-validator';

export const createFundingPlan = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isString()
    .withMessage('Name must be a string'),

  body('amount')
    .notEmpty()
    .withMessage('Amount is required')
    .isNumeric()
    .withMessage('Amount must be a number')
    .custom((value) => value > 0)
    .withMessage('Amount must be greater than 0'),

  body('frequency')
    .notEmpty()
    .withMessage('Frequency is required')
    .isIn(['MONTHLY', 'QUARTERLY', 'HALF_YEARLY', 'YEARLY'])
    .withMessage('Frequency must be one of the following: MONTHLY, QUARTERLY, HALF_YEARLY, YEARLY'),
];
