import { PayloadAction } from "@reduxjs/toolkit";

import { StatisticsState } from "../../../store/statisticsSlice";
import { Transactions, TypeOfOutlay } from "../../../store/types";

export const updateChartCategoryTransactions = (
  state: StatisticsState,
  action: PayloadAction<{ data: Transactions[], chartType: TypeOfOutlay }>
) => {
  const { data, chartType } = action.payload;

  switch (chartType) {
    case "expense":
      state.expensesChart.categoryTransactions = data;
      break;
    case "income":
      state.incomesChart.categoryTransactions = data;
      break;
    default:
      break;
  }
}