import { SelectOptions } from '../../../../types/molecules';
import { ICategory, TypeOfOutlay } from '../../../store/types';

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

  return categoriesArr?.map(({ id, title }) => {
    return { value: id, label: title };
  });
};
