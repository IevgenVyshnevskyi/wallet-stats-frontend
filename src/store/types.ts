export type MethodTypes = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/* USER */

export interface IUser {
  id?: number,
  first_name: string,
  last_name: string,
  email: string,
  is_confirm_email?: boolean,
  token?: string;
}

export type RegisterFormData = {
  first_name: string,
  last_name: string,
  email: string,
  password: string,
  password2: string,
}

export type LoginFormData = {
  email: string,
  password: string,
}

export type LoginResponse = {
  email: string
}

export interface PasswordRecoveryThreeFormData {
  firstName?: string;
  surname?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export interface DataEntryFormData {
  availableCash: string;
  cardAccountName: string;
  amountAccount: string;
  userId?: number;
  userToken?: string;
}

/* WALLET */

export type TypeOfAccount = "cash" | "bank";

export interface IWallet {
  id?: number,
  title: string,
  amount: string,
  type_of_account: TypeOfAccount,
  owner: number,
}

export interface WalletPopupActionsFormData {
  name: string,
  amount: string,
}

/* TRANSACTION */

export type TypeOfOutlay = "income" | "expense";

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

export interface EditTransactionFormData {
  name: string,
  amount: string,
}

export interface AddTransactionFormData {
  name: string,
  amount: string,
}

/* CATEGORY */

export interface ICategory {
  id?: number,
  title: string,
  type_of_outlay: TypeOfOutlay,
  owner: number
}
