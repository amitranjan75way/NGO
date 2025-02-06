
import { Router } from "express";
import { catchError } from "../common/middleware/cath-error.middleware";
import * as authMiddlerware from "../common/middleware/auth.middleware";
import * as paymentController from './payment.controller';
import * as paymentValidation from './payment.validation';


const router = Router();

router
    .post('/method', authMiddlerware.auth, authMiddlerware.isDonar, paymentValidation.addPaymentMethod, catchError, paymentController.addNewPaymentMethod)
    .delete('/method', authMiddlerware.auth, authMiddlerware.isDonar, paymentValidation.deletePaymentMethod, catchError, paymentController.deletePaymentMethod)
    .get('/method', authMiddlerware.auth, authMiddlerware.isDonar, paymentController.getUserPaymentMethods)
        
export default router;