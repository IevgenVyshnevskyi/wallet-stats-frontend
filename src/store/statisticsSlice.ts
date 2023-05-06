import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getFilteredTransactions } from './transactionSlice';
import { FilterByDaysOptions, ICategory, Transactions, TypeOfOutlay } from './types';
import { getFilteredCategories } from './categorySlice';
import { $api, TRANSACTION_PATH } from '../api/api';

type DoughnutChartData = {
  allTransactions: Transactions;
  categoryTransactions: Transactions[];
  categories: ICategory[];
  data: string[],
  totalAmount: string,
};

type StatisticsState = {
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
  async function (payload, { rejectWithValue }) {
    const { chartType, categories, filterByDays } = payload;

    try {
      const res = await categories.map(c => (
        $api.get<Transactions>(`${TRANSACTION_PATH}?category=${c.id}&days=${filterByDays}`)
          .then(res => res.data)
      ))
      const data = await Promise.all(res)
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
        state.isLoading = false;
        const { data, params } = action.payload;
        if (params.startsWith('?category=')) {
          state.allOutlaysChart.categoryTransactions = data;
        } else if (params.startsWith('?type_of_outlay=income')) {
          state.incomesChart.allTransactions = data;
        } else if (params.startsWith('?type_of_outlay=expense')) {
          state.expensesChart.allTransactions = data;
        }
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
