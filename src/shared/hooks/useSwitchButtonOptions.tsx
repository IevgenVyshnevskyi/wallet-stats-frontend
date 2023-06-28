import { useAppDispatch } from "../../store/hooks";

import { ISwitchButton } from "../../components/molecules/tabs/switch/TabSwitch";
import { TypeOfOutlay } from "../../store/types";

const useSwitchButtonOptions = (
  data: any,
  dataHandler: any
): ISwitchButton[] => {
  const dispatch = useAppDispatch();

  const setSwitchButtonOptions = (
    buttonName: string,
    typeOfOutlay: TypeOfOutlay,
  ): any => {
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