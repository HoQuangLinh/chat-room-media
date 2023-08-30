import express from 'express'
import { PATH } from '../../const/path'
import authRouter from './authRouter'

const apiRouterV1 = express.Router()

apiRouterV1.use(PATH.auth, authRouter)
export default apiRouterV1
