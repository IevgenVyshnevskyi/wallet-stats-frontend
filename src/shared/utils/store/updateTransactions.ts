import { PayloadAction } from "@reduxjs/toolkit";

import { TransactionState } from "../../../store/transactionSlice";
import { Transactions } from "../../../store/types";

export const updateTransactions = (
  state: TransactionState,
  action: PayloadAction<{ data: Transactions, params: string }>
) => {
  const { data, params } = action.payload;

  switch (params) {
    case "":
      state.transactions.all = data;
      break;
    case "?type_of_outlay=income":
      state.transactions.income = data;
      break;
    case "?type_of_outlay=expense":
      state.transactions.expense = data;
      break;
    default:
      break;
  }
}