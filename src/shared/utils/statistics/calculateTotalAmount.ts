import { Transactions } from "../../../../types/transactions";

export const calculateTotalAmount = (allTransactions: Transactions): string => {
  const transactionAmounts = Object.values(allTransactions).flatMap(
    (transactionsArr) =>
      transactionsArr.map((transaction) =>
        parseFloat(transaction.amount_of_funds)
      )
  );

  const totalAmount = transactionAmounts.reduce(
    (sum, amount) => sum + amount,
    0
  );

  return totalAmount.toFixed(2);
};
