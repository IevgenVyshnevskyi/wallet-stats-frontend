import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setActiveTransaction,
  setEditTransactionData,
  setIsEditTransactionOpen,
} from "../../../store/transactionSlice";

import useFilterButtonOptions from "../../../shared/hooks/useFilterButtonOptions";

import filterTransactions from "../../../shared/utils/transactions/filterTransactions";
import { formatTransactionDateToFullDate } from "../../../shared/utils/transactions/formatTransactionDate";

import Box from "../../atoms/box/Box.styled";
import Typography from "../../atoms/typography/Typography.styled";
import ButtonTransparent from "../../atoms/button/ButtonTransparent.styled";
import ListItem from "../../atoms/list/ListItem.styled";
import List from "../../atoms/list/List.styled";
import Transaction from "../../molecules/transaction/Transaction";
import TabFilter from "../../molecules/tabs/filter/TabFilter";

import COLORS from "../../../shared/styles/variables";

import {
  ITransaction,
  Transactions as TransactionsType,
} from "../../../../types/transactions";

const renderTransactionItems = (
  transactions: ITransaction[],
  onTransactionClick: (transaction: ITransaction) => void
): React.ReactNode[] =>
  transactions
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    )
    .map((transaction) => (
      <ListItem key={transaction?.id}>
        <ButtonTransparent
          width="100%"
          onClick={() => onTransactionClick(transaction)}
          borderRadius="8px">
          <Transaction transaction={transaction} isTransactionsPage />
        </ButtonTransparent>
      </ListItem>
    ));

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();

  const { transactions, filterByTypeOfOutlay } = useAppSelector(
    (state) => state.transaction
  );

  const filterButtons = useFilterButtonOptions("transaction");

  const onTransactionClick = (transaction: ITransaction) => {
    dispatch(setActiveTransaction(transaction));
    dispatch(setEditTransactionData(transaction));
    dispatch(setIsEditTransactionOpen(true));
  };

  const transactionsData = (): TransactionsType => {
    let filteredTransactions: TransactionsType = {};

    switch (filterByTypeOfOutlay) {
      case "all":
        filteredTransactions = transactions.all;
        break;
      case "expense":
        filteredTransactions = transactions.expense;
        break;
      case "income":
        filteredTransactions = transactions.income;
        break;
      default:
        filteredTransactions = transactions.all;
        break;
    }

    return filterTransactions(filteredTransactions);
  };

  return (
    <Box grow="1" display="flex" direction="column">
      <Box display="flex" alignItems="center" mb="20px">
        <Box grow="1">
          <Typography as="h2" fz="22px" fw="600">
            Транзакції
          </Typography>
        </Box>
        <Typography
          as="span"
          mr="10px"
          fw="600"
          color={COLORS.DARK_FOR_TEXT}
          fz="12px">
          Відобразити
        </Typography>
        <TabFilter filterButtons={filterButtons} />
      </Box>

      <Box
        display="flex"
        direction="column"
        bgColor={COLORS.BASE_2}
        p="15px"
        borderRadius="16px"
        grow="1"
        overflow="auto"
        height="100px">
        {Object.entries(transactionsData()).map(([date, transactionsArr]) => (
          <Box mb="20px" key={date}>
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              {formatTransactionDateToFullDate(date)}
            </Typography>
            <List display="flex" direction="column" gap="8px">
              {renderTransactionItems(transactionsArr, onTransactionClick)}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Transactions;
