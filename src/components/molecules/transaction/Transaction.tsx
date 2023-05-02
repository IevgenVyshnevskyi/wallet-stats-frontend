import { Typography } from "../../atoms/typography/Typography.styled";
import IncomeIcon from "../../../shared/assets/icons/income.svg"
import ExpenseIcon from "../../../shared/assets/icons/expense.svg"
import { DARK_FOR_TEXT, GREEN, WHITE, PRIMARY, RED, ALMOST_BLACK_FOR_TEXT, DISABLED } from './../../../shared/styles/variables';
import { Box } from "../../atoms/box/Box.styled";
import { useAppSelector } from '../../../store/hooks';
import { TransactionWrapper } from './TransactionWrapper';
import { ITransaction } from "../../../store/types";
import formatTransactionTime from "../../../shared/utils/formatTransactionTime";
import { useEffect, useRef } from "react";

export type TransactionProps = {
  transaction: ITransaction;
  onClick?: () => {};
  isTransactionsPage?: boolean;
}

const Transaction: React.FC<TransactionProps> = ({ transaction, isTransactionsPage }) => {
  const { activeTransaction } = useAppSelector(state => state.transaction)
  const { categories } = useAppSelector(state => state.category)
  const { wallets } = useAppSelector(state => state.wallet)

  const isActive = transaction?.id === activeTransaction?.id;
  const isIncome = transaction?.type_of_outlay === "income";

  const transactionCategoryTitle: string = (categories.all)
    ?.find(category => category.id === transaction.category)?.title;

  const transactionWalletTitle: string = (wallets)
    ?.find(wallet => wallet.id === transaction.wallet)?.title;

  return (
    <TransactionWrapper
      bgColor={isTransactionsPage && isActive ? PRIMARY : WHITE}
      width={isTransactionsPage ? "100%" : undefined}
      isTransactionsPage={isTransactionsPage}
    >
      <Box grow="1">
        <Box display="flex" gap="8px">
          <Typography
            as="h4"
            fw="500"
            fz="14px"
            color={isTransactionsPage && isActive ? WHITE : DARK_FOR_TEXT}
            m="0 0 16px 0"
          >
            {transactionWalletTitle}
          </Typography>
          <Typography
            as="h4"
            fw="500"
            fz="14px"
            color={isTransactionsPage && isActive ? WHITE : DISABLED}
            m="0 0 16px 0"
          >
            ({formatTransactionTime(transaction?.created)})
          </Typography>
        </Box>
        <Typography
          as="h5"
          fw="600"
          fz="16px"
          color={isTransactionsPage && isActive ? WHITE : ALMOST_BLACK_FOR_TEXT}
        >
          {transactionCategoryTitle}
        </Typography>
      </Box>

      <Box
        width="120px"
        display="flex"
        direction="column"
        alignItems="flex-end"
        pl="50px"
      >
        <Box
          display="flex"
          alignItems="center"
          p="3px 6px"
          mb="9px"
          bgColor={WHITE}
          gap="4px"
          borderRadius="6px"
        >
          <Typography
            as="span"
            color={isIncome ? GREEN : RED}
            textAlign="right"
            fw="600"
          >
            {isIncome ? "Надходження" : "Витрата"}
          </Typography>
          {isIncome ? <IncomeIcon /> : <ExpenseIcon />}
        </Box>

        <Typography
          as="span"
          textAlign="right"
          fz="16px"
          fw="600"
          color={isTransactionsPage &&
            isActive ? WHITE : DARK_FOR_TEXT
          }
        >
          {transaction?.amount_of_funds} ₴
        </Typography>
      </Box>
    </TransactionWrapper>
  );
}

export default Transaction;