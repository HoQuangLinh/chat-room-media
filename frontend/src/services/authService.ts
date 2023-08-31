import { authEndpoint } from '@/const/apiEndpoint'
import { IFormLogin, IFormRegister } from '@/interfaces/auth/Auth'
import { IApiResponse } from '@/interfaces/api/Http'
import http from './httpService'

class AuthService {
  async login(user: IFormLogin): Promise<string> {
    const res = await http.post<IApiResponse<string>>(authEndpoint.login, user)
    return res.data.data
  }
  async register(user: IFormRegister): Promise<string> {
    const res = await http.post<IApiResponse<string>>(
      authEndpoint.register,
      user
    )
    return res.data.data
  }
}

export const authService = new AuthService()
