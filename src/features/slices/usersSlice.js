import { createSlice } from "@reduxjs/toolkit";


const usersSlice = createSlice({
    name: 'auth',
    initialState: {
        users: [],
        isLoading: false,
        error: null,
    },
    reducers: {
        allUsersRequest: (state) => ({ ...state, isLoading: true }),
        allUsersSuccess: (state, action) => ({ ...state, isLoading: false, users: action.payload.users }),
        allUsersFailed: (state, action) => ({ ...state, isLoading: false, error: action.payload })
    }
})

export const {
    allUsersRequest,
    allUsersSuccess,
    allUsersFailed
} = usersSlice.actions;

export default usersSlice.reducer;
