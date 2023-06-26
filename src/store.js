import { configureStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import userReducer from './features/slices/userSlice'
import usersReducer from './features/slices/usersSlice'
import messageSlice from "./features/slices/messageSlice";
import messagesSlice from "./features/slices/messagesSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer,
        message: messageSlice,
        messages: messagesSlice
    },
    middleware: [ThunkMiddleware]
})