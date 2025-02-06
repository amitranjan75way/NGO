
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as ngoValidation from "./ngo.validation";
import * as ngoController from './ngo.controller';


const router = Router();

router
    .post('/fund', authMiddlerware.auth, authMiddlerware.isAdmin, ngoValidation.raiseFund, catchError, ngoController.raiseFund)
        
export default router;