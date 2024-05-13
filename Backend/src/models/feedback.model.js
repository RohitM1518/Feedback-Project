import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
        enum:['Product','Student','Employee']
    },
    rating:{
        type:Number,
        min:0,
        max:5,
        required:true
    },
    comments:{
        type:String
    },
    submittedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{timestamps:true})

export const Feedback = mongoose.model('FeedbackForm',feedbackSchema)