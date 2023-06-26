import { createSlice } from "@reduxjs/toolkit";


const messagesSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        twoPersonMessagesRequest: (state) => ({ ...state, isLoading: true }),
        twoPersonMessagesSuccess: (state, action) => ({ ...state, isLoading: false, messages: action.payload.messages }),
        twoPersonMessagesFailed: (state, action) => ({ ...state, isLoading: false, error: action.payload })
    }
})

export const {
    twoPersonMessagesRequest,
    twoPersonMessagesSuccess,
    twoPersonMessagesFailed
} = messagesSlice.actions;

export default messagesSlice.reducer;
