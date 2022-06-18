import { configureStore } from "@reduxjs/toolkit";
import { rootreducer } from "./redux/rootreducer";

export const store = configureStore({
    reducer: rootreducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false
    }),   
})