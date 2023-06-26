import { createSlice } from "@reduxjs/toolkit";


const messageSlice = createSlice({
    name: 'message',
    initialState: {
        isMessageCreated: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        newMessageRequest: (state) => ({ ...state, isLoading: true }),
        newMessageSuccess: (state, action) => ({ ...state, isLoading: false, isMessageCreated: action.payload.success }),
        newMessageFailed: (state, action) => ({ ...state, isLoading: false, error: action.payload })
    }
})

export const {
    newMessageRequest,
    newMessageSuccess,
    newMessageFailed
} = messageSlice.actions;

export default messageSlice.reducer;
