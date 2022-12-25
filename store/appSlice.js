import { createSlice } from "@reduxjs/toolkit";
import { AppState } from "./store";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
    books: [],
    filteredBooks: [],
    popularBooks: [],
    popularCount: []
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
      setPopular(state, action) {
        const { payload } = action;
        state.popularBooks = [...state.popularBooks, payload];
      },
      setPopularCount(state, action) {
        const { payload } = action;
        const sorted = [...state.popularCount, payload].sort((a, b) => b.count - a.count);
        console.log(sorted, 'sorted');
        state.popularCount = sorted;
      },

  
      // Special reducer for hydrating the state. Special case for next-redux-wrapper
      extraReducers: {
        [HYDRATE]: (state, action) => {
          return {
            ...state,
            ...action.payload.filteredBooks,
            ...action.payload.books,
            ...action.payload.popularBooks,
            ...action.payload.popularCount
          };
        },
      },
  
    },
});

export const filterSelector = (state) => state.app.filteredBooks;
export const popularSelector = (state) => state.app.popularBooks;
export const popularCountSelector = (state) => state.app.popularCount;
export const bookSelector = (state) => state.app.books;

const { actions, reducer } = appSlice;

export const {
    setFilters,
    setBooks,
    setPopular,
    setPopularCount
} = actions;

export default reducer;
