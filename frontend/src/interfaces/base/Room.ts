import { IUser } from './User'

export type TVisibility = 'public' | 'private'
export interface IRoom {
  _id: string
  name: string
  visibility: TVisibility
  created_at?: string
  members?: IUser[]
}
