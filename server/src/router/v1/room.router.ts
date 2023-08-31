// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import RoomController from '../../controllers/room.controler'
import { catchAsync } from '../../middleware/catchAsync'
const roomController =
  container.resolve<RoomController>(RoomController)

const roomRouter = express.Router()

roomRouter.post(
  '/createRoom',
  catchAsync(roomController.createRoom.bind(roomController))
)

export default roomRouter
