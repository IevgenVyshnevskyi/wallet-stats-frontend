import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import { ITransaction, IWallet, MethodTypes, Transactions, TypeOfOutlay } from './types';
import { $api, TRANSACTION_PATH } from '../api/api';
import { getUserDetails } from './userSlice';

type TransactionState = {
  transactions: Transactions;
  activeTransaction: ITransaction;
  activeTransactionTypeOfOutlay: TypeOfOutlay;
  activeTransactionWallet: IWallet;
  addTransactionData: ITransaction;
  editTransactionData: ITransaction;
  isLoading: boolean;
  error: string | null;
  ownerId: number;
  isAddTransactionSuccess: boolean;
  isEditTransactionSuccess: boolean;
  isDeleteTransactionSuccess: boolean;
}

type TransactionActionOptions = {
  method: MethodTypes;
  data?: ITransaction;
  id?: string;
}

export const transactionAction = createAsyncThunk<
  Transactions,
  TransactionActionOptions,
  { rejectValue: string }
>(
  'transaction/transactionAction',
  async function (payload, { rejectWithValue }) {
    const { method, data, id } = payload;

    if (method !== "GET") {
      $api({
        method,
        url: `${TRANSACTION_PATH}${id ? (id + '/') : ''}`,
        data: data || {},
      })
        .then(response => response?.data)
        .catch(error => {
          console.log('error in action transaction');
          return rejectWithValue('error in action transaction');
        });
    }

    return await $api.get(TRANSACTION_PATH)
      .then(res => res?.data)
      .catch(error => {
        console.log('error in get response in action transaction');
        return rejectWithValue(`Помилка`)
      });
  }
);

export const getTransactions = createAsyncThunk<Transactions, undefined, { rejectValue: string }>(
  'transaction/getTransactions',
  async function (_, { rejectWithValue }) {
    return $api.get(TRANSACTION_PATH)
      .then(res => res?.data)
      .catch(error => {
        const errorMessage = error.response.data;
        return rejectWithValue(errorMessage);
      });
  }
);

const initialState: TransactionState = {
  transactions: {},
  activeTransaction: null,
  activeTransactionTypeOfOutlay: null,
  activeTransactionWallet: null,
  addTransactionData: null,
  editTransactionData: null,
  isLoading: false,
  error: null,
  ownerId: 0,
  isAddTransactionSuccess: false,
  isEditTransactionSuccess: false,
  isDeleteTransactionSuccess: false,
}

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    resetActiveTransactionState: (state, action) => {
      state.activeTransaction = action.payload;
      state.editTransactionData = action.payload;
    },
    setActiveTransaction: (state, action) => {
      state.activeTransaction = action.payload;
    },
    setActiveTransactionTypeOfOutlay: (state, action) => {
      state.activeTransactionTypeOfOutlay = action.payload;
    },
    setActiveTransactionWallet: (state, action) => {
      state.activeTransactionWallet = action.payload;
    },
    setOwnerId: (state, action) => {
      state.ownerId = action.payload;
    },
    setAddTransactionData: (state, action) => {
      state.addTransactionData = {
        ...state.addTransactionData,
        ...action.payload,
        owner: state.ownerId
      }
    },
    setEditTransactionData: (state, action) => {
      state.editTransactionData = {
        ...state.editTransactionData,
        ...action.payload,
      }
    },
    setSuccessStatus: (state, action) => {
      state.isAddTransactionSuccess = action.payload;
      state.isEditTransactionSuccess = action.payload;
      state.isDeleteTransactionSuccess = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(transactionAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAddTransactionSuccess = false;
        state.isEditTransactionSuccess = false;
        state.isDeleteTransactionSuccess = false;
      })
      .addCase(transactionAction.fulfilled, (state, action) => {
        state.transactions = action.payload;
        state.isLoading = false;
        state.isAddTransactionSuccess = true;
        state.isEditTransactionSuccess = true;
        state.isDeleteTransactionSuccess = true;
        state.error = null;
      })
      .addCase(transactionAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownerId = action.payload.id;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export const {
  resetError,
  resetActiveTransactionState,
  setActiveTransaction,
  setActiveTransactionTypeOfOutlay,
  setActiveTransactionWallet,
  setOwnerId,
  setAddTransactionData,
  setEditTransactionData,
  setSuccessStatus,
} = transactionSlice.actions;

export default transactionSlice.reducer;
