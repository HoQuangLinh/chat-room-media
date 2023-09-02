export const baseApiUrl = 'http://localhost:5000'
export const authEndpoint = {
  login: 'api/auth/login',
  register: 'api/auth/register'
}

export const userEndpoint = {
  getAllUsers: 'api/user/getAllUsers'
}

export const roomEndpoint = {
  createRoom: 'api/room/createRoom',
  getMyOwnerRooms: 'api/room/getMyOwnerRooms',
  getMyRooms: 'api/room/getMyRooms'
}

export const messageEndpoint = {
  sendMessageToRoom: 'api/message/sendMessageToRoom',
  getMessageByRoomId: 'api/message/getMessageByRoomId'
}
