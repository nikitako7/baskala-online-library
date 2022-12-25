import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    language: 'tt',
};

export const languageSlice = createSlice({
    name: "language",
    initialState,
    reducers: {
      setLanguage(state, action) {
        const { payload } = action;
        state.language = payload;
      },

      extraReducers: {
        [HYDRATE]: (state, action) => {
          return {
            ...state,
            ...action.payload.language,
          };
        },
      },
  
    },
});

export const languageSelector = (state) => state.language.language;

const { actions, reducer } = languageSlice;

export const { setLanguage } = actions;

export default reducer;
