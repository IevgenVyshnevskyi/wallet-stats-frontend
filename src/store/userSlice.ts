import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { IUser, LoginFormData, LoginResponse, RegisterFormData } from './types';
import { $api, BASE_URL, LOGIN_PATH, LOGOUT_PATH, REGISTER_PATH, USER_DETAILS_PATH } from '../api/api';
import { formatRegisterErrorMessage } from '../shared/utils/formatRegisterErrorMessage';
import { formatLoginErrorMessage } from './../shared/utils/formatLoginErrorMessage';
import axios from 'axios';

export type UserState = {
  user: IUser;
  isLoading: boolean;
  isLoggedIn: boolean;
  isRegistered: boolean;
  loginError: string | null;
  logoutError: string | null;
  getDetailsError: string | null;
  registerError: string | null;
}

export const registerUser = createAsyncThunk<any, RegisterFormData, { rejectValue: string }>(
  'user/registerUser',
  async function (registerData, { rejectWithValue }) {
    return $api.post(REGISTER_PATH, registerData)
      .then(response => {
        const token = response.data.token;
        localStorage.setItem('token', token);

        return token;
      })
      .catch(error => {
        const errorMessage = formatRegisterErrorMessage(error.response.data);
        return rejectWithValue(errorMessage);
      });
  }
);

export const loginUser = createAsyncThunk<LoginResponse, LoginFormData, { rejectValue: string }>(
  'user/loginUser',
  async function (loginData, { rejectWithValue }) {
    const loginUserHeaders = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": `Token ${localStorage.getItem('token')}`,
    };

    const response = await fetch(`${BASE_URL}${LOGIN_PATH}`, {
      method: 'POST',
      headers: loginUserHeaders,
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      const errorMessage = formatLoginErrorMessage(await response.json());
      return rejectWithValue(errorMessage);
    }

    return (await response.json()) as LoginResponse;
  }
);

export const logoutUser = createAsyncThunk<undefined, undefined, { rejectValue: string }>(
  'user/logoutUser',
  async function (_, { rejectWithValue }) {
    const response = await fetch(`${BASE_URL}${LOGOUT_PATH}`, {
      method: 'GET',
      // headers: myHeaders,
    });

    localStorage.removeItem('token');


    if (!response.ok) {
      return rejectWithValue(await response.text());
    }

    return;
  }
);

export const getUserDetails = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
  'user/getUserDetails',
  async function (_, { rejectWithValue }) {
    const getUserDetailsHeaders = {
      "Authorization": `Token ${localStorage.getItem('token')}`,
    };

    const response = await axios({
      headers: getUserDetailsHeaders,
      method: "GET",
      url: `${BASE_URL}${USER_DETAILS_PATH}`,
    })
      .then(res =>  res.data)
      .catch(error => {
        const errorMessage = error.response.data;
        return rejectWithValue(errorMessage);
      });

    return (await response) as IUser;
  }
);

const initialState: UserState = {
  user: null,
  isLoading: false,
  isRegistered: false,
  isLoggedIn: false,
  registerError: null,
  loginError: null,
  logoutError: null,
  getDetailsError: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isRegistered = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.payload;
        state.isLoading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.loginError = action.payload;
      })

      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.logoutError = action.payload;
      })

      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.getDetailsError = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.getDetailsError = null;
        localStorage.setItem('userData', JSON.stringify(action.payload))
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.getDetailsError = action.payload;
      })
  }
});

export default userSlice.reducer;