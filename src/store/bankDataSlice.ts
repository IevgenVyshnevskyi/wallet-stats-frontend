import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { $api, BANK_DATA_PATH } from '../api/api';
import { IBankData } from './types';

export type BankDataState = {
  isLoading: boolean;
  error: string | null;
  bankData: IBankData[];
  isAddBankDataSuccess: boolean;
}

export const getBankData = createAsyncThunk<IBankData[], undefined, { rejectValue: any }>(
  'bankData/getBankData',
  async function (_, { rejectWithValue }) {
    return $api.get(BANK_DATA_PATH)
      .then(res => res?.data)
      .catch(error => {
        return rejectWithValue('Помилка');
      });
  }
);

export const sendBankData = createAsyncThunk<undefined, IBankData, { rejectValue: any }>(
  'bankData/sendBankData',
  async function (_, { rejectWithValue }) {
    return $api.post(BANK_DATA_PATH)
      .then(res => res?.data)
      .catch(error => {
        return rejectWithValue('Помилка');
      });
  }
);

const initialState: BankDataState = {
  isLoading: false,
  error: null,
  bankData: null,
  isAddBankDataSuccess: false,
}

const passwordRecoverySlice = createSlice({
  name: 'bankData',
  initialState,
  reducers: {
    setBankDataSuccessStatus(state, action) {
      state.isAddBankDataSuccess = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBankData.pending, (state, action) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getBankData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bankData = action.payload
      })
      .addCase(getBankData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(sendBankData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(sendBankData.fulfilled, (state) => {
        state.isLoading = false;
        state.isAddBankDataSuccess = true;
      })
      .addCase(sendBankData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export const {
  setBankDataSuccessStatus
} = passwordRecoverySlice.actions

export default passwordRecoverySlice.reducer;