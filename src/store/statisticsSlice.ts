import { createSlice } from '@reduxjs/toolkit';
import { getFilteredTransactions } from './transactionSlice';
import { FilterByDaysOptions, ICategory, Transactions } from './types';
import { getFilteredCategories } from './categorySlice';

type BasicDoughnutChartData = {
  transactions: Transactions;
  categories: ICategory[];
};

type StatisticsState = {
  filterByDays: FilterByDaysOptions;
  incomesChart: BasicDoughnutChartData & {
    totalIncomes: string,
  };
  expensesChart: BasicDoughnutChartData & {
    totalExpenses: string,
  };
  allOutlaysChart: {
    transactions: Transactions;
    activeCategory: number;
    categoryTransactions: Transactions;
  };
  isLoading: boolean;
  error: string | null;
};

const initialState: StatisticsState = {
  filterByDays: "30",
  incomesChart: {
    transactions: {},
    categories: [],
    totalIncomes: "",
  },
  expensesChart: {
    transactions: {},
    categories: [],
    totalExpenses: "",
  },
  allOutlaysChart: {
    transactions: {},
    activeCategory: 0,
    categoryTransactions: {},
  },
  isLoading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    resetStatisticsState: (state) => {
      return initialState;
    },
    resetError: (state) => {
      state.error = null;
    },
    setFilterByDays: (state, action) => {
      state.filterByDays = action.payload;
    },
    setTotalIncomes: (state, action) => {
      state.incomesChart.totalIncomes = action.payload;
    },
    setTotalExpenses: (state, action) => {
      state.expensesChart.totalExpenses = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.allOutlaysChart.activeCategory = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFilteredCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFilteredCategories.fulfilled, (state, action) => {
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
        state.isLoading = false;
      })
      .addCase(getFilteredCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getFilteredTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFilteredTransactions.fulfilled, (state, action) => {
        const { data, params } = action.payload;

        if (params.startsWith('?category=')) {
          state.allOutlaysChart.categoryTransactions = data;
        } else if (params.startsWith('?type_of_outlay=income')) {
          state.incomesChart.transactions = data;
        } else if (params.startsWith('?type_of_outlay=expense')) {
          state.expensesChart.transactions = data;
        }

        state.isLoading = false;
      })
      .addCase(getFilteredTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export const {
  resetStatisticsState,
  resetError,
  setFilterByDays,
  setTotalIncomes,
  setTotalExpenses,
  setActiveCategory,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
