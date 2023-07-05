import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { $api, WALLET_PATH } from "../api/api";

import { DataEntryFormData, UserState } from "../../types/user";
import { MethodTypes } from "../../types/common";
import { IWallet } from "../../types/wallet";

type WalletState = {
  wallets: IWallet[];
  activeWallet: IWallet;
  isLoading: boolean;
  error: string | null;
  isEntryDataSuccess: boolean;
  isAddWalletSuccess: boolean;
  isEditWalletSuccess: boolean;
  isDeleteWalletSuccess: boolean;
  entryDataError: string | null;
};

type WalletActionPayload = {
  method: MethodTypes;
  data?: IWallet;
  id?: string;
};

export const walletAction = createAsyncThunk<
  IWallet[],
  WalletActionPayload,
  { rejectValue: string }
>("wallet/walletAction", async (payload, { rejectWithValue }) => {
  const { method, data, id } = payload;

  if (method !== "GET") {
    try {
      const response = await $api({
        method,
        url: `${WALLET_PATH}${id ? `${id}/` : ""}`,
        data: data || {},
      });
      return response.data;
    } catch (error) {
      return rejectWithValue("Помилка");
    }
  }

  try {
    const response = await $api.get(WALLET_PATH);
    return response.data;
  } catch (error) {
    return rejectWithValue(`Помилка`);
  }
});

export const getWallets = createAsyncThunk<
  IWallet[],
  undefined,
  { rejectValue: string }
>("wallet/getWallets", async (_, { rejectWithValue }) => {
  try {
    const response = await $api.get(WALLET_PATH);
    return response.data;
  } catch (error) {
    return rejectWithValue("error in get wallets");
  }
});

export const postEntryData = createAsyncThunk<
  undefined,
  DataEntryFormData,
  { rejectValue: string; state: { user: UserState } }
>("wallet/postEntryData", async (data, { rejectWithValue }) => {
  const { amountAccount, availableCash, cardAccountName, userId } = data;

  if (!userId) {
    return rejectWithValue(
      "Помилка при внесенні рахунків. Спочатку створіть акаунт."
    );
  }

  const cashWallet: IWallet = {
    title: "Готівка",
    amount: availableCash,
    owner: userId,
    type_of_account: "cash",
  };
  const bankWallet: IWallet = {
    title: cardAccountName,
    amount: amountAccount,
    owner: userId,
    type_of_account: "bank",
  };

  try {
    const postCashWalletResponse = await $api.post(WALLET_PATH, cashWallet);
    const postBankWalletResponse = await $api.post(WALLET_PATH, bankWallet);

    if (
      postCashWalletResponse.status !== 201 ||
      postBankWalletResponse.status !== 201
    ) {
      return rejectWithValue("Can't create wallets. Server error.");
    }

    localStorage.setItem("isDataEntrySuccess", "true");
  } catch (error) {
    return rejectWithValue("Помилка при створенні рахунку");
  }
});

const initialState: WalletState = {
  wallets: [],
  activeWallet: null,
  isLoading: false,
  error: null,
  isEntryDataSuccess: false,
  isAddWalletSuccess: false,
  isEditWalletSuccess: false,
  isDeleteWalletSuccess: false,
  entryDataError: null,
};

const walletSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    resetWalletState: (state) => {
      return initialState;
    },
    resetError: (state) => {
      state.error = null;
    },
    setActiveWallet: (state, action) => {
      state.activeWallet = action.payload;
    },
    setSuccessStatus: (state, action) => {
      state.isAddWalletSuccess = action.payload;
      state.isEditWalletSuccess = action.payload;
      state.isDeleteWalletSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(walletAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAddWalletSuccess = false;
        state.isEditWalletSuccess = false;
        state.isDeleteWalletSuccess = false;
      })
      .addCase(walletAction.fulfilled, (state, action) => {
        state.isLoading = false;
        state.wallets = action.payload;
        state.isAddWalletSuccess = true;
        state.isEditWalletSuccess = true;
        state.isDeleteWalletSuccess = true;
        state.error = null;
      })
      .addCase(walletAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getWallets.pending, (state) => {
        state.error = null;
      })
      .addCase(getWallets.fulfilled, (state, action) => {
        state.wallets = action.payload;
      })
      .addCase(getWallets.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(postEntryData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(postEntryData.fulfilled, (state) => {
        state.isLoading = false;
        state.isEntryDataSuccess = true;
      })
      .addCase(postEntryData.rejected, (state, action) => {
        state.isLoading = false;
        state.entryDataError = action.payload;
      });
  },
});

export const {
  resetError,
  resetWalletState,
  setActiveWallet,
  setSuccessStatus,
} = walletSlice.actions;

export default walletSlice.reducer;
