import jwt_decode from 'jwt-decode'
import { keyStorage } from '../const/keyStorage'

export interface IUserPayload {
  userId: string
  username: string
  iat: number
  exp: number
}

export function isValidToken(token: string): boolean {
  try {
    const decode: IUserPayload = jwt_decode(token, {})
    const currentDate = Date.now() / 1000
    return !!decode.userId && decode.exp > currentDate
  } catch (error) {
    console.log(error)
    return false
  }
}

export function decodeTokenFromLocalStorage(): IUserPayload | null | undefined {
  try {
    const token = localStorage.getItem(keyStorage.accessToken)
    if (!token) {
      return null
    }
    const decode: IUserPayload = jwt_decode(token, {})
    const currentDate = Date.now() / 1000
    if (!!decode.userId && decode.exp > currentDate) {
      return decode
    }
  } catch (error) {
    console.log(error)
    return null
  }
}
