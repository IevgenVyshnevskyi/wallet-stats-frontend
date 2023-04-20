import { useContext, useEffect } from "react";
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

const TransactionsPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    isAddTransactionSuccess,
    isEditTransactionSuccess,
    isDeleteTransactionSuccess,
    isEditTransactionOpen
  } = useAppSelector(state => state.transaction);

  useEffect(() => {
    dispatch(getUserDetails());
    dispatch(getTransactions());
    dispatch(getWallets());
    dispatch(getCategories());

    // dispatch(setAddTransactionData({ owner: user?.id }))
  }, []);

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