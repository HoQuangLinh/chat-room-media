import { IUserStore } from '@/interfaces/stores/IUserStore'
import userReducer from '@/redux/reducers/user.reducer'
import { configureStore } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
export interface IRootSate {
  user: IUserStore
}

const store = configureStore({
  reducer: {
    user: userReducer
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
