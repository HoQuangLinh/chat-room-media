import jwt_decode from 'jwt-decode'

interface IDecodeToken {
  userId: string
  iat: number
  exp: number
}

export function isValidToken(token: string): boolean {
  try {
    const decode: IDecodeToken = jwt_decode(token, {})
    const currentDate = Date.now() / 1000
    return !!decode.userId && decode.exp > currentDate
  } catch (error) {
    console.log(error)
    return false
  }
}
