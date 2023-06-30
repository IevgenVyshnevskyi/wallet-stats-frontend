import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { getFilteredTransactions } from './transactionSlice';
import { getFilteredCategories } from './categorySlice';

import { updateChartCategories } from '../shared/utils/store/updateChartCategories';
import { updateChartTransactions } from '../shared/utils/store/updateChartTransactions';
import { updateChartCategoryTransactions } from '../shared/utils/store/updateChartCategoryTransactions';

import { $api, TRANSACTION_PATH } from '../api/api';

import {
  FilterByDaysOptions,
  ICategory,
  Transactions,
  TypeOfOutlay
} from './types';

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

export const getFilteredCategoryTransactions = createAsyncThunk<
  { data: Transactions[], chartType: TypeOfOutlay },
  { chartType: TypeOfOutlay, categories: ICategory[], filterByDays: string },
  { rejectValue: string }
>(
  'statistics/getFilteredCategoryTransactions',
  async (payload, { rejectWithValue }) => {
    const { chartType, categories, filterByDays } = payload;

    try {
      const promises = categories.map(async (c) => {
        try {
          const response = await $api.get<Transactions>(
            `${TRANSACTION_PATH}?category=${c.id}&days=${filterByDays}`
          );
          return response.data;
        } catch (error) {
          throw new Error('Помилка');
        }
      });

      const data = await Promise.all(promises);
      return { data, chartType };
    } catch (error) {
      return rejectWithValue('Помилка');
    }
  }
);

const initialState: StatisticsState = {
  filterByDays: "30",
  incomesChart: {
    allTransactions: {},
    categoryTransactions: [],
    categories: [],
    data: [],
    totalAmount: "",
  },
  expensesChart: {
    allTransactions: {},
    categoryTransactions: [],
    categories: [],
    data: [],
    totalAmount: "",
  },
  allOutlaysChart: {
    allTransactions: {},
    activeCategoryId: 0,
    categoryTransactions: {},
  },
  isLoading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    resetStatisticsState: () => {
      return initialState;
    },
    resetError: (state) => {
      state.error = null;
    },
    setFilterByDays: (state, action) => {
      state.filterByDays = action.payload;
    },
    setTotalIncomes: (state, action) => {
      state.incomesChart.totalAmount = action.payload;
    },
    setTotalExpenses: (state, action) => {
      state.expensesChart.totalAmount = action.payload;
    },
    setIncomesData: (state, action) => {
      state.incomesChart.data = action.payload;
    },
    setExpensesData: (state, action) => {
      state.expensesChart.data = action.payload;
    },
    setActiveCategoryId: (state, action) => {
      state.allOutlaysChart.activeCategoryId = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getFilteredCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFilteredCategories.fulfilled, (state, action) => {
        updateChartCategories(state, action)
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
        state.isLoading = false;
        updateChartTransactions(state, action)
      })
      .addCase(getFilteredTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getFilteredCategoryTransactions.pending, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(getFilteredCategoryTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        updateChartCategoryTransactions(state, action)
      })
      .addCase(getFilteredCategoryTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export const {
  resetStatisticsState,
  resetError,
  setFilterByDays,
  setIncomesData,
  setExpensesData,
  setTotalIncomes,
  setTotalExpenses,
  setActiveCategoryId,
} = statisticsSlice.actions;

export default statisticsSlice.reducer;
