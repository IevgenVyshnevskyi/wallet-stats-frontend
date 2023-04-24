import { forwardRef, useState } from "react";

import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { MENU_BUTTON_SELECTED, WHITE } from "../../../shared/styles/variables";
import { Typography } from "../../atoms/typography/Typography.styled";
import TabSwitch, { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import Wallet from "../../molecules/wallet/Wallet";
import { Label } from "../../atoms/label/Label.styled";
import { Select } from "../../atoms/select/Select.styled";
import { mockCategories } from "../../../../mock-data/categories";
import { Option } from "../../atoms/select/Option.styled";
import { IWallet } from "../../../store/types";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from 'date-fns/locale/uk';
registerLocale('uk', uk)

import {
  resetActiveTransactionState,
  setActiveTransaction,
  setEditTransactionData,
  setIsEditTransactionOpen,
  transactionAction
} from "../../../store/transactionSlice";

import { isDev } from "../../../consts/consts";
import { mockWallets } from "../../../../mock-data/wallets";
import { Input } from './../../atoms/input/Input.styled';
import { DateInput } from "../../atoms/input/InputDate.styled";
import { formatTransactionDateToString, formatTransactionDateToUTC } from '../../../shared/utils/formatTransactionDate';

const EditTransaction: React.FC = () => {
  const dispatch = useAppDispatch()

  const { wallets } = useAppSelector(state => state.wallet);
  const { categories } = useAppSelector(state => state.category);

  const {
    activeTransaction,
    editTransactionData,
    filterByTypeOfOutlay
  } = useAppSelector(state => state.transaction)

  const [startDate, setStartDate] = useState(new Date());

  const CustomInput = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref) => (
    <DateInput onClick={onClick} ref={ref}>
      {value}
    </DateInput>
  ));

  const isValid = Object.keys(editTransactionData)?.length >= 5
    && editTransactionData?.amount_of_funds !== "";

  const switchButtons: ISwitchButton[] = [
    {
      buttonName: 'Витрата',
      onTabClick: () => {
        dispatch(setEditTransactionData({ type_of_outlay: "expense" }));
      },
      isActive: editTransactionData?.type_of_outlay === "expense"
    },
    {
      buttonName: 'Надходження',
      onTabClick: () => {
        dispatch(setEditTransactionData({ type_of_outlay: "income" }));
      },
      isActive: editTransactionData?.type_of_outlay === "income"
    },
  ];

  function onDateChange(date: Date) {
    setStartDate(date);
    dispatch(setEditTransactionData({ created: formatTransactionDateToUTC(date) }))
  }

  function onWalletClick(wallet: IWallet) {
    dispatch(setEditTransactionData({ wallet: wallet.id }));
  };

  function onCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setEditTransactionData({ category: parseInt(e.target.value) }))
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setEditTransactionData({ amount_of_funds: e.target.value }))
  }

  function handleEditTransaction() {
    const editTransactionDataNoId = { ...editTransactionData }
    delete editTransactionDataNoId?.id;

    dispatch(setIsEditTransactionOpen(false));
    dispatch(resetActiveTransactionState({}))
    dispatch(transactionAction({
      data: editTransactionDataNoId,
      method: "PUT",
      id: String(editTransactionData?.id)
    }));
  }

  function handleCancelEditTransaction() {
    dispatch(setIsEditTransactionOpen(false));
    dispatch(setEditTransactionData({}));
    dispatch(resetActiveTransactionState({}));
  }

  function handleDeleteTransaction() {
    dispatch(setIsEditTransactionOpen(false));
    dispatch(transactionAction({
      method: "DELETE",
      id: String(activeTransaction?.id)
    }));
    dispatch(setActiveTransaction({}));
  }

  return (
    <Box display="flex" direction="column" width="540px">
      <Typography
        as="h2"
        fw="600"
        fz="22px"
        mt="5px"
        mb="30px"
      >
        Редагування транзакції
      </Typography>
      <Box bgColor={MENU_BUTTON_SELECTED} borderRadius="16px" grow="1" p="15px">
        <Box mb="20px">
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="12px"
          >
            Тип транзакції
          </Typography>
          <TabSwitch switchButtons={switchButtons} />
        </Box>
        <Box mb="20px">
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="12px"
          >
            Час транзакції
          </Typography>
          <DatePicker
            selected={editTransactionData?.created
              ? formatTransactionDateToString(editTransactionData?.created)
              : startDate
            }
            onChange={(date) => onDateChange(date)}
            dateFormat="EEEE, d MMMM, HH:mm"
            timeIntervals={1}
            locale="uk"
            showTimeSelect
            timeFormat="p"
            timeCaption="Час"
            customInput={<CustomInput />}
          />
        </Box>
        <Box mb="20px">
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="12px"
          >
            Рахунок
          </Typography>
          <Box display="flex">
            <List display="flex" gap="8px" wrap="wrap">
              {(isDev ? mockWallets : wallets).map((wallet, index) => (
                <ListItem key={index} width="250px">
                  <Wallet
                    wallet={wallet}
                    onWalletClick={() => onWalletClick(wallet)}
                    isActive={editTransactionData?.wallet === wallet.id}
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box mb="20px">
          <Label fw="500" mb="12px">Категорія</Label>

          <Select
            width="100%"
            defaultValue={(isDev ? mockCategories[0] : categories.all[0])?.title}
            onChange={(e) => onCategoryChange(e)}
          >
            {(filterByTypeOfOutlay === "expense"
              ? categories.expense
              : categories.income)?.map(({ title, id }) => (
                <Option key={id} value={id}>{title}</Option>
              ))}
          </Select>
        </Box>
        <Box mb="20px">
          <Label fw="500" htmlFor="sum" mb="12px">
            Сума
          </Label>
          <Input
            fz="22px"
            type="number"
            defaultValue={(isDev ? mockCategories[0] : categories.all[0])?.title}
            id="sum"
            width="270px"
            bgColor={WHITE}
            onChange={(e) => onInputChange(e)}
          />
        </Box>
        <Box display="flex" gap="8px" mb="20px">
          <Button
            primary
            width="100%"
            onClick={handleEditTransaction}
            disabled={!isValid}
          >
            Зберегти
          </Button>
          <Button
            secondary
            width="100%"
            onClick={handleCancelEditTransaction}
          >
            Скасувати
          </Button>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <ButtonLink onClick={handleDeleteTransaction}>
            Видалити транзакцію
          </ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}

export default EditTransaction;
