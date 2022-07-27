import { createSlice } from "@reduxjs/toolkit";

const updatesSlice = createSlice({
    name: "updatestoken",
    initialState: {
        updates: null,
        isFetching: false,
        error: false,
    },
    reducers: {
        updateStart: (state) => {
            state.isFetching = true;
        },
        updateSuccess: (state, action) => {
            state.isFetching = false;
            state.updates = action.payload
            state.error = false;

        },
        updateFailure: (state) => {
            state.isFetching = false;
            state.error = true;
            state.updates = null
        },
        updatedout: (state) => {
            state.updates = null;
            state.error = false;
        },
    },
});

export const { updateStart, updateSuccess, updateFailure, updatedout } = updatesSlice.actions;
export default updatesSlice.reducer;