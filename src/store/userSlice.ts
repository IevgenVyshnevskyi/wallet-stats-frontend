import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { IUser, LoginFormData, LoginResponse, RegisterFormData } from './types';
import { BASE_URL, LOGIN_PATH, LOGOUT_PATH, REGISTER_PATH, USER_DETAILS_PATH } from '../api/api';
import { formatRegisterErrorMessage } from '../shared/utils/formatRegisterErrorMessage';
import { formatLoginErrorMessage } from './../shared/utils/formatLoginErrorMessage';

type UserState = {
  user: IUser;
  isLoading: boolean;
  isLoggedIn: boolean;
  isRegistered: boolean;
  loginError: string | null;
  logoutError: string | null;
  getDetailsError: string | null;
  registerError: string | null;
}

export const registerUser = createAsyncThunk<IUser, RegisterFormData, { rejectValue: string }>(
  'user/registerUser',
  async function (registerData, { rejectWithValue }) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const response = await fetch(`${BASE_URL}${REGISTER_PATH}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      const errorMessage = formatRegisterErrorMessage(await response.json());
      return rejectWithValue(errorMessage);
    }

    return (await response.json()) as IUser;
  }
);

export const loginUser = createAsyncThunk<LoginResponse, LoginFormData, { rejectValue: string }>(
  'user/loginUser',
  async function (loginData, { rejectWithValue}) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const response = await fetch(`${BASE_URL}${LOGIN_PATH}`, {
      method: 'POST',
      headers: myHeaders,
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
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    const response = await fetch(`${BASE_URL}${LOGOUT_PATH}`, {
      method: 'GET',
      headers: myHeaders,
    });

    if (!response.ok) {
      return rejectWithValue(await response.text());
    }

    return;
  }
);

export const getUserDetails = createAsyncThunk<IUser, undefined, { rejectValue: string }>(
  'user/getUserDetails',
  async function (loginData, { rejectWithValue }) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    console.log(JSON.stringify(loginData))

    const response = await fetch(`${BASE_URL}${USER_DETAILS_PATH}`, {
      method: 'GET',
      headers: myHeaders,
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t get user details. Server error.');
    }

    return (await response.json()) as IUser;
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
        state.user = action.payload;
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
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.getDetailsError = null;
      })
  }
});

export default userSlice.reducer;