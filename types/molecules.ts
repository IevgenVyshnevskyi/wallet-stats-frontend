import { ICategory, ITransaction } from "../src/store/types";

export type CategoryProps = {
  category: ICategory;
}

export type TransactionListProps = {
  transactions: ITransaction[];
}

export type MessageProps = {
  message: "success" | "error"
}

export type SelectOptions = {
  value: number;
  label: string;
}