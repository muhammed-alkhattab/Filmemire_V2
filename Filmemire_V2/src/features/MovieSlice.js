import { createSlice } from '@reduxjs/toolkit';

const moviesSlice = createSlice({
  name: 'movies',
  initialState: {
    movies: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    fetchMoviesStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchMoviesSuccess: (state, action) => {
      state.movies = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    fetchMoviesFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMoviesStart,
  fetchMoviesSuccess,
  fetchMoviesFailure,
} = moviesSlice.actions;

export default moviesSlice.reducer;