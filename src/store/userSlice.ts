import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  $api,
  CHANGE_USER_INFO_PATH,
  LOGIN_PATH,
  LOGOUT_PATH,
  REGISTER_PATH,
  USER_DETAILS_PATH,
  userDataParsed,
  CHANGE_USER_PASSWORD_PATH,
} from "../api/api";

import {
  IUser,
  LoginFormData,
  PasswordChangeFormData,
  RegisterFormData,
  UserState,
} from "../../types/user";

type LoginResponse = {
  user_id: string;
  email: string;
  token: string;
};

export const registerUser = createAsyncThunk<
  any,
  RegisterFormData,
  { rejectValue: string }
>("user/registerUser", async (registerData, { rejectWithValue }) => {
  try {
    const response = await $api.post<IUser>(REGISTER_PATH, registerData);
    const user = response.data;
    localStorage.clear();
    localStorage.setItem("token", user.token);
    localStorage.setItem("userData", JSON.stringify(user));
    return user;
  } catch (error) {
    return rejectWithValue("Акаунт із вказаною поштою вже існує");
  }
});

export const loginUser = createAsyncThunk<
  LoginResponse,
  LoginFormData,
  { rejectValue: string }
>("user/loginUser", async (loginData, { rejectWithValue }) => {
  try {
    const response = await $api.post<LoginResponse>(LOGIN_PATH, loginData);
    const userInfo = response.data;
    localStorage.setItem("token", userInfo.token);
    localStorage.setItem("isDataEntrySuccess", "true");
    return userInfo;
  } catch (error) {
    return rejectWithValue("Будь ласка, введіть дані, вказані при реєстрації");
  }
});

export const logoutUser = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>("user/logoutUser", async (_, { rejectWithValue }) => {
  try {
    await $api.get(LOGOUT_PATH);
    localStorage.clear();
    return undefined;
  } catch (error) {
    return rejectWithValue("Помилка");
  }
});

export const getUserDetails = createAsyncThunk<
  IUser,
  undefined,
  { rejectValue: string }
>("user/getUserDetails", async (_, { rejectWithValue }) => {
  try {
    const response = await $api.get(USER_DETAILS_PATH);
    const userData = response.data;
    localStorage.setItem("userData", JSON.stringify(userData));
    return userData;
  } catch (error) {
    const errorMessage = error.response.data;
    return rejectWithValue(errorMessage);
  }
});

export const deleteUserAccount = createAsyncThunk<
  undefined,
  undefined,
  { rejectValue: string }
>("user/deleteUserAccount", async (_, { rejectWithValue }) => {
  try {
    await $api.delete(USER_DETAILS_PATH);
    localStorage.clear();
    return undefined;
  } catch (error) {
    const errorMessage = error.response.data;
    return rejectWithValue(errorMessage);
  }
});

export const changeUserProfile = createAsyncThunk<
  IUser,
  IUser,
  { rejectValue: string }
>("user/changeUserProfile", async (payload, { rejectWithValue }) => {
  try {
    const response = await $api.put<IUser>(CHANGE_USER_INFO_PATH, payload);
    const newUserInfo = response.data;
    localStorage.setItem(
      "userData",
      JSON.stringify({
        ...userDataParsed,
        ...newUserInfo,
      })
    );
    return newUserInfo;
  } catch (error) {
    return rejectWithValue("Помилка");
  }
});

export const changeUserPassword = createAsyncThunk<
  { old_password: string },
  PasswordChangeFormData,
  { rejectValue: string }
>("user/changeUserPassword", async (payload, { rejectWithValue }) => {
  try {
    const response = await $api.post(CHANGE_USER_PASSWORD_PATH, payload);
    return response.data;
  } catch (error) {
    return rejectWithValue("Введіть пароль, вказаний при реєстрації");
  }
});

const initialState: UserState = {
  user: null,
  isLoading: false,
  isRegistered: false,
  isLoggedIn: false,
  isLoggedOut: false,
  isAccountDeleted: false,
  isProfileChanged: false,
  isPasswordChanged: false,
  registerError: null,
  loginError: null,
  logoutError: null,
  getDetailsError: null,
  deleteUserAccountError: null,
  confirmEmailError: null,
  profileChangeError: null,
  passwordChangeError: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: () => initialState,
    resetDeleteUserAccountError: (state) => {
      state.deleteUserAccountError = null;
    },
    resetProfileEditErrors: (state) => {
      state.profileChangeError = null;
      state.passwordChangeError = null;
    },
    setSuccessStatus: (state, action) => {
      state.isProfileChanged = action.payload;
      state.isPasswordChanged = action.payload;
    },
    setIsLoggedOut: (state, action) => {
      state.isLoggedOut = action.payload;
    },
    setIsAccountDeleted: (state, action) => {
      state.isAccountDeleted = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.registerError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isLoggedOut = false;
        state.isRegistered = true;
        state.isAccountDeleted = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.registerError = action.payload;
        state.isLoading = false;
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = {
          ...state.user,
          ...action.payload,
        };
        state.isLoading = false;
        state.isLoggedOut = false;
        state.isAccountDeleted = false;
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
        state.isLoggedOut = true;
        state.isRegistered = false;
        state.user = null;
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
        state.user = {
          ...state.user,
          ...action.payload,
        };
        state.isLoading = false;
        state.getDetailsError = null;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.getDetailsError = action.payload;
      })

      .addCase(deleteUserAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserAccount.fulfilled, (state) => {
        state.isLoading = false;
        state.isLoggedIn = false;
        state.isRegistered = false;
        state.isAccountDeleted = true;
      })
      .addCase(deleteUserAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.deleteUserAccountError = action.payload;
      })

      .addCase(changeUserProfile.pending, (state) => {
        state.isLoading = true;
        state.profileChangeError = null;
      })
      .addCase(changeUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          ...state.user,
          ...action.payload,
        };
        state.isProfileChanged = true;
      })
      .addCase(changeUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.profileChangeError = action.payload;
      })

      .addCase(changeUserPassword.pending, (state) => {
        state.isLoading = true;
        state.passwordChangeError = null;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isPasswordChanged = true;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.passwordChangeError = action.payload;
      });
  },
});

export const {
  resetUserState,
  resetDeleteUserAccountError,
  setSuccessStatus,
  resetProfileEditErrors,
  setIsLoggedOut,
  setIsAccountDeleted,
} = userSlice.actions;

export default userSlice.reducer;
