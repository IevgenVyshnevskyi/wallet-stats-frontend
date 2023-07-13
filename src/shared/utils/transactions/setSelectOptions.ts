import { ICategory } from "../../../../types/category";
import { SelectOptions, TypeOfOutlay } from "../../../../types/common";

export const setSelectOptions = (
  typeOfOutlay: TypeOfOutlay,
  categories: {
    all: ICategory[];
    income: ICategory[];
    expense: ICategory[];
  }
): SelectOptions[] => {
  let categoriesArr: ICategory[] = null;

  if (typeOfOutlay === "expense") {
    categoriesArr = categories.expense;
  } else {
    categoriesArr = categories.income;
  }

  return categoriesArr?.map(({ id, title }) => ({ value: id, label: title }));
};
