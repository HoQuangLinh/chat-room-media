// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import RoomController from '../../controllers/room.controler'
import { catchAsync } from '../../middleware/catchAsync'
import auth from '../../middleware/auth'
const roomController =
  container.resolve<RoomController>(RoomController)

const roomRouter = express.Router()

roomRouter.get(
  '/getMyOwnerRooms',
  auth,
  catchAsync(roomController.getMyOwnerRooms.bind(roomController))
)

roomRouter.get(
  '/getMyRooms',
  auth,
  catchAsync(roomController.getMyRooms.bind(roomController))
)

roomRouter.post(
  '/createRoom',
  auth,
  catchAsync(roomController.createRoom.bind(roomController))
)

export default roomRouter
