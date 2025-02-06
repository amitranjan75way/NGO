import express from "express";
import userRoutes from "./user/user.route";
import ngoRoutes from "./ngo/ngo.route";
import fundingPlanRoutes from './fundingplan/fundingplan.route';
import subscriptionRoutes from './subscription/subscription.route';
import paymentRoutes from './payment/payment.route';

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/ngo", ngoRoutes);
router.use("/funding", fundingPlanRoutes);
router.use("/subscription", subscriptionRoutes);
router.use("/payment", paymentRoutes);


export default router;