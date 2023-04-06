import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { IUser, LoginFormData, LoginResponse, RegisterFormData } from './types';
import { LOCAL_STORAGE_USER_KEY } from '../consts/localStorage';
import { BASE_URL, LOGIN_PATH, REGISTRAION_PATH } from '../api/api';

type userState = {
  user: IUser;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

export const registerUser = createAsyncThunk<IUser, RegisterFormData, { rejectValue: string }>(
  'user/registerUser',
  async function (registerData, { rejectWithValue }) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    console.log(JSON.stringify(registerData))

    const response = await fetch(`${BASE_URL}${REGISTRAION_PATH}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(registerData),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t create user. Server error.');
    }

    return (await response.json()) as IUser;
  }
);

export const loginUser = createAsyncThunk<LoginResponse, LoginFormData, { rejectValue: string }>(
  'user/loginUser',
  async function (loginData, { rejectWithValue }) {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Accept", "application/json");

    console.log(JSON.stringify(loginData))

    const response = await fetch(`${BASE_URL}${LOGIN_PATH}`, {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(loginData),
    });

    if (!response.ok) {
      return rejectWithValue('Can\'t login. Server error.');
    }

    return (await response.json()) as LoginResponse;
  }
);

const initialState: userState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logoutUser: (state) => {
      state.user = undefined;
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
      console.log('User has logged out')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user.email = action.payload.email;
        state.isLoading = false;
        state.isLoggedIn = true;
      })

      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  }
});

function isError(action: AnyAction) {
  return action.type.endsWith('rejected');
}

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
