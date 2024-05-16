import { Feedback } from "../models/feedback.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const getAllFeedbacks = asyncHandler(async (req, res) => {
    // Calculate skip count based on pagination
    const {page=1,limit=10,sortBy='createdAt',sortOrder='asc'}=req.query
    console.log("sortby",sortBy)
    console.log("sortOrder",sortOrder)
    const skipCount = (page - 1) * limit;

    // Aggregation pipeline stages
    const pipeline = [
        // Stage 1: Sort feedback
        { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } },

        // Stage 2: Pagination - skip and limit
        { $skip: skipCount },
        { $limit: limit },

        // Stage 3: Lookup user information
        {
            $lookup: {
                from: 'users', // Assuming the name of the User collection is 'users'
                localField: 'submittedBy',
                foreignField: '_id',
                as: 'user'
            }
        },
        // Stage 4: Unwind the user array (as it's an array due to $lookup)
        { $unwind: '$user' },
        {
            $project:{
                "type":1,
                "rating":1,
                "comments":1,
                "submittedBy":1,
                "createdAt":1,
                "fullName":"$user.fullName",
                "email":"$user.email",
                "avatar":"$user.avatar",
            }
        }
    ];

    // Execute aggregation pipeline
    const feedback = await Feedback.aggregate(pipeline);

    if (!feedback) {
        throw new ApiError(500, "No feedbacks found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, feedback, "Feedbacks found"))
})

export {
    getAllFeedbacks,
}