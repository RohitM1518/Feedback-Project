import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware.js'
import { isAdmin } from '../middlewares/admin.middleware.js'
import { getAllFeedbacks } from '../controllers/dashboard.controller.js'

const router = Router()

router.route('/getallfeedbacks').get(verifyJWT,isAdmin,getAllFeedbacks)

export default router