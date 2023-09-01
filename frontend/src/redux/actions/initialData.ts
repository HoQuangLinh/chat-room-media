import { Dispatch } from '@reduxjs/toolkit'
import { roomService } from '../../services/room.service'
import { setMyOwnerRooms, setMyRooms } from '../reducers/room.reducer'

type TUserParams = {
  _id: string
  followers: []
}

export const initialData = () => async (dispatch: Dispatch) => {
  try {
    const [myRoom, myOwnerRoom] = await Promise.all([
      roomService.getMyRooms(),
      roomService.getMyOwnerRooms()
    ])
    dispatch(setMyRooms(myRoom))
    dispatch(setMyOwnerRooms(myOwnerRoom))
  } catch (error) {
    dispatch(setMyOwnerRooms([]))
    dispatch(setMyOwnerRooms([]))
    // Handle any errors here
  }
}
