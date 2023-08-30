import { Request, Response } from 'express'
import { IResponse } from '../interfaces/common'

export class AuthController {
  register(req: Request, res: IResponse) {
    return res.success('Register success')
  }
}

export default new AuthController()
