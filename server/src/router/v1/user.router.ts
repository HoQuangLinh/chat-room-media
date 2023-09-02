// @ts-nocheck
import express from 'express'
import { container } from 'tsyringe'
import auth from '../../middleware/auth'
import { catchAsync } from '../../middleware/catchAsync'
import UserController from '../../controllers/user.controller'
const userController =
  container.resolve<UserController>(UserController)

const userRouter = express.Router()

userRouter.get(
  '/getAllUsers',
  catchAsync(userController.getAllUser.bind(userController))
)

export default userRouter
