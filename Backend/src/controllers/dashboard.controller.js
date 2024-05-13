import { Feedback } from "../models/feedback.model";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { asyncHandler } from "../utils/asyncHandler";

const getAllFeedbacks = asyncHandler(async () => {
    const pipeline = [
        // Stage 1: Lookup user information
        {
            $lookup: {
                from: 'users', // Assuming the name of the User collection is 'users'
                localField: 'submittedBy',
                foreignField: '_id',
                as: 'user'
            }
        },
        // Stage 2: Unwind the user array (as it's an array due to $lookup)
        { $unwind: '$user' },
        {
            $project:{
                "type":1,
                "rating":1,
                "comments":1,
                "submittedBy":1,
                "submittedAt":1,
                "user.name":1,
                "user.email":1
            }
        }
    ];

    // Execute aggregation pipeline
    const feedbacks = await Feedback.aggregate(pipeline);

    if (!feedbacks) {
        throw new ApiError(500, "No feedbacks found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, feedbacks, "Feedbacks found"))
})

const sortFeedbacks = asyncHandler(async (req, res) => {
    // Calculate skip count based on pagination
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
                "submittedAt":1,
                "user.name":1,
                "user.email":1
            }
        }
    ];

    // Execute aggregation pipeline
    const feedback = await Feedback.aggregate(pipeline);
})

export {
    getAllFeedbacks,
    sortFeedbacks
}