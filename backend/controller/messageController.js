import { Message } from "../models/messageSchema.js";
import { catchAyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js"

export const sendMessage = catchAyncErrors(async(req,res,next)=>{
    const {firstName,lastName,email,phone,message} = req.body;
    if(!firstName || !lastName|| !email|| !phone|| !message){
        return next(new ErrorHandler("Please Fill Full Form ",400))
    }
        await Message.create({firstName,lastName,email,phone,message})
        res.status(200).json({
            success: true,
            message: "Message send successfully"
        })
})

export const getAllMessage = catchAyncErrors(async(req,res,next)=>{
       const messages = await Message.find();
       res.status(200).json({
        success: true,
        messages
       }) 
})