import { userEndpoint } from '@/const/apiEndpoint'
import { IUserResponse } from '@/interfaces/api/User'
import http from './http.service'
import { IApiResponse } from '../interfaces/api/Http'

class UserService {
  async getAllUser(): Promise<IUserResponse[]> {
    const res = await http.get<IApiResponse<IUserResponse[]>>(
      userEndpoint.getAllUsers
    )
    return res.data.data
  }
}

export default new UserService()
