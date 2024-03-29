import { createSlice } from '@reduxjs/toolkit'

export const messageSlice = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
    username: null,
  },
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload
    },
    addMessage: (state, action) => {
      const message = action.payload
      if (!state.messages.some(m => m.username === message.username && m.text === message.text)) {
        state.messages.push(message)
      }
    },
  },
});

export const { setUsername, addMessage } = messageSlice.actions

export default messageSlice.reducer
