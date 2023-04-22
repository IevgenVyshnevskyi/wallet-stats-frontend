import { IWallet } from "../src/store/types";

export const mockWallets: IWallet[] = [
  {
    id: 0,
    title: "Готівка",
    amount: "13248.26",
    type_of_account: "cash",
    owner: 1
  },
  {
    id: 1,
    title: "Приват",
    amount: "3042.65",
    type_of_account: "bank",
    owner: 1
  },
  {
    id: 2,
    title: "Моно",
    amount: "5346.70",
    type_of_account: "bank",
    owner: 1
  },
  {
    id: 3,
    title: "Ощад",
    amount: "346",
    type_of_account: "bank",
    owner: 1
  },
  {
    id: 4,
    title: "Альфа",
    amount: "2314.35",
    type_of_account: "bank",
    owner: 1
  },
];