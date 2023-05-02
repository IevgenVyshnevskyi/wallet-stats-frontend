import { Transactions } from "../../store/types";

export function filterTransactions(filteredTransactions: Transactions): Transactions {
  const sortedTransactions: Transactions = {};

  Object.keys(filteredTransactions)
    .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
    .forEach((date) => {
      sortedTransactions[date] = filteredTransactions[date].slice().sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );
    });

  return sortedTransactions;
}