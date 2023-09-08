import { createSlice } from '@reduxjs/toolkit'
import { IRoomStore } from '@/interfaces/stores/RoomStore'

const initialState: IRoomStore = {
  myRooms: [],
  myOwnerRooms: []
}

const roomSlice = createSlice({
  name: 'room',
  initialState: initialState,
  reducers: {
    createRoom: (state, action) => {
      return {
        ...state,
        myRooms: [action.payload, ...state.myRooms],
        myOwnerRooms: [action.payload, ...state.myOwnerRooms]
      }
    },
    addMembersToRoom: (state, action) => {
      const { _id, members } = action.payload
      const myOwnerRooms = [...state.myOwnerRooms]
      const roomIndex = myOwnerRooms.findIndex((item) => item._id === _id)

      if (roomIndex !== -1) {
        myOwnerRooms[roomIndex] = {
          ...myOwnerRooms[roomIndex],
          members
        }
      }

      return {
        ...state,
        myOwnerRooms: [...myOwnerRooms]
      }
    },
    setMyRooms: (state, action) => {
      return {
        ...state,
        myRooms: [...action.payload]
      }
    },
    setMyOwnerRooms: (state, action) => {
      return {
        ...state,
        myOwnerRooms: [...action.payload]
      }
    },
    receiveMessage: (state, action) => {
      const roomId = state.myRooms.findIndex(
        (item) => item._id === action.payload.roomId
      )
      const newRooms = [...state.myRooms]
      newRooms[roomId] = {
        ...newRooms[roomId],
        receiveMessage: true
      }
      return {
        ...state,
        myRooms: newRooms
      }
    }
  }
})

export const {
  createRoom,
  setMyRooms,
  setMyOwnerRooms,
  receiveMessage,
  addMembersToRoom
} = roomSlice.actions
export default roomSlice.reducer
