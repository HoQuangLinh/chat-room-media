import express from 'express'

const apiRouter = express.Router()
import authRouter from './authRouter'
import { PATH } from '../../const/path'

apiRouter.use(PATH.auth, authRouter)
export default apiRouter
