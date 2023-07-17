import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./userSlice";
import walletReducer from "./walletSlice";
import transactionReducer from "./transactionSlice";
import categoryReducer from "./categorySlice";
import statisticsReducer from "./statisticsSlice";
import passwordRecoveryReducer from "./passwordRecoverySlice";
import bankDataReducer from "./bankDataSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    wallet: walletReducer,
    transaction: transactionReducer,
    category: categoryReducer,
    statistics: statisticsReducer,
    passwordRecovery: passwordRecoveryReducer,
    bankData: bankDataReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
