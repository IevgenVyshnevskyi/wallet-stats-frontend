import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  setFilterByTypeOfOutlay,
  getFilteredTransactions
} from "../../store/transactionSlice";
import {
  setFilterByTypeOfOutlay as setCateogryFilterByTypeOfOutlay,
  getFilteredCategories
} from "../../store/categorySlice";

import { IFilterButton } from "../../components/molecules/tabs/filter/TabFilter";
import { TypeOfOutlay } from "../../store/types";

const useFilterButtonOptions = (type: "category" | "transaction"): IFilterButton[] => {
  const dispatch = useAppDispatch();

  const { filterByTypeOfOutlay } = useAppSelector(state => state.transaction);
  const {
    filterByTypeOfOutlay: categoryFilterByTypeOfOutlay
  } = useAppSelector(state => state.category);

  const outlayType = type === "transaction"
    ? filterByTypeOfOutlay
    : categoryFilterByTypeOfOutlay

  const setFilterButtonOptions = (
    buttonName: string,
    typeOfOutlay: TypeOfOutlay | "",
  ): IFilterButton => {
    return {
      buttonName,
      typeOfOutlay,
      filterBy: typeOfOutlay ? `?type_of_outlay=${typeOfOutlay}` : "",
      isActive: outlayType === (typeOfOutlay || "all"),
      onTabClick: () => {
        if (type === "transaction") {
          dispatch(setFilterByTypeOfOutlay(typeOfOutlay || "all"));
          dispatch(getFilteredTransactions(typeOfOutlay));
        } else {
          dispatch(setCateogryFilterByTypeOfOutlay(typeOfOutlay || "all"));
          dispatch(getFilteredCategories(typeOfOutlay));
        }
      }
    }
  }

  const filterButtons: IFilterButton[] = [
    setFilterButtonOptions("Всі транзакції", ""),
    setFilterButtonOptions("Витрати", "expense"),
    setFilterButtonOptions("Надходження", "income")
  ];

  return filterButtons;
}

export default useFilterButtonOptions;