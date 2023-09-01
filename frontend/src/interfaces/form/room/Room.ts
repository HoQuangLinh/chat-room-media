export type TRoomVisibility = 'public' | 'private'
export interface IFormCreateRoom {
  name: string,
  visibility: TRoomVisibility,
  members:string[]
}
