import { Typography } from "../../atoms/typography/Typography.styled";
import IncomeIcon from "../../../shared/assets/icons/income.svg"
import ExpenseIcon from "../../../shared/assets/icons/expense.svg"
import { DARK_FOR_TEXT, GREEN, WHITE, ALERT_1, PRIMARY } from './../../../shared/styles/variables';
import { Box } from "../../atoms/box/Box.styled";
import { TransactionProps } from "../../../../types/molecules";
import { useAppSelector } from '../../../store/hooks';
import { TransactionWrapper } from './TransactionWrapper';

const Transaction: React.FC<TransactionProps> = ({ transaction }) => {
  const { activeTransaction } = useAppSelector(state => state.transaction)

  const pathTransactions = window.location.pathname === '/transactions';

  const isActive = transaction?.id === activeTransaction?.id;
  const isIncome = transaction?.type_of_outlay === "income";

  return (
    <TransactionWrapper
      bgColor={pathTransactions && isActive ? PRIMARY : WHITE}
      width={pathTransactions ? "100%" : undefined}
    >
      <Box grow="1">
        <Typography
          as="h4"
          fw="500"
          fz="14px"
          color={pathTransactions && isActive ? WHITE : DARK_FOR_TEXT}
          m="0 0 16px 0"
        >
          {transaction?.wallet}
        </Typography>
        <Typography
          as="h5"
          fw="600"
          fz="16px"
          color={pathTransactions && isActive ? WHITE : DARK_FOR_TEXT}
        >
          {transaction?.category}
        </Typography>
      </Box>

      <Box
        width="120px"
        display="flex"
        direction="column"
        alignItems="flex-end"
        // borderLeft={`2px solid ${DIVIDER}`}
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
            color={isIncome ? GREEN : ALERT_1}
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
          color={pathTransactions && isActive ? WHITE : DARK_FOR_TEXT}
        >
          {transaction?.amount_of_funds} ₴
        </Typography>
      </Box>
    </TransactionWrapper>
  );
}

export default Transaction;