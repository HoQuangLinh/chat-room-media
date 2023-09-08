export type TVisibility = 'public' | 'private'
export interface ICreateRoomRequestDTO {
  name: string
  creator: string
  visibility: TVisibility
  members?: string[]
}

export interface IFormAddMember {
  creator: string
  roomId: string
  members: string[]
}
