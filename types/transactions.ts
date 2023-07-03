import { FilterByTypeOfOutlayOptions, TypeOfOutlay } from "./common";

export interface ITransaction {
  id?: number;
  owner: number;
  wallet: number;
  category: number;
  amount_of_funds: string;
  type_of_outlay: TypeOfOutlay;
  title?: string;
  description?: string;
  created: string;
}

export type Transactions = {
  [date: string]: ITransaction[];
}

export type TransactionState = {
  filterByTypeOfOutlay: FilterByTypeOfOutlayOptions;
  transactions: {
    all: Transactions;
    income: Transactions;
    expense: Transactions;
  };
  activeTransaction: ITransaction;
  addTransactionData: ITransaction;
  editTransactionData: ITransaction;
  isLoading: boolean;
  error: string | null;
  isAddTransactionSuccess: boolean;
  isEditTransactionSuccess: boolean;
  isDeleteTransactionSuccess: boolean;
  isEditTransactionOpen: boolean;
}