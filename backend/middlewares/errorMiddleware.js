class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const erroeMiddleware = (err,req,res,next)=>{
    err.message = err.message || "internal server error"
    err.statusCode = err.statusCode || 500

    //if occured same value like same email entered 
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message,400);
    }
    if(err.name === "JsonWebTokenError"){
        const message = "Json Web Token is Invalid , Try Again"
        err = new ErrorHandler(message,400);
    }
    if(err.name === "TokenExpiredError"){
        const message = "Json Web Token is Expired , Try Again"
        err = new ErrorHandler(message,400);
    }
    //occured if type value not matched 
    //like if entred name in numbers instead of string
    if(err.name === "CastError"){
        const message = `Invalid ${err.path}`
        err = new ErrorHandler(message,400);
    }
    const errorMessage = err.errors ? Object.values(err.errors).map(error=>error.message).join(" ") : err.message;

    return res.status(err.statusCode).json({
        success : false,
        message: errorMessage,
    })
}

export default ErrorHandler
