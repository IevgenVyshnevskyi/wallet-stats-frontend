import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { DataEntryFormData, IUser, IWallet } from './types';
import { BASE_URL, WALLET_PATH } from '../api/api';
import { UserState } from './userSlice';
import axios from 'axios';

type WalletState = {
  wallets: IWallet[];
  isLoading: boolean;
  error: string | null;
  isEntryDataSuccess: boolean;
  entryDataError: string | null;
}

type WalletActionOptions = {
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  data: IWallet;
  id?: string;
}

export const walletAction = createAsyncThunk<IWallet[], WalletActionOptions, { rejectValue: string }>(
  'wallet/walletAction',
  async function (payload, { rejectWithValue }) {
    const { method, data, id } = payload;

    const walletHeaders = {
      // ...defaultRequestHeaders,
      "Authorization": `Token ${localStorage.getItem('token')}`
    }

    console.log('payload', payload)

    if (data && method !== "GET" && method !== "DELETE") {
      axios({
        method,
        url: `${BASE_URL}${WALLET_PATH}${id || ''}`,
        data: data,
        headers: walletHeaders,
      })
        .then(response => console.log(response.data))
        .catch(error => {
          const errorMessage = error.response.data;
          return rejectWithValue(errorMessage);
        });
    }

    const getResponse = await axios({
      headers: walletHeaders,
      method: "GET",
      url: `${BASE_URL}${WALLET_PATH}`,
    })
      .then(res => res.data)
      .catch(error => {
        const errorMessage = error.response.data;
        return rejectWithValue(errorMessage);
      });

    return (await getResponse) as IWallet[]
  }
);

export const getWallets = createAsyncThunk<IWallet[], undefined, { rejectValue: string }>(
  'wallet/getWallets',
  async function (_, { rejectWithValue }) {
    const getWalletsHeaders = {
      // ...defaultRequestHeaders,
      "Authorization": `Token ${localStorage.getItem('token')}`
    }

    const getResponse = await axios({
      headers: getWalletsHeaders,
      method: "GET",
      url: `${BASE_URL}${WALLET_PATH}`,
    })
      .then(res => res.data)
      .catch(error => {
        const errorMessage = error.response.data;
        return rejectWithValue(errorMessage);
      });

      localStorage.setItem('userData', getResponse)

    return (await getResponse) as IWallet[]
  }
);

export const postEntryData = createAsyncThunk<
  any, DataEntryFormData, { rejectValue: string, state: { user: UserState } }
>(
  'wallet/postEntryData',
  async function (data, { rejectWithValue }) {
    const { amountAccount, availableCash, cardAccountName, userId } = data

    if (!userId) {
      return rejectWithValue('Помилка при створенні рахунків. Спочатку створіть акаунт.');
      console.log('userid false');
    }

    const postEntryDataHeaders = {
      // ...defaultRequestHeaders,
      "Authorization": `Token ${localStorage.getItem('token')}`
    }

    const cashWallet: IWallet = {
      title: "Готівка",
      amount: availableCash,
      owner: userId,
      type_of_account: "cash",
    }
    const bankWallet: IWallet = {
      title: cardAccountName,
      amount: amountAccount,
      owner: userId,
      type_of_account: "bank",
    }

    console.log(cashWallet, bankWallet);

    const postCashWalletResponsePromise = await axios({
      method: "POST",
      url: `${BASE_URL}${WALLET_PATH}`,
      data: cashWallet,
      headers: postEntryDataHeaders,
    })
      .then(response => response.status)
      .catch(error => {
        const errorMessage = error.response.data;
        console.log('error in cash req')
        return rejectWithValue('error message in cash wallet');
      });

    const postBankWalletResponsePromise = await axios({
      method: "POST",
      url: `${BASE_URL}${WALLET_PATH}`,
      data: bankWallet,
      headers: postEntryDataHeaders,
    })
      .then(response => response.status)
      .catch(error => {
        const errorMessage = error.response;
        console.log('error in bank req')
        return rejectWithValue('error message in bank wallet');
      });

    const [postCashWalletResponse, postBankWalletResponse] = await Promise.all(
      [postCashWalletResponsePromise, postBankWalletResponsePromise]
    );

    if (postCashWalletResponse !== 201 || postBankWalletResponse !== 201) {
      return rejectWithValue('Can\'t create wallet. Server error.');
    }

    return true;
  }
);

const initialState: WalletState = {
  wallets: [],
  isLoading: false,
  error: null,
  isEntryDataSuccess: false,
  entryDataError: null,
}

const walletSlice = createSlice({
  name: 'wallet',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(walletAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(walletAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallets = action.payload;
      })
      .addCase(walletAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })

      .addCase(getWallets.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getWallets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallets = action.payload;
        // handleFulfilledgetWallets(state.wallets, action)
      })
      .addCase(getWallets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload
      })

      .addCase(postEntryData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postEntryData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEntryDataSuccess = true;
      })
      .addCase(postEntryData.rejected, (state, action) => {
        state.isLoading = false;
        state.entryDataError = action.payload;
        // state.entryDataError = 'Помилка при внесенні рахунків';
        console.log(action.payload);
      })
  }
});

export default walletSlice.reducer;
