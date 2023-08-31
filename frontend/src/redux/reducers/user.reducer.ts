import { IUserStore } from '@/interfaces/stores/IUserStore'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IUserStore = {
  username: '',
  userId: '',
  isAuthenticated: false
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setIsAuthenticate: (state, action) => {
      return {
        ...state,
        isAuthenticated: action.payload
      }
    },
    setUser: (state, action) => {
      return {
        ...state,
        ...action.payload
      }
    }
  }
})

export const { setUser, setIsAuthenticate } = userSlice.actions
export default userSlice.reducer
