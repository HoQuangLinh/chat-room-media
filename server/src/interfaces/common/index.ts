import { Request, Response } from 'express'
export interface IRequest extends Request {}
export interface IResponse extends Response {
  success<T>(data: T): IResponse
  error(
    message?: string,
    messageDetail?: string,
    statusCode?: number
  ): IResponse
}
