import { BASE_2, DIVIDER } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import Header from '../../molecules/header/Header';
import { Typography } from '../../atoms/typography/Typography.styled';
import Card from '../../molecules/card/Card';
import { ListItem } from '../../atoms/list/ListItem.styled';
import { List } from "../../atoms/list/List.styled";
import { Button } from "../../atoms/button/Button.styled";
import Transaction from "../../molecules/transaction/Transaction";
import Chart from "../../molecules/chart/Chart";
import { MainPageWrapper } from "./MainPageWrapper";
import { PopupContext } from "../../../contexts/PopupContext";
import { useContext } from "react";
import PopupAddAccount from "./../../molecules/popup/PopupAddAccount";
import PopupEditAccount from "../../molecules/popup/PopupEditAccount";

const MainPage: React.FC = () => {
  const { isAddAccountPopupOpen, isEditAccountPopupOpen } = useContext(PopupContext);

  return (
    <>
      <MainPageWrapper>
        <Header />
        <Box m="0 20px 20px" display="flex" grow="1" gap="25px">
          <Accounts />
          <Transactions />
          <Statistics />
        </Box>
      </MainPageWrapper>

      {isAddAccountPopupOpen && <PopupAddAccount />}
      {isEditAccountPopupOpen && <PopupEditAccount />}
    </>
  );
}

const Accounts = () => {
  const { setIsAddAccountPopupOpen, setIsEditAccountPopupOpen } = useContext(PopupContext);

  const handleAddAccountClick = () => {
    setIsAddAccountPopupOpen(true);
  };

  const handleEditAccountClick = () => {
    setIsEditAccountPopupOpen(true);
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
          grow="1"
        >
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="20px"
          >
            Готівка
          </Typography>
          <Card sum="2 348,35 ₴" />
        </Box>
        <Box
          height="100%"
          mb="20px"
        >
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="20px"
          >
            Картки
          </Typography>
          <List>
            <ListItem onClick={handleEditAccountClick}>
              <Card name="Приват" sum="2 348,35 ₴" />
            </ListItem>
            <ListItem>
              <Card name="Моно" sum="13 248,26 ₴" />
            </ListItem>
          </List>
        </Box>
        <Button secondary onClick={handleAddAccountClick}>
          Додати картковий рахунок
        </Button>
      </Box>
    </Box>
  );
}

const Transactions = () => {
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
      <Box
        display="flex"
        direction="column"
        bgColor={BASE_2}
        p="15px"
        borderRadius="16px"
      >
        <Box mb="20px">
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="20px"
          >
            Пʼятниця, 10 березня
          </Typography>
          <List>
            <ListItem>
              <Transaction type="income" />
            </ListItem>
            <ListItem>
              <Transaction type="expense" />
            </ListItem>
            <ListItem>
              <Transaction type="income" />
            </ListItem>
          </List>
        </Box>
        <Box mb="20px">
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="20px"
          >
            Четвер, 9 березня
          </Typography>
          <List>
            <ListItem>
              <Transaction type="income" />
            </ListItem>
            <ListItem>
              <Transaction type="expense" />
            </ListItem>
            <ListItem>
              <Transaction type="income" />
            </ListItem>
          </List>
        </Box>
      </Box>
    </Box>
  );
}

const Statistics = () => {
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
            <Chart />
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
            <Chart />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;