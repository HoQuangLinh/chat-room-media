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
        (item) => item._id === action.payload
      )
      const newRooms = { ...state.myRooms }
      newRooms[roomId] = {
        ...newRooms[roomId],
        receiveMessage: false
      }
      return {
        ...state,
        myRooms: newRooms
      }
    }
  }
})

export const { createRoom, setMyRooms, setMyOwnerRooms } = roomSlice.actions
export default roomSlice.reducer
