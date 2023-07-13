import { useAppSelector } from "../../../store/hooks";

import filterTransactions from "../../../shared/utils/transactions/filterTransactions";
import { formatTransactionDateToFullDate } from "../../../shared/utils/transactions/formatTransactionDate";

import Box from "../../atoms/box/Box.styled";
import List from "../../atoms/list/List.styled";
import ListItem from "../../atoms/list/ListItem.styled";
import Typography from "../../atoms/typography/Typography.styled";
import Transaction from "../../molecules/transaction/Transaction";

import COLORS from "../../../shared/styles/variables";

import {
  ITransaction,
  Transactions as TransactionsType,
} from "../../../../types/transactions";

const renderTransactionItems = (
  transactions: ITransaction[]
): React.ReactNode[] =>
  transactions
    .sort(
      (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime()
    )
    .map((transaction) => (
      <ListItem key={transaction?.id}>
        <Transaction transaction={transaction} isTransactionsPage={false} />
      </ListItem>
    ));

const Transactions: React.FC = () => {
  const { transactions } = useAppSelector((state) => state.transaction);

  const transactionsData = (): TransactionsType => {
    const filteredTransactions: TransactionsType = transactions.all;

    return filterTransactions(filteredTransactions);
  };

  return (
    <Box display="flex" direction="column" grow="1">
      <Typography as="h2" fz="22px" fw="600" mb="20px">
        Останні транзакції
      </Typography>
      <List
        display="flex"
        direction="column"
        grow="1"
        gap="8px"
        overflow="auto"
        height="100px"
        bgColor={COLORS.BASE_2}
        p="15px"
        borderRadius="16px">
        {Object.entries(transactionsData).map(([date, transactionsArr]) => (
          <Box mb="20px" key={date}>
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              {formatTransactionDateToFullDate(date)}
            </Typography>
            <List display="flex" direction="column" gap="8px">
              {renderTransactionItems(transactionsArr)}
            </List>
          </Box>
        ))}
      </List>
    </Box>
  );
};

export default Transactions;
