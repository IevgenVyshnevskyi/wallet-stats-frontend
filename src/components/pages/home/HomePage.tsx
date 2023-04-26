import React, { useContext, useEffect, useState } from "react";

import { BASE_2, DIVIDER } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import Header from '../../molecules/header/Header';
import { Typography } from '../../atoms/typography/Typography.styled';
import Wallet from '../../molecules/wallet/Wallet';
import { ListItem } from '../../atoms/list/ListItem.styled';
import { List } from "../../atoms/list/List.styled";
import { Button } from "../../atoms/button/Button.styled";
import DoughnutChart from "../../molecules/charts/DoughnutChart";
import { HomePageWrapper } from "./HomePage.styled";
import { PopupContext } from "../../../contexts/PopupContext";
import PopupAddWallet from "../../molecules/popup/PopupAddWallet";
import PopupEditWallet from "../../molecules/popup/PopupEditWallet";
import { mockTransactions } from "../../../../mock-data/transactions";
import { mockWallets } from "../../../../mock-data/wallets";
import Transaction from "../../molecules/transaction/Transaction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getWallets, setActiveWallet } from "../../../store/walletSlice";
import { IWallet } from "../../../store/types";
import { isDev } from "../../../consts/consts";
import { mockData, mockLabels } from "../../../../mock-data/doughnutCharts";
import { formatTransactionDateToHours } from "../../../shared/utils/formatTransactionDate";
import { getTransactions } from "../../../store/transactionSlice";
import { getCategories, getFilteredCategories } from "../../../store/categorySlice";
import { token } from "../../../api/api";
import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    isAddWalletPopupOpen,
    isEditWalletPopupOpen,
  } = useContext(PopupContext);

  const {
    isAddWalletSuccess,
    isEditWalletSuccess,
    isDeleteWalletSuccess,
    isLoading: isWalletActionLoading
  } = useAppSelector(state => state.wallet)

  const { isLoggedIn, isRegistered } = useAppSelector(state => state.user);

  if (!token && !isRegistered && !isLoggedIn) {
    navigate("/welcome")
  }

  useEffect(() => {
    dispatch(getWallets());
    dispatch(getTransactions());
    dispatch(getCategories());
    dispatch(getFilteredCategories('?type_of_outlay=income'));
    dispatch(getFilteredCategories('?type_of_outlay=expense'));
  }, []);

  useEffect(() => {
    if (isWalletActionLoading === false) {
      dispatch(getWallets());
    }
  }, [isWalletActionLoading]);

  useEffect(() => {
    if (isAddWalletSuccess || isEditWalletSuccess || isDeleteWalletSuccess) {
      dispatch(getWallets());
      dispatch(getTransactions());
      dispatch(getCategories());
    }
  }, [isAddWalletSuccess, isEditWalletSuccess, isDeleteWalletSuccess]);

  return (
    <>
      <HomePageWrapper>
        <Header />
        <Box m="0 20px 36px" display="flex" grow="1" gap="25px">
          <Wallets />
          <Transactions />
          <Statistics />
        </Box>
      </HomePageWrapper>

      {isAddWalletPopupOpen && <PopupAddWallet />}
      {isEditWalletPopupOpen && <PopupEditWallet />}
    </>
  );
};

const Wallets: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    setIsAddWalletPopupOpen,
    setIsEditWalletPopupOpen
  } = useContext(PopupContext);

  const { wallets, activeWallet } = useAppSelector(state => state.wallet)

  const cashWallet = wallets?.find(
    (wallet) => wallet?.type_of_account === 'cash'
  );
  const bankWallets = wallets?.filter(
    (wallet) => wallet?.type_of_account === 'bank'
  );

  const handleAddWalletClick = () => {
    setIsAddWalletPopupOpen(true);
  };

  function onWalletClick(wallet: IWallet) {
    setIsEditWalletPopupOpen(true)
    dispatch(setActiveWallet(wallet));
  };

  return (
    <Box display="flex" direction="column">
      <Typography
        as="h2"
        fz="22px"
        fw="500"
        mb="20px"
      >
        Рахунки
      </Typography>
      <Box
        display="flex"
        direction="column"
        bgColor={BASE_2}
        p="15px"
        borderRadius="16px"
        grow="1"
      >
        <Box
          p="0 0 20px 0"
          borderBottom={`2px solid ${DIVIDER}`}
          mb="20px"
        >
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="20px"
          >
            {isDev ? "Готівка" : cashWallet?.title || "Готівка"}
          </Typography>
          <Wallet
            wallet={isDev ? mockWallets[0] : cashWallet}
            onWalletClick={() => onWalletClick(isDev ? mockWallets[0] : cashWallet)}
            isActive={activeWallet?.id === (isDev ? mockWallets[0] : cashWallet)?.id}
          />
        </Box>
        <Box grow="1">
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="20px"
          >
            Картки
          </Typography>
          <List display="flex" direction="column" gap="8px">
            {(isDev
              ? mockWallets.filter(w => w.type_of_account === "bank")
              : bankWallets).map((wallet) => (
                <ListItem key={wallet.id}>
                  <Wallet
                    wallet={wallet}
                    onWalletClick={() => onWalletClick(wallet)}
                    isActive={activeWallet?.id === wallet.id}
                  />
                </ListItem>
              ))}
          </List>
        </Box>
        <Button
          disabled={wallets?.length > 4}
          secondary
          onClick={handleAddWalletClick}
        >
          Додати картковий рахунок
        </Button>
      </Box>
    </Box>
  );
}

const Transactions: React.FC = () => {
  const { transactions } = useAppSelector(state => state.transaction)

  return (
    <Box display="flex" direction="column" grow="1">
      <Typography
        as="h2"
        fz="22px"
        fw="500"
        mb="20px"
      >
        Останні транзакції
      </Typography>
      <List
        display="flex"
        direction="column"
        grow="1"
        gap="8px"
        overflow="auto"
        height="100px"
        bgColor={BASE_2}
        p="15px"
        borderRadius="16px"
      >
        {Object.keys(isDev
          ? mockTransactions
          : transactions.all)?.map((date) => (
            <Box mb="20px" key={date}>
              <Typography as="h3" fz="16px" fw="500" mb="20px">
                {formatTransactionDateToHours(date)}
              </Typography>
              <List display="flex" direction="column" gap="8px">
                {(isDev
                  ? mockTransactions
                  : transactions.all)[date]?.map((transaction) => (
                    <ListItem key={transaction?.id}>
                      <Transaction
                        transaction={transaction}
                        isTransactionsPage={false}
                      />
                    </ListItem>
                  ))}
              </List>
            </Box>
          ))}
      </List>
    </Box>
  );
}

const Statistics: React.FC = () => {
  const { categories } = useAppSelector(state => state.category);
  const { transactions } = useAppSelector(state => state.transaction);

  const [incomesLabels, setIncomesLabels] = useState<string[]>();
  const [expensesLabels, setExpensesLabels] = useState<string[]>([]);

  const incomesData: string[] = Object.values(transactions?.income)
    ?.flatMap(transactionsArr => transactionsArr.map(transaction => (
      transaction.amount_of_funds
    )));
  const expensesData: string[] = Object.values(transactions?.expense)
    ?.flatMap(transactionsArr => transactionsArr.map(transaction => (
      transaction.amount_of_funds
    )));
  useEffect(() => {
    setIncomesLabels(categories.income?.map(c => c.title))
  }, [categories.income])

  useEffect(() => {
    setExpensesLabels(categories.expense?.map(c => c.title))
  }, [categories.expense])

  const [totalIncomesAmount, setTotalIncomesAmount] = useState<string>('');

  useEffect(() => {
    if (Object.keys(transactions.income)?.length > 0) {
      setTotalIncomesAmount(Object.values(transactions?.income)
        .map((transactionsArr) =>
          transactionsArr.reduce((sum, transaction) =>
            (sum += parseFloat(transaction.amount_of_funds)), 0
          )
        )
        .reduce((sum, t) => sum + t, 0)
        .toFixed(2))
    }
  }, [transactions.income]);

  const totalExpensesAmount: string = Object.values(transactions?.expense)
    .map((transactionsArr) =>
      transactionsArr.reduce((sum, transaction) =>
        (sum += parseFloat(transaction.amount_of_funds)), 0
      )
    )
    .reduce((sum, t) => sum + t, 0).toFixed(2);

  return (
    <Box display="flex" direction="column" width="600px">
      <Typography
        as="h2"
        fz="22px"
        fw="500"
        mb="20px"
      >
        Статистика за останній місяць
      </Typography>
      <Box
        display="flex"
        direction="column"
        bgColor={BASE_2}
        p="15px"
        borderRadius="16px"
      >
        <Box mb="20px">
          <Box display="flex" justifyContent="space-between">
            <Typography
              as="h3"
              fz="16px"
              fw="500"
              mb="20px"
            >
              Витрати
            </Typography>
            <Typography
              as="h3"
              fz="16px"
              fw="500"
              mb="20px"
            >
              {isDev ? "32450.67" : totalExpensesAmount} ₴
            </Typography>
          </Box>
          <Box>
            <DoughnutChart
              data={isDev ? mockData : expensesData}
              labels={isDev ? mockLabels : expensesLabels}
              chartType="expense"
            />
          </Box>
        </Box>
        <Box mb="20px">
          <Box display="flex" justifyContent="space-between">
            <Typography
              as="h3"
              fz="16px"
              fw="500"
              mb="20px"
            >
              Надходження
            </Typography>
            <Typography
              as="h3"
              fz="16px"
              fw="500"
              mb="20px"
            >
              {isDev ? "128531.31" : totalIncomesAmount} ₴
            </Typography>
          </Box>
          <Box>
            <DoughnutChart
              data={isDev ? mockData : incomesData}
              labels={isDev ? mockLabels : incomesLabels}
              chartType="income"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;