import { Transactions } from "../../../store/types";

export const calculateTotalAmount = (allTransactions: Transactions): string => {
  const transactionAmounts = Object.values(allTransactions).flatMap(transactionsArr => {
    return transactionsArr.map(transaction => {
      return parseFloat(transaction.amount_of_funds)
    })
  })

  const totalAmount = transactionAmounts.reduce((sum, amount) => sum + amount, 0);

  return totalAmount.toFixed(2);
};