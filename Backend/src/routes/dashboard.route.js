import {Router} from 'express'
import { verifyJWT } from '../middlewares/auth.middleware'
import { isAdmin } from '../middlewares/admin.middleware'
import { getAllFeedbacks } from '../controllers/dashboard.controller'

const router = Router()

router.route('/getallfeedbacks').get(verifyJWT,isAdmin,getAllFeedbacks)