import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getTransactions } from "../../../store/transactionSlice";
import { getWallets } from "../../../store/walletSlice";
import { getCategories } from "../../../store/categorySlice";

import { token } from "../../../api/api";

import Box from "../../atoms/box/Box.styled";
import Header from "../../molecules/header/Header";
import EditTransaction from "./EditTransaction";
import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction";
import TransactionsPageWrapper from "./TransactionsPage.styled";

const TransactionsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    isAddTransactionSuccess,
    isEditTransactionSuccess,
    isDeleteTransactionSuccess,
    isEditTransactionOpen,
    isLoading,
  } = useAppSelector((state) => state.transaction);

  const { isLoggedIn, isRegistered } = useAppSelector((state) => state.user);

  if (!token && !isRegistered && !isLoggedIn) {
    navigate("/welcome");
  }

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getWallets());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (!isLoading) {
      dispatch(getTransactions());
    }
  }, [isLoading]);

  useEffect(() => {
    if (
      isAddTransactionSuccess ||
      isEditTransactionSuccess ||
      isDeleteTransactionSuccess
    ) {
      dispatch(getTransactions());
      dispatch(getWallets());
    }
  }, [
    isAddTransactionSuccess,
    isEditTransactionSuccess,
    isDeleteTransactionSuccess,
  ]);

  return (
    <TransactionsPageWrapper>
      <Header />

      <Box m="0 36px 24px" display="flex" grow="1" gap="25px">
        <Transactions />

        {isEditTransactionOpen ? <EditTransaction /> : <AddTransaction />}
      </Box>
    </TransactionsPageWrapper>
  );
};

export default TransactionsPage;
