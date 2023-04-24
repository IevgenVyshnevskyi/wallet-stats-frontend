import { forwardRef, useEffect, useRef, useState } from 'react';
import { mockCategories } from "../../../../mock-data/categories";
import { mockWallets } from "../../../../mock-data/wallets";
import { isDev } from "../../../consts/consts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { Input } from "../../atoms/input/Input.styled";
import { Label } from "../../atoms/label/Label.styled";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import { Select } from "../../atoms/select/Select.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import TabSwitch, { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";
import Wallet from "../../molecules/wallet/Wallet";
import { Option } from "../../atoms/select/Option.styled";
import { BASE_2, WHITE } from "../../../shared/styles/variables";
import { IWallet } from "../../../store/types";

import { DateInput } from "../../atoms/input/InputDate.styled";

import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from 'date-fns/locale/uk';
registerLocale('uk', uk)

import {
  setActiveTransaction,
  setAddTransactionData,
  transactionAction
} from "../../../store/transactionSlice";

import { formatTransactionDateToUTC } from '../../../shared/utils/formatTransactionDate';
import { userId } from '../../../api/api';
import { getFilteredCategories } from '../../../store/categorySlice';

const AddTransaction: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    addTransactionData,
    filterByTypeOfOutlay
  } = useAppSelector(state => state.transaction);
  const { categories } = useAppSelector(state => state.category);
  const { wallets } = useAppSelector(state => state.wallet);
  const { user } = useAppSelector(state => state.user);

  const [startDate, setStartDate] = useState(new Date());
  const selectRef = useRef(null);

  const isValid = Object.keys(addTransactionData || {})?.length >= 5
    && addTransactionData?.amount_of_funds !== "";

  const switchButtons: ISwitchButton[] = [
    {
      buttonName: 'Витрата',
      onTabClick: () => {
        dispatch(setAddTransactionData({ type_of_outlay: "expense" }));
      },
      isActive: addTransactionData?.type_of_outlay === "expense"
    },
    {
      buttonName: 'Надходження',
      onTabClick: () => {
        dispatch(setAddTransactionData({ type_of_outlay: "income" }));
      },
      isActive: addTransactionData?.type_of_outlay === "income"
    },
  ];

  const CustomInput = forwardRef<HTMLButtonElement, any>(({ value, onClick }, ref) => (
    <DateInput onClick={onClick} ref={ref}>
      {value}
    </DateInput>
  ));

  function onDateChange(date: Date) {
    console.log(date);
    setStartDate(date);
    dispatch(setAddTransactionData({ created: formatTransactionDateToUTC(date) }))
  }

  function onWalletClick(wallet: IWallet) {
    dispatch(setAddTransactionData({ wallet: wallet.id }));
  };

  function onCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setAddTransactionData({ category: parseInt(e.target.value) }))
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setAddTransactionData({ amount_of_funds: e.target.value }))
  }

  function handleAddTransaction() {
    dispatch(setActiveTransaction(null));
    dispatch(transactionAction({
      data: {
        ...addTransactionData,
        owner: user?.id || userId,
      },
      method: "POST"
    }))
  }

  useEffect(() => {
    dispatch(getFilteredCategories("?type_of_outlay=income"))
    dispatch(getFilteredCategories("?type_of_outlay=expense"))
    dispatch(setAddTransactionData({
      created: formatTransactionDateToUTC(startDate),
      type_of_outlay: "expense",
      category: selectRef.current.value
    }))
  }, []);

  return (
    <Box display="flex" direction="column" width="540px">
      <Typography
        as="h2"
        fw="600"
        fz="22px"
        mt="5px"
        mb="30px"
      >
        Додати транзакцію
      </Typography>
      <Box bgColor={BASE_2} borderRadius="16px" grow="1" p="15px">
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
            selected={startDate}
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
              {(isDev ? mockWallets : wallets)?.map((wallet, index) => (
                <ListItem key={index} width="250px">
                  <Wallet
                    wallet={wallet}
                    onWalletClick={() => onWalletClick(wallet)}
                    isActive={addTransactionData?.wallet === wallet.id}
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
            ref={selectRef}
            defaultValue={(isDev ? mockCategories[0] : categories.all[0])?.title}
            onChange={(e) => onCategoryChange(e)}
          >
            {(isDev
              ? mockCategories
              : addTransactionData?.type_of_outlay === "expense"
                ? categories.expense
                : categories.income)?.map(({ title, id }) => (
                  <Option key={id} value={id}>{title}</Option>
                ))}
          </Select>
        </Box>
        <Box mb="20px">
          <Label fw="500" htmlFor="sum" mb="12px">Сума</Label>
          <Input
            fz="22px"
            type="number"
            id="sum"
            width="270px"
            bgColor={WHITE}
            onChange={(e) => onInputChange(e)}
          />
        </Box>
        <Box>
          <Button
            disabled={!isValid}
            primary
            width="100%"
            onClick={handleAddTransaction}
          >
            Зберегти
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddTransaction;