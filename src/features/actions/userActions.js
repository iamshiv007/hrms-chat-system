import axios from "axios"
import { loginFailed, loginStart, loginSuccess, signupFailed, signupStart, signupSuccess, userLoadFailed, userLoadStart, userLoadSuccess } from "../slices/userSlice";
import { allUsersFailed, allUsersRequest, allUsersSuccess } from "../slices/usersSlice";

// 1. Login
export const login = (userData) => async (dispatch) => {
    dispatch(loginStart());
    try {
        // Make API request for login
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/login`, userData);
        dispatch(loginSuccess(data));
    } catch (error) {
        alert(error.response?.data.message)
        dispatch(loginFailed(error.response?.data.message));
    }
};

// 2. Signup
export const register = (userData) => async (dispatch) => {
    dispatch(signupStart());
    try {
        // Make API request for signup
        const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/user/register`, userData);
        dispatch(signupSuccess(data));
    } catch (error) {
        alert(error.response.data.message)
        dispatch(signupFailed(error.response.data.message));
    }
};


// 3. Load user
export const loadUser = () => async (dispatch) => {
    dispatch(userLoadStart())
    try {
        // Make API request for load user
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/user/me`)
        dispatch(userLoadSuccess(data))

    } catch (error) {
        alert(error.response?.data.message)
        dispatch(userLoadFailed(error.response?.data.message))
    }
}

// 3. Get All Users
export const getAllUsers = () => async (dispatch) => {
    dispatch(allUsersRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`)
        dispatch(allUsersSuccess(data))

    } catch (error) {
        alert(error?.response?.data.message)
        dispatch(allUsersFailed(error?.response?.data.message))
    }
}