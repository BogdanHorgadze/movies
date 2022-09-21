import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiInstance } from '../../api/instance';
import { MoviesData } from '../movieSlice';

type Params = {
  search: string;
};

const getMovies = createAsyncThunk<MoviesData, Params>(
  'movies/getMovies',
  async (params: Params, { rejectWithValue }) => {
    try {
      const { data } = await ApiInstance.get('movies', { params });
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const createMovies = createAsyncThunk(
  'movies/createMovies',
  async (body: any, { rejectWithValue }) => {
    try {
      return await ApiInstance.post('movies/create', body, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${body._boundary}`,
        },
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  },
);

const authAsyncActions = {
  getMovies,
  createMovies,
};

export default authAsyncActions;
