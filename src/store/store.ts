import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import walletReducer from './walletSlice';
import transactionReducer from './transactionSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

