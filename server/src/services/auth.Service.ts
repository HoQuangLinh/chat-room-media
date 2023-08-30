import {
  IUserRequestDTO,
  IUserResponseDTO
} from '../interfaces/dto/UserDTO'
import { injectable } from 'tsyringe'
import 'reflect-metadata'
@injectable()
export default class AuthService {
  login(userDto: IUserRequestDTO): IUserResponseDTO {
    const { username, password } = userDto
    if (!username || !password) {
      throw new Error('username or password not found')
    }
    return {
      userId: '1',
      token: 'aaa'
    }
  }
}
