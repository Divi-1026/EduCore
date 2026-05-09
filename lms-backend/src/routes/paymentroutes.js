import express from "express"
import { protectRoute } from "../middleware/authmiddleware.js";
import { checkoutSuccess, createCheckOutSession } from "../controller/paymentcontroller.js";
const paymentRoute=express.Router();
paymentRoute.post('/checkout',protectRoute,createCheckOutSession);
paymentRoute.post('/checkout_success',protectRoute,checkoutSuccess)
export default paymentRoute