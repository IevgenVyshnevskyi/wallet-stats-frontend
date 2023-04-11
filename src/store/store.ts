import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import walletReducer from './walletSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

