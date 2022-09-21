import { createSlice } from '@reduxjs/toolkit';
import authAsyncActions from './asyncActions/movieAsyncActions';

export type MovieItem = {
  image: string;
  year: string;
  title: string;
};

export type MoviesData = {
  results: Array<MovieItem>;
  total: number;
};

type MovieState = {
  moviesData: MoviesData;
};

const initialState: MovieState = {
  moviesData: {} as MoviesData,
};

const MovieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    clearMovie(state) {
      state.moviesData = {} as MoviesData;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      authAsyncActions.getMovies.fulfilled,
      (state, { payload }) => {
        state.moviesData = payload;
      },
    );
  },
});

export const { clearMovie } = MovieSlice.actions;

export default MovieSlice.reducer;
