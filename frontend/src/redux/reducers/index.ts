import { ICallStore } from '@/interfaces/stores/CallStore'
import { IRoomStore } from '@/interfaces/stores/RoomStore'
import { IUserStore } from '@/interfaces/stores/UserStore'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import roomReducer from './room.reducer'
import userReducer from './user.reducer'
import callReducer from './call.reducer'
export interface IRootSate {
  user: IUserStore
  room: IRoomStore
  call: ICallStore
}

const store = configureStore({
  reducer: {
    user: userReducer,
    room: roomReducer,
    call: callReducer
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
