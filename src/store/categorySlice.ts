import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import { ICategory, MethodTypes } from './types';
import { $api, CATEGORY_PATH } from '../api/api';
import { getUserDetails } from './userSlice';
import { FilterByTypeOfOutlayOptions } from './transactionSlice';

type CategoryState = {
  filterByTypeOfOutlay: FilterByTypeOfOutlayOptions;
  categories: {
    all: ICategory[];
    income: ICategory[];
    expense: ICategory[];
  };
  activeCategory: ICategory;
  addCategoryData: ICategory;
  editCategoryData: ICategory;
  isLoading: boolean;
  error: string | null;
  ownerId: number;
  isAddCategorySuccess: boolean;
  isEditCategorySuccess: boolean;
  isDeleteCategorySuccess: boolean;
  isEditCategoryOpen: boolean;
}

type CategoryActionOptions = {
  method: MethodTypes;
  data?: ICategory;
  id?: string;
}

export const categoryAction = createAsyncThunk<
  ICategory[],
  CategoryActionOptions,
  { rejectValue: string }
>(
  'category/categoryAction',
  async function (payload, { rejectWithValue }) {
    const { method, data, id } = payload;

    if (method !== "GET") {
      $api({
        method,
        url: `${CATEGORY_PATH}${id ? (id + '/') : ''}`,
        data: data || {},
      })
        .then(response => response?.data)
        .catch(error => {
          console.log('error in action category');
          return rejectWithValue('error in action category');
        });
    }

    return await $api.get(CATEGORY_PATH)
      .then(res => res?.data)
      .catch(error => {
        console.log('error in get response in action category');
        return rejectWithValue(`Помилка`)
      });
  }
);

export const getCategories = createAsyncThunk<
  ICategory[],
  undefined,
  { rejectValue: string }
>(
  'category/getCategories',
  async function (_, { rejectWithValue }) {
    return $api.get(CATEGORY_PATH)
      .then(res => res?.data)
      .catch(error => {
        const errorMessage = error.response.data;
        return rejectWithValue(errorMessage);
      });
  }
);

export const getFilteredCategories = createAsyncThunk<
  { data: ICategory[], params: string },
  string,
  { rejectValue: string }
>(
  'transaction/getFilteredCategories',
  async function (params, { rejectWithValue }) {
    try {
      const res = await $api.get(`${CATEGORY_PATH}${params}`);
      const data = res?.data;
      return { data, params };
    } catch (error) {
      const errorMessage = error.response.data;
      return rejectWithValue(errorMessage);
    }
  }
);

const initialState: CategoryState = {
  filterByTypeOfOutlay: "all",
  categories: {
    all: [],
    income: [],
    expense: [],
  },
  activeCategory: null,
  addCategoryData: null,
  editCategoryData: null,
  isLoading: false,
  error: null,
  ownerId: 0,
  isAddCategorySuccess: false,
  isEditCategorySuccess: false,
  isDeleteCategorySuccess: false,
  isEditCategoryOpen: false,
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
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
    setFilterByTypeOfOutlay: (state, action) => {
      state.filterByTypeOfOutlay = action.payload;
    },
    setOwnerId: (state, action) => {
      state.ownerId = action.payload;
    },
    setAddCategoryData: (state, action) => {
      state.addCategoryData = {
        ...state.addCategoryData,
        ...action.payload,
        owner: state.ownerId
      }
    },
    setEditCategoryData: (state, action) => {
      state.editCategoryData = {
        ...state.editCategoryData,
        ...action.payload,
      }
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
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categories.all = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      .addCase(getFilteredCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getFilteredCategories.fulfilled, (state, action) => {
        const { data, params } = action.payload;
        switch (params) {
          case "":
            state.categories.all = data;
            break;
          case "?type_of_outlay=income":
            state.categories.income = data;
            break;
          case "?type_of_outlay=expense":
            state.categories.expense = data;
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

      .addCase(getUserDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ownerId = action.payload.id;
      })
      .addCase(getUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
  }
});

export const {
  resetError,
  resetActiveCategoryState,
  setActiveCategory,
  setFilterByTypeOfOutlay,
  setOwnerId,
  setAddCategoryData,
  setEditCategoryData,
  setSuccessStatus,
  setIsEditCategoryOpen
} = categorySlice.actions;

export default categorySlice.reducer;
