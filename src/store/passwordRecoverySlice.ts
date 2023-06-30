import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  $api,
  PASSWORD_RESET_CONFIRM_PATH,
  PASSWORD_RESET_REQUEST_PATH
} from '../api/api';

type PasswordRecoveryState = {
  email: string;
  isLoading: boolean;
  error: string | null;
  isResetLinkStepOpen: boolean;
  isNewPasswordSet: boolean;
}

type confirmPasswordResetPayload = {
  uid: string;
  token: string;
  new_password: string;
}

export const requestPasswordReset = createAsyncThunk<
  undefined,
  { email: string },
  { rejectValue: any }
>(
  'passwordRecovery/requestPasswordReset',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await $api.post(PASSWORD_RESET_REQUEST_PATH, payload);
      return response.data;
    } catch (error) {
      const errorMessage = error.response.data;
      return rejectWithValue(errorMessage);
    }
  }
);

export const confirmPasswordReset = createAsyncThunk<
  undefined,
  confirmPasswordResetPayload,
  { rejectValue: any }
>(
  'passwordRecovery/confirmPasswordReset',
  async (payload, { rejectWithValue }) => {
    try {
      const response = await $api.post(PASSWORD_RESET_CONFIRM_PATH, payload);
      return response?.data;
    } catch (error) {
      const errorMessage = error.response.data;
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState: PasswordRecoveryState = {
  email: "",
  isLoading: false,
  error: null,
  isResetLinkStepOpen: false,
  isNewPasswordSet: false,
}

const passwordRecoverySlice = createSlice({
  name: 'passwordRecovery',
  initialState,
  reducers: {
    setIsResetLinkStepOpen(state, action) {
      state.isResetLinkStepOpen = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(requestPasswordReset.pending, (state, action) => {
        state.email = action.payload
        state.isLoading = true;
        state.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
        state.isResetLinkStepOpen = true;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(confirmPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(confirmPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
        state.isNewPasswordSet = true;
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export const { setIsResetLinkStepOpen } = passwordRecoverySlice.actions;

export default passwordRecoverySlice.reducer;