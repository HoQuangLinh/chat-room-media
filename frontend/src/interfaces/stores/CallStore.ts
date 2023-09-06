export interface ICallPayload {
  sender: string
  roomId: string
  username: string
  isVideo: boolean
  peerId?: string
}
export interface ICallStore {
  calling: ICallPayload | null
}
