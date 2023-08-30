// @ts-nocheck
import express from 'express'
import authController from '../../controllers/auth.controller'

const authRouter = express.Router()

authRouter.post('/register', authController.register)

authRouter.get('/register1', authController.register)

export default authRouter
