
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as fundingPlanControlelr from './fundingplan.controller';
import * as fundingPlanValidation from './fundingplan.validation';


const router = Router();

router
    .post('/plan', authMiddlerware.auth, authMiddlerware.isAdmin, fundingPlanValidation.createFundingPlan, catchError, fundingPlanControlelr.createFundingPlan)
    .get('/plan', fundingPlanControlelr.showFundingPlans)
        
export default router;