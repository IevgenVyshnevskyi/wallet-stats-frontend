export type MethodTypes = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type FilterByDaysOptions = "30" | "90" | "180";

export type FilterByTypeOfOutlayOptions = "all" | "income" | "expense";

export type TypeOfOutlay = "income" | "expense";

export interface IFilterButton {
  filterBy: string;
  onTabClick: () => void;
  buttonName: string;
  isActive: boolean;
  typeOfOutlay?: TypeOfOutlay | "";
}

export interface ISwitchButton {
  buttonName: string;
  onTabClick: () => void;
  isActive: boolean;
}

export type SelectOptions = {
  value: number;
  label: string;
};
