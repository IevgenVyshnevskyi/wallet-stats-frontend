import { useEffect, useRef, useState } from "react";

import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { Typography } from "../../atoms/typography/Typography.styled";
import TabSwitch, { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import Wallet from "../../molecules/wallet/Wallet";
import { Label } from "../../atoms/label/Label.styled";
import { IWallet } from "../../../store/types";

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
import { MENU_BUTTON_SELECTED, WHITE } from "../../../shared/styles/variables";
import Select from "../../molecules/select/Select";
import DatePicker from "./DatePicker";

const EditTransaction: React.FC = () => {
  const dispatch = useAppDispatch()

  const { editTransactionData } = useAppSelector(state => state.transaction)
  const { categories } = useAppSelector(state => state.category);
  const { wallets } = useAppSelector(state => state.wallet);

  const amountInputValue = useRef<string>(editTransactionData?.amount_of_funds);
  amountInputValue.current = editTransactionData?.amount_of_funds;

  const selectedCategory = categories.all.find((c) => c.id === editTransactionData?.category)

  const [selectedCategoryValues, setSelectedCategoryValues] = useState<
    { value: number, label: string }
  >({
    value: selectedCategory?.id,
    label: selectedCategory?.title,
  });

  const options: any = (editTransactionData.type_of_outlay === "expense"
    ? categories.expense
    : categories.income
  )?.map(({ id, title }) => {
    return { value: id, label: title }
  })

  const isValid = Object.keys(editTransactionData)?.length >= 5
    && editTransactionData?.amount_of_funds !== "";

  const switchButtons: ISwitchButton[] = [
    {
      buttonName: 'Витрата',
      onTabClick: () => {
        dispatch(setEditTransactionData({
          type_of_outlay: "expense",
          category: categories.expense[0]?.id
        }));
        setSelectedCategoryValues({
          value: categories.expense[0]?.id,
          label: categories.expense[0]?.title
        })
      },
      isActive: editTransactionData?.type_of_outlay === "expense"
    },
    {
      buttonName: 'Надходження',
      onTabClick: () => {
        dispatch(setEditTransactionData({
          type_of_outlay: "income",
          category: categories.income[0]?.id
        }));
        setSelectedCategoryValues({
          value: categories.income[0]?.id,
          label: categories.income[0]?.title
        })
      },
      isActive: editTransactionData?.type_of_outlay === "income"
    },
  ];

  function onWalletClick(wallet: IWallet) {
    dispatch(setEditTransactionData({ wallet: wallet?.id }));
  };

  function onCategoryChange(e: any): void {
    dispatch(setEditTransactionData({ category: e?.value }));
    setSelectedCategoryValues({
      value: e?.value,
      label: e?.label
    });
  }

  useEffect(() => {
    setSelectedCategoryValues({
      value: selectedCategory?.id,
      label: selectedCategory?.title,
    });
  }, [editTransactionData.category]);

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
      id: String(editTransactionData?.id)
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
            value={selectedCategoryValues}
            options={options}
            onCategoryChange={onCategoryChange}
          />
        </Box>
        <Box mb="20px">
          <Label fw="500" htmlFor="sum" mb="12px">
            Сума
          </Label>
          <Input
            type="number"
            onChange={(e) => onInputChange(e)}
            value={amountInputValue.current}
            fz="22px"
            id="sum"
            width="270px"
            bgColor={WHITE}
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
