import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    books: [],
    filteredBooks: []
};

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
  
      // Action to set the authentication status
      setFilters(state, action) {
        const { payload } = action;
        state.filteredBooks = payload;
      },
      setBooks(state, action) {
        const { payload } = action;
        state.books = payload;
      },
  
      // Special reducer for hydrating the state. Special case for next-redux-wrapper
      extraReducers: {
        [HYDRATE]: (state, action) => {
          return {
            ...state,
            ...action.payload.filteredBooks,
            ...action.payload.books
          };
        },
      },
  
    },
});

export const filterSelector = (state) => state.app.filteredBooks;
export const bookSelector = (state) => state.app.books;

const { actions, reducer } = appSlice;

export const {
    setFilters,
    setBooks
} = actions;

export default reducer;
