import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchUserList = createAsyncThunk('userList/fetchUserList', async ({ page, perPage }) => {
  const response = await api.get(`/users?page=${page}&per_page=${perPage}`);
  return response.data;
});
const userListSlice = createSlice({
  name: 'userList',
  initialState: { data: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserList.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUserList.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userListSlice.reducer;
