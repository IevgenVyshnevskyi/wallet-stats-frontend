import { ICategory, ITransaction, IWallet } from "../src/store/types";

export type CategoryProps = {
  category: ICategory;
}

export interface IFilterButton {
  filterBy: string;
  buttonName: string;
};

export type TabFilterProps = {
  filterButtons: IFilterButton[];
};

export type TransactionProps = {
  transaction: ITransaction;
  onClick?: () => {};
}



export type TransactionListProps = {
  transactions: ITransaction[];
}

export type MessageProps = {
  message: "success" | "error"
}
