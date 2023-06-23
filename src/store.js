import { configureStore } from "@reduxjs/toolkit";
import ThunkMiddleware from "redux-thunk";
import userReducer from './features/slices/userSlice'
import usersReducer from './features/slices/usersSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        users: usersReducer
    },
    middleware: [ThunkMiddleware]
})