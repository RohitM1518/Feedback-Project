import { ApiError } from "../utils/ApiError";
import { asyncHandler } from "../utils/asyncHandler";

export const isAdmin=asyncHandler((req,_,next)=>{
    if(req.user.role !== 'admin'){
       throw new ApiError(400,"Unauthorized Access")
    }
    next()
})