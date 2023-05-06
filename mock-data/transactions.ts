import { Transactions } from "../src/store/types";

export const mockTransactions: Transactions = {
  "2023-04-07": [
    {
      id: 14,
      owner: 1,
      wallet: 0,
      title: "title",
      category: 3,
      description: "string",
      type_of_outlay: "expense",
      amount_of_funds: "7193",
      created: "2023-04-07T21:01:49.424000Z"
    },
    {
      id: 15,
      owner: 1,
      wallet: 3,
      title: "string",
      category: 4,
      description: "string",
      type_of_outlay: "income",
      amount_of_funds: "714.54",
      created: "2023-04-05T17:01:49.424000Z"
    }
  ],
  "2023-06-07": [
    {
      id: 16,
      owner: 1,
      wallet: 1,
      title: "string",
      category: 1,
      description: "string",
      type_of_outlay: "expense",
      amount_of_funds: "3114.79",
      created: "2023-06-07T23:01:49.424000Z"
    },
  ],
};