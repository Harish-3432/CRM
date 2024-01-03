import { combineReducers } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import taskSlicesReducers from "./Slices/taskSlices";
import headerSlicesReducers from "./Slices/headerSlices";

const rootReducer = combineReducers(
    {
        task : taskSlicesReducers,
        header : headerSlicesReducers
    });

export const store = configureStore({
    reducer:rootReducer,
    middleware:getDefaultMiddleware =>
    getDefaultMiddleware({
        serializableCheck: false,
    }),
})