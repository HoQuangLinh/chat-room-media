export interface ICallPayload {
  sender: string
  roomId: string
  username: string
  isVideo: boolean
  peerId?: string
  peerInfos?: {
    username: string
    peerId: string
  }[]
}
export interface ICallStore {
  calling: ICallPayload | null
}
