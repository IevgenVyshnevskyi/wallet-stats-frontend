import { useAppDispatch } from "../../store/hooks";

import { ISwitchButton } from "../../components/molecules/tabs/switch/TabSwitch";
import { ICategory, TypeOfOutlay } from "../../store/types";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

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