import { PayloadAction } from "@reduxjs/toolkit";

import { StatisticsState } from "../../../../types/statistics";
import { ICategory } from "../../../../types/category";

const updateChartCategories = (
  state: StatisticsState,
  action: PayloadAction<{ data: ICategory[]; params: string }>
) => {
  const { data, params } = action.payload;

  switch (params) {
    case "?type_of_outlay=income":
      state.incomesChart.categories = data;
      break;
    case "?type_of_outlay=expense":
      state.expensesChart.categories = data;
      break;
    default:
      break;
  }
};

export default updateChartCategories;
