import { createSlice } from '@reduxjs/toolkit'

const loadingdata = createSlice({
    name: "loadingdata",
    initialState: {
        fetchingapi: false,
        successapi: false,
        failureapi: false
    },
    reducers: {
        loadingfetchings: (state) => {
            state.fetchingapi = true
        },
        successfullyloaded: (state, action) => {
            state.fetchingapi = false
            state.successapi = true
            state.failureapi = false

        },
        failureloading: (state) => {
            state.successapi = null
            state.failureapi = true
            state.fetchingapi = false
        },
    },
});

export const { loadingfetchings, successfullyloaded, failureloading } = loadingdata.actions;
export default loadingdata.reducer;;