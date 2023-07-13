import {
  ICategory,
  ICategoryWithTotalAmount,
} from "../../../../types/category";
import { Transactions } from "../../../../types/transactions";

export const calculateCategoriesWithTotalAmount = (
  categories: ICategory[],
  allTransactions: Transactions
): ICategoryWithTotalAmount[] =>
  categories
    .flatMap((category) => {
      const transactionsForCategory = Object.values(allTransactions)
        .flat()
        .filter(
          (transaction) =>
            parseFloat(transaction.amount_of_funds) > 0 &&
            transaction.category === category.id
        );
      if (!transactionsForCategory || transactionsForCategory.length === 0) {
        return [];
      }
      const totalAmount = transactionsForCategory.reduce(
        (sum, transaction) => sum + parseFloat(transaction.amount_of_funds),
        0
      );
      return {
        id: category.id,
        title: category.title,
        type_of_outlay: category.type_of_outlay,
        owner: category.owner,
        totalAmount,
      };
    })
    .filter((category) => category.totalAmount > 0);
