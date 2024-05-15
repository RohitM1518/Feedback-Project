import { Router } from "express";
import { createFeedback,deleteFeedback, getUserFeedbacks } from "../controllers/feedback.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(verifyJWT)
router.route("/create").post(createFeedback)
router.route('/:feedbackid').delete(deleteFeedback)
router.route('/getuserfeedbacks').get(getUserFeedbacks)
export default router;