import { createSlice } from "@reduxjs/toolkit";

const sendRequest = (state) => ({ ...state, isLoading: true })


const requestSuccess = (state, action) => ({ ...state, isLoading: false, isAuthenticated: true, user: action.payload.user })


const requestFailed = (state, action) => ({ ...state, isLoading: false, error: action.payload })

const userSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        loginStart: sendRequest,
        signupStart: sendRequest,
        userLoadStart: sendRequest,

        loginSuccess: requestSuccess,
        signupSuccess: requestSuccess,
        userLoadSuccess: requestSuccess,

        loginFailed: requestFailed,
        signupFailed: requestFailed,
        userLoadFailed: requestFailed,
        logout: (state) => {
            return {
                ...state,
                isLoading: false,
                isAuthenticated: false,
                user: null
            }
        }
    },
});

export const {
    loginStart,
    loginSuccess,
    loginFailed,
    logout,
    signupStart,
    signupSuccess,
    signupFailed,
    userLoadStart,
    userLoadSuccess,
    userLoadFailed
} = userSlice.actions;

export default userSlice.reducer;

