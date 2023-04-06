import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './registerSlice';

const store = configureStore({
  reducer: {
    user: registerReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

