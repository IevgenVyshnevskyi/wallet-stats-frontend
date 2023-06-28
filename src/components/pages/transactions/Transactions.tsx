import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getFilteredTransactions,
  setActiveTransaction,
  setEditTransactionData,
  setFilterByTypeOfOutlay,
  setIsEditTransactionOpen
} from "../../../store/transactionSlice";

import {
  formatTransactionDateToFullDate
} from "../../../shared/utils/transactions/formatTransactionDate";
import { filterTransactions } from "../../../shared/utils/transactions/filterTransactions";

import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { ButtonTransparent } from "../../atoms/button/ButtonTransparent.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import { List } from "../../atoms/list/List.styled";
import Transaction from "../../molecules/transaction/Transaction";
import TabFilter from "../../molecules/tabs/filter/TabFilter";

import { BASE_2, DARK_FOR_TEXT } from "../../../shared/styles/variables";

import { ITransaction, Transactions, TypeOfOutlay } from "../../../store/types";
import { IFilterButton } from "../../molecules/tabs/filter/TabFilter";

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    transactions,
    filterByTypeOfOutlay
  } = useAppSelector(state => state.transaction);

  const setFilterButtonOptions = (
    buttonName: string,
    typeOfOutlay: TypeOfOutlay | "",
  ): any => {
    return {
      buttonName,
      typeOfOutlay,
      filterBy: typeOfOutlay ? `?type_of_outlay=${typeOfOutlay}` : "",
      isActive: filterByTypeOfOutlay === (typeOfOutlay || "all"),
      onTabClick: () => {
        dispatch(setFilterByTypeOfOutlay(typeOfOutlay || "all"));
        dispatch(getFilteredTransactions(typeOfOutlay));
      }
    }
  }

  const filterButtons: IFilterButton[] = [
    setFilterButtonOptions("Всі транзакції", ""),
    setFilterButtonOptions("Витрати", "expense"),
    setFilterButtonOptions("Витрати", "income")
  ];

  const onTransactionClick = (transaction: ITransaction) => {
    dispatch(setActiveTransaction(transaction));
    dispatch(setEditTransactionData(transaction));
    dispatch(setIsEditTransactionOpen(true));
  }

  const transactionsData = (): Transactions => {
    let filteredTransactions: Transactions = {};
    if (filterByTypeOfOutlay === "all") {
      filteredTransactions = transactions.all;
    } else if (filterByTypeOfOutlay === "expense") {
      filteredTransactions = transactions.expense;
    } else if (filterByTypeOfOutlay === "income") {
      filteredTransactions = transactions.income;
    }

    return filterTransactions(filteredTransactions)
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
          color={DARK_FOR_TEXT}
          fz="12px"
        >
          Відобразити
        </Typography>
        <TabFilter filterButtons={filterButtons} />
      </Box>

      <Box
        display="flex"
        direction="column"
        bgColor={BASE_2}
        p="15px"
        borderRadius="16px"
        grow="1"
        overflow="auto"
        height="100px"
      >
        {Object.entries(transactionsData()).map(([date, transactions]) => (
          <Box mb="20px" key={date}>
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              {formatTransactionDateToFullDate(date)}
            </Typography>
            <List display="flex" direction="column" gap="8px">
              {transactions.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                .map((transaction) => (
                  <ListItem key={transaction?.id}>
                    <ButtonTransparent
                      width="100%"
                      onClick={() => onTransactionClick(transaction)}
                      borderRadius="8px"
                    >
                      <Transaction transaction={transaction} isTransactionsPage />
                    </ButtonTransparent>
                  </ListItem>
                ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Transactions;