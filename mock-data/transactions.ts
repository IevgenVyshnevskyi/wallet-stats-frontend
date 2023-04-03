import { ITransaction } from "../types/molecules";

export const mockTransactions: ITransaction[] = [
  {
    id: 0,
    owner: 0,
    wallet: {
      id: 0,
      title: "string",
      amount: "8.2",
      type_of_account: "Готівка",
      owner: 0
    },
    title: "string",
    category: {
      id: 0,
      title: "string",
      type_of_outlay: "income",
      owner: 0
    },
    description: "string",
    type_of_outlay: "income",
    amount_of_funds: "-3",
    created: "2023-03-26T12:39:43.886Z",
  },
  {
    id: 1,
    owner: 0,
    wallet: {
      id: 1,
      title: "string",
      amount: "8.2",
      type_of_account: "Приват",
      owner: 0
    },
    title: "string",
    category: {
      id: 1,
      title: "string",
      type_of_outlay: "expense",
      owner: 0
    },
    description: "string",
    type_of_outlay: "expense",
    amount_of_funds: "-3",
    created: "2023-03-26T12:39:43.886Z",
  },
  {
    id: 3,
    owner: 0,
    wallet: {
      id: 1,
      title: "string",
      amount: "8.2",
      type_of_account: "Приват",
      owner: 0
    },
    title: "string",
    category: {
      id: 1,
      title: "string",
      type_of_outlay: "income",
      owner: 0
    },
    description: "string",
    type_of_outlay: "expense",
    amount_of_funds: "-3",
    created: "2023-03-26T12:39:43.886Z",
  },
  {
    id: 2,
    owner: 0,
    wallet: {
      id: 1,
      title: "string",
      amount: "8.2",
      type_of_account: "Приват",
      owner: 0
    },
    title: "string",
    category: {
      id: 1,
      title: "string",
      type_of_outlay: "income",
      owner: 0
    },
    description: "string",
    type_of_outlay: "expense",
    amount_of_funds: "-3",
    created: "2023-03-26T12:39:43.886Z",
  },
];