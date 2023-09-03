import { IUser } from './User'
type TMember = {
  _id: string
  username: string
}

export type TVisibility = 'public' | 'private'
export interface IRoom {
  _id: string
  name: string
  visibility: TVisibility
  createdAt?: string
  members?: TMember[]
  receiveMessage?: boolean
}
