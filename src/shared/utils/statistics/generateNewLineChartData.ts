import { Transactions } from "../../../../types/transactions";

const generateNewLineChartData = (
  categoryTransactions: Transactions
): {
  diffInDays: number;
  totalAmount: number;
} => {
  let diffInDays = null;
  let totalAmount = null;

  Object.entries(categoryTransactions)?.forEach(
    ([dateStr, transactionsArr]) => {
      const targetDate = new Date(dateStr);
      const currentDate = new Date();

      const diffInTime = targetDate.getTime() - currentDate.getTime();

      diffInDays = Math.abs(Math.ceil(diffInTime / (1000 * 60 * 60 * 24)));

      totalAmount = transactionsArr.reduce(
        (acc, transaction) => acc + parseInt(transaction.amount_of_funds),
        0
      );
    }
  );

  return { diffInDays, totalAmount };
};

export default generateNewLineChartData;
