import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { PopupContext } from "../../../contexts/PopupContext";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getWallets } from "../../../store/walletSlice";
import { getUserDetails } from "../../../store/userSlice";
import {
  getFilteredTransactions,
  getTransactions,
} from "../../../store/transactionSlice";
import {
  getCategories,
  getFilteredCategories,
} from "../../../store/categorySlice";

import { token } from "../../../api/api";

import Box from "../../atoms/box/Box.styled";
import Header from "../../molecules/header/Header";
import PopupAddWallet from "../../molecules/popup/add-wallet/PopupAddWallet";
import PopupEditWallet from "../../molecules/popup/PopupEditWallet";
import Wallets from "./Wallets";
import Transactions from "./Transitions";
import Statistics from "./Statistics";
import HomePageWrapper from "./HomePage.styled";

const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isAddWalletPopupOpen, isEditWalletPopupOpen } =
    useContext(PopupContext);

  const {
    isAddWalletSuccess,
    isEditWalletSuccess,
    isDeleteWalletSuccess,
    isLoading: isWalletActionLoading,
  } = useAppSelector((state) => state.wallet);

  const { isLoggedIn, isRegistered } = useAppSelector((state) => state.user);

  const { isLoading: isBankDataLoading, isAddBankDataSuccess } = useAppSelector(
    (state) => state.bankData
  );

  if (!token && !isRegistered && !isLoggedIn) {
    navigate("/welcome");
  }

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getUserDetails());
    }

    dispatch(getWallets());
    dispatch(getTransactions());
    dispatch(getFilteredCategories("?type_of_outlay=income"));
    dispatch(getFilteredCategories("?type_of_outlay=expense"));
    dispatch(getFilteredTransactions("?type_of_outlay=expense&days=30"));
    dispatch(getFilteredTransactions("?type_of_outlay=income&days=30"));
  }, []);

  useEffect(() => {
    if (!isWalletActionLoading || !isBankDataLoading) {
      dispatch(getWallets());
      dispatch(getTransactions());
      dispatch(getCategories());
      dispatch(getFilteredTransactions("?type_of_outlay=expense&days=30"));
      dispatch(getFilteredTransactions("?type_of_outlay=income&days=30"));
    }
  }, [isWalletActionLoading, isBankDataLoading]);

  useEffect(() => {
    if (
      isAddWalletSuccess ||
      isEditWalletSuccess ||
      isDeleteWalletSuccess ||
      isAddBankDataSuccess
    ) {
      dispatch(getWallets());
      dispatch(getTransactions());
      dispatch(getCategories());
      dispatch(getFilteredTransactions("?type_of_outlay=expense&days=30"));
      dispatch(getFilteredTransactions("?type_of_outlay=income&days=30"));
    }
  }, [
    isAddWalletSuccess,
    isEditWalletSuccess,
    isDeleteWalletSuccess,
    isAddBankDataSuccess,
  ]);

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

export default HomePage;
