export type MethodTypes = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export type FilterByDaysOptions = "30" | "90" | "180";

/* USER */

export interface IUser {
  id?: number,
  first_name: string,
  last_name: string,
  email?: string,
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
  user_id: string;
  email: string;
  token: string;
}

export interface DataEntryFormData {
  availableCash: string;
  cardAccountName: string;
  amountAccount: string;
  userId?: number;
}

export type NewPasswordFormData = {
  uuid: string;
  token: string;
  password: string;
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

export interface WalletFormData {
  title: string,
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

export interface ICategoryWithTotalAmount extends ICategory {
  totalAmount: number;
}

export interface IBankData {
  id?: number;
  owner: number;
  wallettitle: string;
  file: any;
}

export interface PasswordChangeFormData {
  old_password: string;
  new_password: string;
  new_password_2: string;
}

