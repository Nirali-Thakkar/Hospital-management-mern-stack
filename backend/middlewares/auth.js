import { catchAyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken"
import {User} from "../models/userScheme.js"
//here we have done athentication and authroization both 
export const isAdminAuthenticated = catchAyncErrors(async(req,res,next)=>{
    const token = req.cookies.adminToken;
    if(!token){
        return next(new ErrorHandler("Admin Not Authenticated",400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id)
    if(req.user.role !== "Admin"){
        return next(new ErrorHandler(`${req.user.role} not authorised 
             for this resorses`,403))
    }
    next();
})



export const isPatientAuthenticated = catchAyncErrors(async(req,res,next)=>{
    const token = req.cookies.patientToken;
    if(!token){
        return next(new ErrorHandler("Patient Not Authenticated",400))
    }
    const decoded = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id)
    if(req.user.role !== "Patient"){
        return next(new ErrorHandler(`${req.user.role} not authorised 
             for this resorses`,403))
    }
    next();
})