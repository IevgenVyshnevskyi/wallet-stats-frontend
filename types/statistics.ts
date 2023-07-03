import { FilterByDaysOptions } from "./common";
import { Transactions } from "./transactions";
import { ICategory } from "./category";

type DoughnutChartData = {
  allTransactions: Transactions;
  categoryTransactions: Transactions[];
  categories: ICategory[];
  data: string[],
  totalAmount: string,
};

export type StatisticsState = {
  filterByDays: FilterByDaysOptions;
  incomesChart: DoughnutChartData;
  expensesChart: DoughnutChartData;
  allOutlaysChart: {
    allTransactions: Transactions;
    activeCategoryId: number;
    categoryTransactions: Transactions;
  };
  isLoading: boolean;
  error: string | null;
};