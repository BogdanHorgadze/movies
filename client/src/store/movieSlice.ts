import { createSlice } from '@reduxjs/toolkit';
import authAsyncActions from './asyncActions/movieAsyncActions';

type MovieItem = {
  image: string;
  year: string;
  title: string;
};

type MoviesData = {
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
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      authAsyncActions.getMovies.fulfilled,
      (state, { payload }: any) => {
        state.moviesData = payload.data;
      }
    );
  },
});

export default MovieSlice.reducer;
