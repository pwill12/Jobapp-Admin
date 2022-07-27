import { createSlice } from "@reduxjs/toolkit";
const recruiterpostSlice = createSlice({
    name: "recruiterpost",
    initialState: {
        post: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        postStart: (state) => {
            state.isFetching = true;
        },
        postSuccess: (state, action) => {
            state.isFetching = false;
            state.post = action.payload;
            state.error = false
        },
        postFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        deletepost: (state) => {
            state.post = null;
            state.error = false;
        },
    },
});

export const { postStart, postSuccess, postFailure, deletepost } = recruiterpostSlice.actions;
export default recruiterpostSlice.reducer;