
import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { appSlice } from "./appSlice";
import { languageSlice } from "./languageSlice";
import { createWrapper } from "next-redux-wrapper";

const makeStore = () =>
  configureStore({
    reducer: {
      [appSlice.name]: appSlice.reducer,
      [languageSlice.name]: languageSlice.reducer
    },
    devTools: true,
});

export const wrapper = createWrapper(makeStore);