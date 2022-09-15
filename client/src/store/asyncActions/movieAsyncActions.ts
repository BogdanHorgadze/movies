import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiInstance } from '../../api/instance';

type Params = {
  search: string;
};

const getMovies = createAsyncThunk(
  'movies/getMovies',
  async (params: Params, { rejectWithValue }) => {
    try {
      return await ApiInstance.get('movies', { params });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const createMovies = createAsyncThunk(
  'movies/createMovies',
  async (body: any, { rejectWithValue }) => {
    try {
      return await ApiInstance.post('movies/upload', body, {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${body._boundary}`,
        },
      });
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authAsyncActions = {
  getMovies,
  createMovies,
};

export default authAsyncActions;
