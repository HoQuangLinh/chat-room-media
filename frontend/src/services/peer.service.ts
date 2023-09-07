import Peer from 'peerjs'

class PeerService {
  private peerInstance: Peer | null
  constructor() {
    this.peerInstance = new Peer({
      path: '/',
      secure: true
    })
  }

  getPeerInstance() {
    return this.peerInstance
  }
}

const peerService = new PeerService()
export default peerService
