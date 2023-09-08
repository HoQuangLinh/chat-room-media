export type TRoomVisibility = 'public' | 'private'
export interface IFormCreateRoom {
  name: string
  visibility: TRoomVisibility
  members: string[]
}

export interface IFormAddMember {
  roomId: string
  members: string[]
}
