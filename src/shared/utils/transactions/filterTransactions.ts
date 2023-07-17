import { Transactions } from "../../../../types/transactions";

const filterTransactions = (
  filteredTransactions: Transactions
): Transactions => {
  const sortedTransactions: Transactions = {};

  const sortedKeys = Object.keys(filteredTransactions).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  sortedKeys.forEach((date) => {
    const sortedItems = filteredTransactions[date]
      .slice()
      .sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
      );

    sortedTransactions[date] = sortedItems;
  });

  return sortedTransactions;
};

export default filterTransactions;
