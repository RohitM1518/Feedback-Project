import {FeedbackForm} from '../models/feedbackform.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const createFeedback = asyncHandler(async(req,res)=>{
    const {type,rating,comments}=req.body
    if(!type || !rating || !comments){
        throw new ApiError(400,"All feilds are required")
    }
    const feedbackForm = await FeedbackForm.create({
        type,
        rating,
        comments,
        submittedBy:req.user._id
    })
    if(!feedbackForm){
        throw new ApiError(500,"Error while submitting the form")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,feedbackForm," Feedback stored successfully"))
})

const deleteFeedback=asyncHandler(async(req,res)=>{
    const {feedbackid}= req?.params
    const user=req.user
    if(user.role != 'admin'){
        throw new ApiError(400,"Only admin can delete the feedback")
    }
    if(!feedbackid){
        throw new ApiError(400,"Feedback id is required")
    }
    const feedbackForm = FeedbackForm.findById(feedbackid)
    if(!feedbackForm){
        throw new ApiError(200,"No such feedback stored")
    }
    const response = await FeedbackForm.findByIdAndDelete(feedbackid)
    if(!response){
        throw new ApiError(500,"Something went wrong while deleting feedback form")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Succcessfully deleted the feedback"))
})

export{
    createFeedback,
    deleteFeedback
}