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
        myRooms: [...state.myRooms, action.payload],
        myOwnerRooms: [...state.myRooms, action.payload]
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
    }
  }
})

export const { createRoom, setMyRooms, setMyOwnerRooms } = roomSlice.actions
export default roomSlice.reducer
