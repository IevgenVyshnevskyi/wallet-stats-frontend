import { PayloadAction } from "@reduxjs/toolkit";

import { StatisticsState } from "../../../store/statisticsSlice";
import { Transactions } from "../../../store/types";

export const updateChartTransactions = (
  state: StatisticsState,
  action: PayloadAction<{ data: Transactions, params: string }>
) => {
  const { data, params } = action.payload;

  if (params.startsWith('?category=')) {
    state.allOutlaysChart.categoryTransactions = data;
  } else if (params.startsWith('?type_of_outlay=income')) {
    state.incomesChart.allTransactions = data;
  } else if (params.startsWith('?type_of_outlay=expense')) {
    state.expensesChart.allTransactions = data;
  }
}