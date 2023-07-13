import { FilterByTypeOfOutlayOptions, TypeOfOutlay } from "./common";

export interface ICategory {
  id?: number;
  title: string;
  type_of_outlay: TypeOfOutlay;
  owner: number;
}

export interface ICategoryWithTotalAmount extends ICategory {
  totalAmount: number;
}

export type CategoryState = {
  filterByTypeOfOutlay: FilterByTypeOfOutlayOptions;
  categories: {
    all: ICategory[];
    income: ICategory[];
    expense: ICategory[];
  };
  totalIncomes: string;
  totalExpenses: string;
  activeCategory: ICategory;
  addCategoryData: ICategory;
  editCategoryData: ICategory;
  isLoading: boolean;
  error: string | null;
  isAddCategorySuccess: boolean;
  isEditCategorySuccess: boolean;
  isDeleteCategorySuccess: boolean;
  isEditCategoryOpen: boolean;
};
