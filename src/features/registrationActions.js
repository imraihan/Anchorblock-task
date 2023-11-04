import api from '../services/api';
import { setRegistrationData, setRegistrationSuccessData } from './registrationSlice';

export const register = (userData) => async (dispatch) => {
  try {
    const response = await api.post('/register', userData);
    dispatch(setRegistrationData(userData));
    dispatch(setRegistrationSuccessData(response.data));
  } catch (error) {
    console.error('Registration failed:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
};
