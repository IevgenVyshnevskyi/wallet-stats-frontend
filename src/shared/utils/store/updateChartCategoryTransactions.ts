import { PayloadAction } from "@reduxjs/toolkit";

import { TypeOfOutlay } from "../../../../types/common";
import { Transactions } from "../../../../types/transactions";
import { StatisticsState } from "../../../../types/statistics";

export const updateChartCategoryTransactions = (
  state: StatisticsState,
  action: PayloadAction<{ data: Transactions[]; chartType: TypeOfOutlay }>
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
};
