import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApiInstance } from '../../api/instance';

type Body = {
  email: string;
  password: string;
};

const registerationUser = createAsyncThunk(
  'auth/registrationUser',
  async (body: Body, { rejectWithValue }) => {
    try {
      return await ApiInstance.post('auth/registration', body);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (body: Body, { rejectWithValue }) => {
    try {
      const res = await ApiInstance.post('auth/login', body);
      localStorage.setItem('token', res.data.token);
      return res;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const authAsyncActions = {
  registerationUser,
  loginUser,
};

export default authAsyncActions;
