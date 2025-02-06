
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as subsriptionValidation from "./subscription.validation";
import * as subscriptionController from './subsription.controller';


const router = Router();

router
    .post('/:fundingPlanId/:paymentMethodId', authMiddlerware.auth, authMiddlerware.isDonar, subsriptionValidation.addSubscription, catchError, subscriptionController.addSubscription)
        
export default router;