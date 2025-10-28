export const globalErrorHandler = (error,req,res,next)=>{
    let message = error?.message ? error?.message :"Internal Server Error";
    let status = error?.status
    let stack = error?.stack;
    return res.status(500).json({
        message,
        status,
        stack
    })
}


export const routeNotFound = (req,res,next)=>{
    let error = new Error(`Route ${req.originalUrl} not found`);
    next(error);
}