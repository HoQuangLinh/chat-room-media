import 'reflect-metadata'
import { injectable } from 'tsyringe'
import { IRequest, IResponse } from '../interfaces/common'
import { IUserRequestDTO } from '../interfaces/dto/UserDTO'
import AuthService from '../services/auth.Service'

@injectable()
export class AuthController {
  private readonly _authService: AuthService
  constructor(authService: AuthService) {
    this._authService = authService
  }
  login(req: IRequest, res: IResponse) {
    const userRequestDto = req.body as IUserRequestDTO
    const login = this._authService.login(userRequestDto)
    return res.success(login)
  }
  register(req: IRequest, res: IResponse) {
    return res.success('Register success')
  }
}

export default AuthController
