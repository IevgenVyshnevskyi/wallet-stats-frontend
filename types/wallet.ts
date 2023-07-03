type TypeOfAccount = "cash" | "bank";

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