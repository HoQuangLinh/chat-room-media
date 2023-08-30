import { IUserStore } from '@/interfaces/stores/IUserStore'
import { createSlice } from '@reduxjs/toolkit'

const initialState: IUserStore = {
  username: '',
  userId: ''
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      return {
        ...action.payload
      }
    }
  }
})

export const { setUser } = userSlice.actions
export default userSlice.reducer
