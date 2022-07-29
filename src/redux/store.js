import { configureStore, combineReducers } from "@reduxjs/toolkit";
import recruiterreducer from './Adminredux'
import recruiterpostreducer from './Recruitpost'
import updatestokenreducer from './Update'
import Loading from "./Loading";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "root",
    version: 1,
    storage,
    blacklist: ['loadingdata']

};

const rootReducer = combineReducers({ recruiter: recruiterreducer, recruiterpost: recruiterpostreducer, updatestoken: updatestokenreducer,loadingdata: Loading});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);