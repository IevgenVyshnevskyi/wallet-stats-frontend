import { useEffect, useRef, useState } from 'react';
import { mockWallets } from "../../../../mock-data/wallets";
import { isDev } from "../../../consts/consts";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { Input } from "../../atoms/input/Input.styled";
import { Label } from "../../atoms/label/Label.styled";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import Select from "../../molecules/select/Select";
import { Typography } from "../../atoms/typography/Typography.styled";
import TabSwitch, { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";
import Wallet from "../../molecules/wallet/Wallet";
import { BASE_2, WHITE } from "../../../shared/styles/variables";
import { IWallet } from "../../../store/types";

import {
  setActiveTransaction,
  setAddTransactionData,
  transactionAction
} from "../../../store/transactionSlice";

import { formatTransactionDateToUTC } from '../../../shared/utils/formatTransactionDate';
import { userId } from '../../../api/api';
import { getFilteredCategories } from '../../../store/categorySlice';
import DatePicker from './DatePicker';

const AddTransaction: React.FC = () => {
  const dispatch = useAppDispatch()

  const { addTransactionData } = useAppSelector(state => state.transaction);
  const { categories } = useAppSelector(state => state.category);
  const { wallets } = useAppSelector(state => state.wallet);
  const { user } = useAppSelector(state => state.user);

  const isValid = Object.keys(addTransactionData || {})?.length >= 5
    && addTransactionData?.amount_of_funds !== "";

  const selectedCategory = categories.all.find((c) => c.id === addTransactionData?.category)

  const [selectedCategoryValues, setSelectedCategoryValues] = useState<
    { value: number, label: string }
  >({
    value: selectedCategory?.id,
    label: selectedCategory?.title,
  });

  const options: any = (addTransactionData?.type_of_outlay === "expense"
    ? categories.expense
    : categories.income
  )?.map(({ id, title }) => {
    return { value: id, label: title }
  })

  const switchButtons: ISwitchButton[] = [
    {
      buttonName: 'Витрата',
      onTabClick: () => {
        dispatch(setAddTransactionData({ type_of_outlay: "expense" }));
        setSelectedCategoryValues({
          value: categories.expense[0]?.id,
          label: categories.expense[0]?.title
        })
      },
      isActive: addTransactionData?.type_of_outlay === "expense"
    },
    {
      buttonName: 'Надходження',
      onTabClick: () => {
        dispatch(setAddTransactionData({ type_of_outlay: "income" }));
        setSelectedCategoryValues({
          value: categories.income[0]?.id,
          label: categories.income[0]?.title
        })
      },
      isActive: addTransactionData?.type_of_outlay === "income"
    },
  ];

  useEffect(() => {
    dispatch(getFilteredCategories("?type_of_outlay=income"))
    dispatch(getFilteredCategories("?type_of_outlay=expense"))
  }, []);

  useEffect(() => {
    setSelectedCategoryValues({
      value: categories.expense[0]?.id,
      label: categories.expense[0]?.title
    })
    dispatch(setAddTransactionData({
      created: formatTransactionDateToUTC(new Date()),
      type_of_outlay: "expense",
      category: categories.expense[0]?.id
    }))
  }, [categories.expense]);

  function onWalletClick(wallet: IWallet) {
    dispatch(setAddTransactionData({ wallet: wallet.id }));
  };

  function onCategoryChange(e: any): void {
    dispatch(setAddTransactionData({ category: e?.value }));
    setSelectedCategoryValues({
      value: e?.value,
      label: e?.label
    });
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
          <DatePicker />
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
            value={selectedCategoryValues}
            options={options}
            onCategoryChange={onCategoryChange}
          />
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