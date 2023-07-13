import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getUserDetails } from "./userSlice";

import { updateCategories } from "../shared/utils/store/updateCategories";

import { $api, CATEGORY_PATH } from "../api/api";

import { CategoryState, ICategory } from "../../types/category";
import { MethodTypes } from "../../types/common";

type CategoryActionPayload = {
  method: MethodTypes;
  data?: ICategory;
  id?: string;
};

export const categoryAction = createAsyncThunk<
  ICategory[],
  CategoryActionPayload,
  { rejectValue: string }
>("category/categoryAction", async (payload, { rejectWithValue }) => {
  const { method, data, id } = payload;

  if (method !== "GET") {
    try {
      const response = await $api({
        method,
        url: `${CATEGORY_PATH}${id ? `${id}/` : ""}`,
        data: data || {},
      });

      return response?.data;
    } catch (error) {
      return rejectWithValue("Помилка");
    }
  }

  try {
    const response = await $api.get(CATEGORY_PATH);
    return response?.data;
  } catch (error) {
    return rejectWithValue("Помилка");
  }
});

export const getCategories = createAsyncThunk<
  ICategory[],
  undefined,
  { rejectValue: string }
>("category/getCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await $api.get(CATEGORY_PATH);
    return response?.data;
  } catch (error) {
    const errorMessage = error.response.data;
    return rejectWithValue(errorMessage);
  }
});

export const getFilteredCategories = createAsyncThunk<
  { data: ICategory[]; params: string },
  string,
  { rejectValue: string }
>("transaction/getFilteredCategories", async (params, { rejectWithValue }) => {
  try {
    const response = await $api.get(`${CATEGORY_PATH}${params}`);
    const data = response?.data;
    return { data, params };
  } catch (error) {
    const errorMessage = error.response.data;
    return rejectWithValue(errorMessage);
  }
});

const initialState: CategoryState = {
  filterByTypeOfOutlay: "all",
  categories: {
    all: [],
    income: [],
    expense: [],
  },
  totalIncomes: "0",
  totalExpenses: "0",
  activeCategory: null,
  addCategoryData: null,
  editCategoryData: null,
  isLoading: false,
  error: null,
  isAddCategorySuccess: false,
  isEditCategorySuccess: false,
  isDeleteCategorySuccess: false,
  isEditCategoryOpen: false,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetCategoryState: (state) => initialState,
    resetError: (state) => {
      state.error = null;
    },
    resetActiveCategoryState: (state, action) => {
      state.activeCategory = action.payload;
      state.editCategoryData = action.payload;
    },
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
    setTotalIncomes: (state, action) => {
      state.totalIncomes = action.payload;
    },
    setTotalExpenses: (state, action) => {
      state.totalExpenses = action.payload;
    },
    setFilterByTypeOfOutlay: (state, action) => {
      state.filterByTypeOfOutlay = action.payload;
    },
    setAddCategoryData: (state, action) => {
      state.addCategoryData = {
        ...state.addCategoryData,
        ...action.payload,
      };
    },
    setEditCategoryData: (state, action) => {
      state.editCategoryData = {
        ...state.editCategoryData,
        ...action.payload,
      };
    },
    setSuccessStatus: (state, action) => {
      state.isAddCategorySuccess = action.payload;
      state.isEditCategorySuccess = action.payload;
      state.isDeleteCategorySuccess = action.payload;
    },
    setIsEditCategoryOpen: (state, action) => {
      state.isEditCategoryOpen = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(categoryAction.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.isAddCategorySuccess = false;
        state.isEditCategorySuccess = false;
        state.isDeleteCategorySuccess = false;
      })
      .addCase(categoryAction.fulfilled, (state, action) => {
        state.categories.all = action.payload;
        state.isLoading = false;
        state.isAddCategorySuccess = true;
        state.isEditCategorySuccess = true;
        state.isDeleteCategorySuccess = true;
        state.error = null;
      })
      .addCase(categoryAction.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getCategories.pending, (state) => {
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories.all = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.error = action.payload;
      })

      .addCase(getFilteredCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFilteredCategories.fulfilled, (state, action) => {
        updateCategories(state, action);
        state.isLoading = false;
      })
      .addCase(getFilteredCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {
  resetCategoryState,
  resetError,
  resetActiveCategoryState,
  setActiveCategory,
  setTotalIncomes,
  setTotalExpenses,
  setFilterByTypeOfOutlay,
  setAddCategoryData,
  setEditCategoryData,
  setSuccessStatus,
  setIsEditCategoryOpen,
} = categorySlice.actions;

export default categorySlice.reducer;
