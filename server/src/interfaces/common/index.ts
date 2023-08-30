import { Request, Response } from 'express'
export interface IRequest extends Request {}
export interface IResponse extends Response {
  success<T>(data: T): IResponse
  error(
    statusCode?: number,
    message?: string,
    messageDetail?: string
  ): IResponse
}
