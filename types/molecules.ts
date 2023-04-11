import { IWallet } from "../src/store/types";

export interface ICategory {
  id: number,
  title: string,
  type_of_outlay: "income" | "expense",
  owner: number
}

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

export interface ISwitchButton {
  buttonName: string;
  onClick: any;
};

export type TabSwitchProps = {
  switchButtons: ISwitchButton[];
};

export interface ITransaction {
  id: number,
  owner: number,
  wallet: {
    id: number,
    title: string,
    amount: number | string,
    type_of_account: string,
    owner: number
  },
  title: string,
  category: {
    id: number,
    title: string,
    type_of_outlay: "income" | "expense",
    owner: number
  },
  description: string,
  type_of_outlay: "income" | "expense",
  amount_of_funds: number | string,
  created: string
}

export type TransactionProps = {
  transaction: ITransaction;
}

export type WalletProps = {
  wallet: IWallet;
}

export type TransactionListProps = {
  transactions: ITransaction[];
}

export type MessageProps = {
  message: "success" | "error"
}
