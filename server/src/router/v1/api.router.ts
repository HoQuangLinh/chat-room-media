import express from 'express'
import { PATH } from '../../const/path'
import authRouter from './auth.router'
import roomRouter from './room.router'
import messageRouter from './message.router'
import userRouter from './user.router'

const apiRouterV1 = express.Router()

const listGroupApi = [
  {
    path: PATH.auth,
    router: authRouter
  },
  {
    path: PATH.room,
    router: roomRouter
  },
  {
    path: PATH.message,
    router: messageRouter
  },
  {
    path: PATH.user,
    router: userRouter
  }
]
listGroupApi.forEach((item) => {
  apiRouterV1.use(item.path, item.router)
})

export default apiRouterV1
