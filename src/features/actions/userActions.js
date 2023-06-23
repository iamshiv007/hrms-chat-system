import axios from "axios"
import { loginFailed, loginStart, loginSuccess, signupFailed, signupStart, signupSuccess, userLoadFailed, userLoadStart, userLoadSuccess } from "../slices/userSlice";
import { allUsersFailed, allUsersRequest, allUsersSuccess } from "../slices/usersSlice";

// 1. Login
export const login = (userData) => async (dispatch) => {
    dispatch(loginStart());
    try {
        // Make API request for login
        const { data } = await axios.post("http://localhost:7070/api/user/login", userData);
        dispatch(loginSuccess(data));
    } catch (error) {
        dispatch(loginFailed(error.message));
    }
};

// 2. Signup
export const register = (userData) => async (dispatch) => {
    dispatch(signupStart());
    try {
        // Make API request for signup
        const { data } = await axios.post("http://localhost:7070/api/user/register", userData);
        dispatch(signupSuccess(data));
    } catch (error) {
        dispatch(signupFailed(error.message));
    }
};


// 3. Load user
export const loadUser = () => async (dispatch) => {
    dispatch(userLoadStart())
    try {
        // Make API request for load user
        const { data } = await axios.get(`http://localhost:7070/api/user/me`)
        dispatch(userLoadSuccess(data))

    } catch (error) {
        dispatch(userLoadFailed(error.message))
    }
}

// 3. Get All Users
export const getAllUsers = () => async (dispatch) => {
    dispatch(allUsersRequest())
    try {
        // Make API request for load user
        const { data } = await axios.get(`http://localhost:7070/api/users`)
        dispatch(allUsersSuccess(data))

    } catch (error) {
        dispatch(allUsersFailed(error.message))
    }
}