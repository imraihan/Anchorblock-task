import api from '../services/api';
import { setUser, setToken, logout } from './authSlice';

export const login = (credentials) => async (dispatch) => {
  try {
    const response = await api.post('/login', credentials);
    dispatch(setUser(response.data.email));
    dispatch(setToken(response.data.token));
  } catch (error) {
    console.log(error);
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logout());
};




