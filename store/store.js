
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { appSlice } from "./appSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [appSlice.name]: appSlice.reducer,
    },
    devTools: true,
});

export const wrapper = createWrapper(makeStore);