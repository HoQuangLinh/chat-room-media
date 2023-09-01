import { IRoomStore } from '@/interfaces/stores/RoomStore'
import { IUserStore } from '@/interfaces/stores/UserStore'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import roomReducer from './room.reducer'
import userReducer from './user.reducer'
export interface IRootSate {
  user: IUserStore
  room: IRoomStore
}

const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer
  }
})

export const useRootSelector = <T>(
  selector: (state: IRootSate) => T,
  defaultValue?: T
): T | undefined => {
  try {
    const value = useSelector(selector)
    return value || defaultValue
  } catch (error) {
    return defaultValue
  }
}
export default store
