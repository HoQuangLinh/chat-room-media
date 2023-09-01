import { IRoom } from '../base/Room'

export interface IRoomStore {
  myRooms: IRoom[]
  myOwnerRooms: IRoom[]
}
