// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import MessageController from '../../controllers/message.controler'
import auth from '../../middleware/auth'
import { catchAsync } from '../../middleware/catchAsync'
const messageController =
  container.resolve<MessageController>(MessageController)

const messageRouter = express.Router()

messageRouter.get(
  '/sendMessageToRoom',
  auth,
  catchAsync(
    messageController.sendMessageToRoom.bind(messageController)
  )
)

messageRouter.get(
  '/getMessageByRoomId',
  auth,
  catchAsync(
    messageController.getMessageByRoomId.bind(messageController)
  )
)

export default messageRouter
