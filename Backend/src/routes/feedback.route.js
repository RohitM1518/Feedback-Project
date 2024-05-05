import { Router } from "express";
import { createFeedback,deleteFeedback } from "../controllers/feedbackform.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(verifyJWT)
router.route("/create").post(createFeedback)
router.route('/:feedbackid').delete(deleteFeedback)
export default router;