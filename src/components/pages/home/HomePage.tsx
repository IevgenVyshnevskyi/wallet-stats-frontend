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
import React, { useContext } from "react";
import PopupAddWallet from "../../molecules/popup/PopupAddWallet";
import PopupEditWallet from "../../molecules/popup/PopupEditWallet";
import { mockTransactions } from "../../../../mock-data/transactions";
import { mockWallets } from "../../../../mock-data/wallets";
import Transaction from "../../molecules/transaction/Transaction";

const HomePage: React.FC = () => {
  const {
    isAddWalletPopupOpen,
    isEditWalletPopupOpen
  } = useContext(PopupContext);

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
}

const Wallets: React.FC = () => {
  const {
    setIsAddWalletPopupOpen,
    setIsEditWalletPopupOpen
  } = useContext(PopupContext);

  const handleAddWalletClick = () => {
    setIsAddWalletPopupOpen(true);
  };

  const handleEditWalletClick = () => {
    setIsEditWalletPopupOpen(true);
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
            Готівка
          </Typography>
          <Wallet wallet={mockWallets[0]} />
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
            {mockWallets.map((wallet, index) => (
              <ListItem key={index} onClick={handleEditWalletClick}>
                <Wallet wallet={wallet} />
              </ListItem>
            ))}
          </List>
        </Box>
        <Button secondary onClick={handleAddWalletClick}>
          Додати картковий рахунок
        </Button>
      </Box>
    </Box>
  );
}

const Transactions: React.FC = () => {
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
      <List display="flex" direction="column" gap="8px" bgColor={BASE_2} grow="1">
        {mockTransactions.map((transaction, index) => (
          <ListItem key={index}>
            <Transaction transaction={transaction} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

const Statistics: React.FC = () => {
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
              32 450,67 ₴
            </Typography>
          </Box>
          <Box>
            <DoughnutChart />
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
              128 531,31 ₴
            </Typography>
          </Box>
          <Box>
            <DoughnutChart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePage;