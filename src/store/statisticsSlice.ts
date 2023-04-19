import { createSlice } from '@reduxjs/toolkit';
import { getFilteredTransactions } from './transactionSlice';
import { FilterByDaysOptions, ICategory, Transactions } from './types';
import { getFilteredCategories } from './categorySlice';

type ChartData = {
  [key in FilterByDaysOptions]: { transactions: Transactions }
};

type AllOutlaysChart = {
  [key in FilterByDaysOptions]: { transactions: Transactions }
};

type StatisticsState = {
  filterByDays: FilterByDaysOptions;
  incomesChart: ChartData & {
    totalIncomes: string,
    categories: ICategory[],
  };
  expensesChart: ChartData & {
    totalExpenses: string,
    categories: ICategory[],
  };
  allOutlaysChart: AllOutlaysChart & {
    activeCategory: number,
    categoryTransactions: Transactions,
  };
  isLoading: boolean;
  error: string | null;
};

const initialState: StatisticsState = {
  filterByDays: "30",
  incomesChart: {
    "30": { transactions: {} },
    "90": { transactions: {} },
    "180": { transactions: {} },
    categories: [],
    totalIncomes: "",
  },
  expensesChart: {
    "30": { transactions: {} },
    "90": { transactions: {} },
    "180": { transactions: {} },
    categories: [],
    totalExpenses: "",
  },
  allOutlaysChart: {
    "30": { transactions: {} },
    "90": { transactions: {} },
    "180": { transactions: {} },
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

        const expense = "?type_of_outlay=expense";
        const income = "?type_of_outlay=income";

        if (params.startsWith('?category=')) {
          state.allOutlaysChart.categoryTransactions = data;
        }

        switch (params) {
          case `${expense}&days=30`:
            state.expensesChart[30].transactions = data;
            break;
          case `${expense}&days=90`:
            state.expensesChart[90].transactions = data;
            break;
          case `${expense}&days=180`:
            state.expensesChart[180].transactions = data;
            break;
          case `${income}&days=30`:
            state.incomesChart[30].transactions = data;
            break;
          case `${income}&days=90`:
            state.incomesChart[90].transactions = data;
            break;
          case `${income}&days=180`:
            state.incomesChart[180].transactions = data;
            break;
          default:
            break;
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
  resetError,
  setFilterByDays,
  setTotalIncomes,
  setTotalExpenses,
  setActiveCategory,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
