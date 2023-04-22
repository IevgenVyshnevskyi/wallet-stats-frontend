import { useEffect } from "react";
import { Box } from "../../atoms/box/Box.styled";
import { TransactionsPageWrapper } from "./TransactionsPage.styled";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getUserDetails } from "../../../store/userSlice";
import Header from "../../molecules/header/Header";
import { getTransactions } from "../../../store/transactionSlice";
import EditTransaction from "./EditTransaction";
import Transactions from "./Transactions";
import AddTransaction from "./AddTransaction";
import { getWallets } from "../../../store/walletSlice";
import { getCategories } from "../../../store/categorySlice";
import { token } from "../../../api/api";
import { useNavigate } from "react-router-dom";

const TransactionsPage: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate();

  const {
    isAddTransactionSuccess,
    isEditTransactionSuccess,
    isDeleteTransactionSuccess,
    isEditTransactionOpen,
    isLoading
  } = useAppSelector(state => state.transaction);

  const { isLoggedIn, isRegistered, user } = useAppSelector(state => state.user);

  if (!token && !isRegistered && !isLoggedIn) {
    navigate("/")
  }

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getWallets());
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (isLoading === false) {
      dispatch(getTransactions());
    }
  }, [isLoading]);

  useEffect(() => {
    if (isAddTransactionSuccess || isEditTransactionSuccess || isDeleteTransactionSuccess) {
      dispatch(getTransactions());
    }
  }, [isAddTransactionSuccess, isEditTransactionSuccess, isDeleteTransactionSuccess]);

  return (
    <TransactionsPageWrapper>
      <Header />

      <Box m="0 20px 36px" display="flex" grow="1" gap="25px">
        <Transactions />

        {isEditTransactionOpen ? <EditTransaction /> : <AddTransaction />}
      </Box>
    </TransactionsPageWrapper>
  );
}

export default TransactionsPage;