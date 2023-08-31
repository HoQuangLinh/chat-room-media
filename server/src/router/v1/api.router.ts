import express from 'express'
import { PATH } from '../../const/path'
import authRouter from './auth.router'
import roomRouter from './room.router'

const apiRouterV1 = express.Router()

const listGroupApi = [
  {
    path: PATH.auth,
    router: authRouter
  },
  {
    path: PATH.room,
    router: roomRouter
  }
]
listGroupApi.forEach((item) => {
  apiRouterV1.use(item.path, item.router)
})

export default apiRouterV1
