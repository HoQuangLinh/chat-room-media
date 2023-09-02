import { io, Socket } from 'socket.io-client'
import { baseApiUrl } from '../const/apiEndpoint'

class SocketService {
  private socketInstance: Socket | null
  constructor() {
    this.socketInstance = null
  }
  getSocketInstance(): Socket {
    if (!this.socketInstance) {
      this.socketInstance = io(baseApiUrl)
    }
    return this.socketInstance
  }
}

const socketService = new SocketService()
export default socketService
