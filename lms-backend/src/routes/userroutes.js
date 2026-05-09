import express from 'express'
const userRoute=express.Router()
import { getUser, Login, logoutApi, makeeducator, Register } from '../controller/usercontroller.js';
import { adminRoute, protectRoute } from '../middleware/authmiddleware.js';
// import { use } from 'react';
userRoute.post('/register',Register);
userRoute.post('/login',Login);
userRoute.get('/getUser',protectRoute,getUser)
userRoute.get('/logout',protectRoute,logoutApi)
// userRoute.put('/make_admin/:id',adminRoute,protectRoute,makeeducator)
export default userRoute