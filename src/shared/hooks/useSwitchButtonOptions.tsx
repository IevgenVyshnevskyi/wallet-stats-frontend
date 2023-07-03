import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

import { useAppDispatch } from "../../store/hooks";

import { ICategory } from "../../../types/category";
import { ISwitchButton, TypeOfOutlay } from "../../../types/common";

const useSwitchButtonOptions = (
  data: ICategory,
  dataHandler: ActionCreatorWithPayload<any>
): ISwitchButton[] => {
  const dispatch = useAppDispatch();

  const setSwitchButtonOptions = (
    buttonName: string,
    typeOfOutlay: TypeOfOutlay,
  ): ISwitchButton => {
    return {
      buttonName,
      isActive: data?.type_of_outlay === typeOfOutlay,
      onTabClick: () => {
        dispatch(dataHandler({ type_of_outlay: typeOfOutlay }));
      },
    }
  }

  const switchButtons: ISwitchButton[] = [
    setSwitchButtonOptions('Витрата', "expense"),
    setSwitchButtonOptions('Надходження', "income")
  ];

  return switchButtons;
}

export default useSwitchButtonOptions;