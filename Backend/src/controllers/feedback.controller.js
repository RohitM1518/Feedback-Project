import {Feedback} from '../models/feedback.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const createFeedback = asyncHandler(async(req,res)=>{
    const {type,rating,comments}=req.body
    console.log("Type ",type)
    console.log("Rating ",rating)
    console.log("Comments ",comments)
    if(!type || !rating || !comments){
        throw new ApiError(400,"All feilds are required")
    }
    const feedback = await Feedback.create({
        type,
        rating,
        comments,
        submittedBy:req.user._id
    })
    if(!feedback){
        throw new ApiError(500,"Error while submitting the form")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,feedback," Feedback stored successfully"))
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
    const feedback = Feedback.findById(feedbackid)
    if(!feedback){
        throw new ApiError(200,"No such feedback stored")
    }
    const response = await Feedback.findByIdAndDelete(feedbackid)
    if(!response){
        throw new ApiError(500,"Something went wrong while deleting feedback form")
    }
    return res
    .status(200)
    .json(new ApiResponse(200,{},"Succcessfully deleted the feedback"))
})

const getUserFeedbacks=asyncHandler(async(req,res)=>{
    const feedbacks = await Feedback.find({submittedBy:req.user._id})
    if(!feedbacks){
        throw new ApiError(400,"No Feedbacks found")
    }
    return res.status(200).json(new ApiResponse(200,feedbacks,"Successfully Fetched"))
})
export{
    createFeedback,
    deleteFeedback,
    getUserFeedbacks
}