import { configureStore } from '@reduxjs/toolkit'
import messageReducer from './slice'

export default configureStore({
  reducer: {
    messages: messageReducer,
  },
})