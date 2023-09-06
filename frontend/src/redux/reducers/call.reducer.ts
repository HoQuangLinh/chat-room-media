import { createSlice } from '@reduxjs/toolkit'
import { ICallStore } from '../../interfaces/stores/CallStore'

const initialState: ICallStore = {
  calling: null
}

const callSlice = createSlice({
  name: 'call',
  initialState: initialState,
  reducers: {
    createCall: (state, action) => {
      return {
        ...state,
        calling: action.payload
      }
    }
  }
})

export const { createCall } = callSlice.actions
export default callSlice.reducer
