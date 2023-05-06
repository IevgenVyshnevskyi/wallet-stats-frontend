import React, { useContext, useEffect, useRef } from "react";

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
import { mockWallets } from "../../../../mock-data/wallets";
import Transaction from "../../molecules/transaction/Transaction";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getWallets, setActiveWallet } from "../../../store/walletSlice";
import { ICategory, ICategoryWithTotalAmount, IWallet, Transactions } from "../../../store/types";
import { isDev } from "../../../consts/consts";
import { formatTransactionDateToFullDate } from "../../../shared/utils/formatTransactionDate";
import { getFilteredTransactions, getTransactions } from "../../../store/transactionSlice";
import { getCategories, getFilteredCategories } from "../../../store/categorySlice";
import { token } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../../../store/userSlice";
import { filterTransactions } from "../../../shared/utils/filterTransactions";
import { setTotalExpenses, setTotalIncomes } from "../../../store/statisticsSlice";

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
  const { isLoading: isBankDataLoading, isAddBankDataSuccess } = useAppSelector(state => state.bankData);

  if (!token && !isRegistered && !isLoggedIn) {
    navigate("/welcome")
  }

  if (isLoggedIn) {
    dispatch(getUserDetails())
  }

  useEffect(() => {
    dispatch(getWallets());
    dispatch(getTransactions());
    dispatch(getFilteredCategories("?type_of_outlay=income"))
    dispatch(getFilteredCategories("?type_of_outlay=expense"))
    dispatch(getFilteredTransactions("?type_of_outlay=expense&days=30"));
    dispatch(getFilteredTransactions("?type_of_outlay=income&days=30"));
  }, []);

  useEffect(() => {
    if (isWalletActionLoading === false || isBankDataLoading === false) {
      dispatch(getWallets());
      dispatch(getTransactions());
      dispatch(getCategories());
      dispatch(getFilteredTransactions("?type_of_outlay=expense&days=30"));
      dispatch(getFilteredTransactions("?type_of_outlay=income&days=30"));
    }
  }, [isWalletActionLoading, isBankDataLoading]);

  useEffect(() => {
    if (isAddWalletSuccess || isEditWalletSuccess || isDeleteWalletSuccess || isAddBankDataSuccess) {
      dispatch(getWallets());
      dispatch(getTransactions());
      dispatch(getCategories());
      dispatch(getFilteredTransactions("?type_of_outlay=expense&days=30"));
      dispatch(getFilteredTransactions("?type_of_outlay=income&days=30"));
    }
  }, [isAddWalletSuccess, isEditWalletSuccess, isDeleteWalletSuccess, isAddBankDataSuccess]);

  return (
    <>
      <HomePageWrapper>
        <Header />
        <Box m="0 36px 24px" display="flex" grow="1" gap="25px">
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

  const { wallets, activeWallet, isLoading } = useAppSelector(state => state.wallet)

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
        fw="600"
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
        overflow="auto"
        height="100px"
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
        <Box grow="1" mb="20px">
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
          disabled={wallets?.length > 4 || isLoading}
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

  const transactionsData = (): Transactions => {
    let filteredTransactions: Transactions = transactions.all;

    return filterTransactions(filteredTransactions)
  };

  return (
    <Box display="flex" direction="column" grow="1">
      <Typography
        as="h2"
        fz="22px"
        fw="600"
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
        {Object.entries(transactionsData()).map(([date, transactions]) => (
          <Box mb="20px" key={date}>
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              {formatTransactionDateToFullDate(date)}
            </Typography>
            <List display="flex" direction="column" gap="8px">
              {transactions.sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime())
                .map((transaction) => (
                  <ListItem key={transaction?.id}>
                    <Transaction transaction={transaction} isTransactionsPage={false} />
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
  const dispatch = useAppDispatch();

  const { incomesChart, expensesChart, isLoading } = useAppSelector(state => state.statistics);

  const incomesLabels = useRef<string[]>(null);
  const expensesLabels = useRef<string[]>(null);

  const incomesData = useRef<any>(null);
  const expensesData = useRef<any>(null);

  const incomeCategoriesWithTotalAmount = useRef<ICategoryWithTotalAmount[]>(null);
  const expenseCategoriesWithTotalAmount = useRef<ICategoryWithTotalAmount[]>(null);

  useEffect(() => {
    if (incomesChart.categories && incomesChart.allTransactions) {
      incomeCategoriesWithTotalAmount.current = incomesChart.categories
        .flatMap((category) => {
          const transactionsForCategory = Object.values(incomesChart.allTransactions)
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
            (sum, transaction) =>
              sum + parseFloat(transaction.amount_of_funds),
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

      incomesLabels.current = incomeCategoriesWithTotalAmount.current.map(c => {
        return c.title
      })
      incomesData.current = incomeCategoriesWithTotalAmount.current.map(c => {
        return c.totalAmount
      })
    }
  }, [incomesChart.categories, incomesChart.allTransactions]);

  useEffect(() => {
    if (expensesChart.categories && expensesChart.allTransactions) {
      expenseCategoriesWithTotalAmount.current = expensesChart.categories
        .flatMap((category) => {
          const transactionsForCategory = Object.values(expensesChart.allTransactions)
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
            (sum, transaction) =>
              sum + parseFloat(transaction.amount_of_funds),
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

      expensesLabels.current = expenseCategoriesWithTotalAmount.current.map(c => {
        return c.title
      })
      expensesData.current = expenseCategoriesWithTotalAmount.current.map(c => {
        return c.totalAmount
      })
    }
  }, [expensesChart.categories, expensesChart.allTransactions])

  const totalIncomesAmount: string = Object.values(incomesChart?.allTransactions)
    .map((transactionsArr) => transactionsArr.reduce((sum, transaction) => {
      return sum += parseFloat(transaction.amount_of_funds)
    }, 0))
    .reduce((sum, t) => sum + t, 0)
    .toFixed(2);

  const totalExpensesAmount: string = Object.values(expensesChart?.allTransactions)
    ?.map((transactionsArr) => transactionsArr?.reduce((sum, transaction) => {
      return sum += parseFloat(transaction?.amount_of_funds)
    }, 0))
    .reduce((sum, t) => sum + t, 0)
    .toFixed(2);

  useEffect(() => {
    if (isLoading === false) {
      if (incomesChart.allTransactions) {
        dispatch(setTotalIncomes(totalIncomesAmount));
      }
      if (expensesChart.allTransactions) {
        dispatch(setTotalExpenses(totalExpensesAmount));
      }
    }
  }, [incomesChart.allTransactions, expensesChart.allTransactions, isLoading]);
  return (
    <Box display="flex" direction="column" width="650px">
      <Typography
        as="h2"
        fz="22px"
        fw="600"
        mb="20px"
      >
        Статистика за останній місяць
      </Typography>
      <Box
        display="flex"
        direction="column"
        bgColor={BASE_2}
        borderRadius="16px"
        overflow="auto"
        height="100px"
        p="15px"
      >
        <Box mb="20px">
          <Box display="flex" justifyContent="space-between">
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              Витрати
            </Typography>
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              {expensesChart.totalAmount} ₴
            </Typography>
          </Box>
          <Box>
            <DoughnutChart
              labels={expensesLabels.current}
              data={expensesData.current}
              isHomePage
            />
          </Box>
        </Box>
        <Box mb="20px">
          <Box display="flex" justifyContent="space-between">
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              Надходження
            </Typography>
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              {incomesChart.totalAmount} ₴
            </Typography>
          </Box>
          <Box>
            <DoughnutChart
              labels={incomesLabels.current}
              data={incomesData.current}
              isHomePage
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;