import { createSlice } from '@reduxjs/toolkit';
import authAsyncActions from './asyncActions/authAsyncActions';

type AuthState = {
  token: string;
};

const initialState: AuthState = {
  token: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      authAsyncActions.loginUser.fulfilled,
      (state, { payload }) => {
        state.token = payload.data.token;
      }
    );
  },
});

export default authSlice.reducer;
