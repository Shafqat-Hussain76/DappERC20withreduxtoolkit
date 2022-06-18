import { combineReducers } from "@reduxjs/toolkit";
import { appreducer } from "./appreducer";

export const rootreducer = combineReducers({
    finalappreducer : appreducer,
})