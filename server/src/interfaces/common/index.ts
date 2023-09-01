import { Request, Response } from 'express'
import { IUserRegisterRequestDTO } from '../dto/UserDTO'
export interface IRequest extends Request {
  user: any
}
export interface IResponse extends Response {
  success<T>(data: T): IResponse
  error(
    message?: string,
    messageDetail?: string,
    statusCode?: number
  ): IResponse
}
