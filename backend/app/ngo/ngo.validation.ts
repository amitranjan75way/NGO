import { body } from 'express-validator';

export const raiseFund = [
    body('totalGoalAmount')
        .notEmpty().withMessage('totalGoalAmount is required')
        .isNumeric().withMessage('totalGoalAmount must be a number')
        .custom(value => {
            if (Number(value) <= 0) {
                throw new Error('totalGoalAmount must be greater than 0');
            }
            return true;
        })
];
