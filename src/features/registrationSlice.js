import { createSlice } from '@reduxjs/toolkit';

const registrationSlice = createSlice({
  name: 'registration',
  initialState: {
    registrationData: null,
    registrationSuccessData: null,
  },
  reducers: {
    setRegistrationData: (state, action) => {
      state.registrationData = action.payload;
    },
    setRegistrationSuccessData: (state, action) => {
      state.registrationSuccessData = action.payload;
    },
  },
});

export const { setRegistrationData, setRegistrationSuccessData } = registrationSlice.actions;

export default registrationSlice.reducer;
