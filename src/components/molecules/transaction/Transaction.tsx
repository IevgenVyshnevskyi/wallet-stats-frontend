import { useAppSelector } from '../../../store/hooks';

import { formatTransactionTime } from '../../../shared/utils/transactions/formatTransactionTime';

import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { TransactionWrapper } from './TransactionWrapper';

import IncomeIcon from "../../../shared/assets/icons/income.svg"
import ExpenseIcon from "../../../shared/assets/icons/expense.svg"

import COLORS from '../../../shared/styles/variables';

import { ITransaction } from '../../../../types/transactions';

type TransactionProps = {
  transaction: ITransaction;
  onClick?: () => void;
  isTransactionsPage?: boolean;
}

const Transaction: React.FC<TransactionProps> = ({ transaction, isTransactionsPage }) => {
  const { activeTransaction } = useAppSelector(state => state.transaction)
  const { categories } = useAppSelector(state => state.category)
  const { wallets } = useAppSelector(state => state.wallet)

  const isActive = transaction?.id === activeTransaction?.id;
  const isIncome = transaction?.type_of_outlay === "income";

  const transactionCategoryTitle: string = categories.all?.find(category => {
    return category.id === transaction.category;
  })?.title;

  const transactionWalletTitle: string = wallets?.find(wallet => {
    return wallet.id === transaction.wallet
  })?.title;

  return (
    <TransactionWrapper
      bgColor={isTransactionsPage && isActive ? COLORS.PRIMARY : COLORS.WHITE}
      width={isTransactionsPage ? "100%" : undefined}
      isTransactionsPage={isTransactionsPage}
    >
      <Box display="flex" gap="5px">
        <Box grow="1">
          <Box display="flex" gap="8px">
            <Typography
              as="h4"
              fw="500"
              fz="14px"
              color={isTransactionsPage && isActive ? COLORS.WHITE : COLORS.DARK_FOR_TEXT}
              m="0 0 16px 0"
            >
              {transactionWalletTitle}
            </Typography>
            <Typography
              as="h4"
              fw="500"
              fz="14px"
              color={isTransactionsPage && isActive ? COLORS.WHITE : COLORS.DISABLED}
              m="0 0 16px 0"
            >
              ({formatTransactionTime(transaction?.created)})
            </Typography>
          </Box>
          <Typography
            as="h5"
            fw="600"
            fz="16px"
            color={isTransactionsPage && isActive ? COLORS.WHITE : COLORS.ALMOST_BLACK_FOR_TEXT}
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
            bgColor={COLORS.WHITE}
            gap="4px"
            borderRadius="6px"
          >
            <Typography
              as="span"
              color={isIncome ? COLORS.GREEN : COLORS.RED}
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
              isActive ? COLORS.WHITE : COLORS.DARK_FOR_TEXT
            }
          >
            {transaction?.amount_of_funds} ₴
          </Typography>
        </Box>
      </Box>

      {transaction?.title !== "New transaction" && (
        <Box
          display="flex"
          direction="column"
          borderTop={`2px solid ${COLORS.DIVIDER}`}
          mt="20px"
          pt="15px"
        >
          <Typography
            as="h4"
            fz="14px"
            color={isTransactionsPage && isActive ? COLORS.DIVIDER : COLORS.DISABLED}
            fw="500"
            mb="15px"
          >
            Деталі:
          </Typography>
          <Typography
            as="h5"
            fw="400"
            fz="16px"
            color={isTransactionsPage && isActive ? COLORS.WHITE : COLORS.ALMOST_BLACK_FOR_TEXT}
          >
            {transaction?.title}
          </Typography>
        </Box>
      )}

    </TransactionWrapper>
  );
}

export default Transaction;