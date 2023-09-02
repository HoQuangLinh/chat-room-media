import { IUser } from '../base/User'

export interface IUserStore extends IUser {
  isAuthenticated: boolean
}
