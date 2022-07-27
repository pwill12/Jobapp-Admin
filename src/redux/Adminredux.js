import { createSlice } from "@reduxjs/toolkit";
const recruiterSlice = createSlice({
    name: "recruiter",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        loginStart: (state) => {
            state.isFetching = true;
        },
        loginSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload;
            state.error = false
        },
        loginFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.error = null;
        },
    },
});

export const { loginStart, loginSuccess, loginFailure, logout } = recruiterSlice.actions;
export default recruiterSlice.reducer;