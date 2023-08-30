import { authEndpoint } from '../const/apiEndpoint'
import { IFormLogin, IFormRegister } from '../interfaces/Form'
import http from './httpService'

class AuthService {
  async login(user: IFormLogin) {
    const res = await http.post(authEndpoint.login, user)
    return res.data.data
  }
  async register(user: IFormRegister) {
    const res = await http.post(authEndpoint.register, user)
    return res.data.data
  }
}

export const authService = new AuthService()
