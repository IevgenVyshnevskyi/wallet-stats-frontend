import { useEffect, useState } from "react";

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
import { Form } from "../../atoms/form/Form.styled";
import { useForm } from "react-hook-form";
import { moneyAmountRegex } from "../../../shared/utils/regexes";

const EditTransaction: React.FC = () => {
  const dispatch = useAppDispatch()

  const { editTransactionData, isLoading } = useAppSelector(state => state.transaction)
  const { categories } = useAppSelector(state => state.category);
  const { wallets } = useAppSelector(state => state.wallet);

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

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
    reset,
  } = useForm({
    mode: "all",
  });

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

  useEffect(() => {
    setSelectedCategoryValues({
      value: selectedCategory?.id,
      label: selectedCategory?.title,
    });
    clearErrors('category');
    setValue('category', editTransactionData?.category);
  }, [editTransactionData?.category]);

  useEffect(() => {
    clearErrors('amount')
    setValue('amount', editTransactionData?.amount_of_funds);
  }, [editTransactionData?.amount_of_funds]);

  function onWalletClick(wallet: IWallet) {
    dispatch(setEditTransactionData({ wallet: wallet?.id }));
  };

  function onCategoryChange(selectedValue: any): void {
    dispatch(setEditTransactionData({ category: selectedValue?.value }));
    setSelectedCategoryValues({
      value: selectedValue?.value,
      label: selectedValue?.label
    });
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

  function handleSub(data: { amount: string }) {
    const editTransactionDataNoId = {
      ...editTransactionData,
      amount_of_funds: data?.amount
    }
    delete editTransactionDataNoId?.id;
    console.log(editTransactionDataNoId)

    dispatch(setIsEditTransactionOpen(false));
    dispatch(resetActiveTransactionState({}))
    dispatch(transactionAction({
      data: editTransactionDataNoId,
      method: "PUT",
      id: String(editTransactionData?.id)
    }));
  }

  return (
    <Box display="flex" direction="column" width="555px">
      <Typography
        as="h2"
        fw="600"
        fz="22px"
        mt="5px"
        mb="30px"
      >
        Редагування транзакції
      </Typography>
      <Box bgColor={MENU_BUTTON_SELECTED} borderRadius="16px" grow="1" p="15px" overflow="auto" height="100px">
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
        <Form onSubmit={handleSubmit(handleSub)}>
          <Box mb="20px">
            <Label fw="500" mb="12px">Категорія</Label>
            <Select
              value={selectedCategoryValues}
              options={options}
              onCategoryChange={onCategoryChange}
              {...register('category', {
                required: 'Обов\'язкове поле для заповнення',
              })}
              isError={errors?.category}
            />
          </Box>
          <Box mb="20px">
            <Label fw="500" htmlFor="amount" mb="12px">
              Сума
            </Label>
            <Input
              type="text"
              inputMode="numeric"
              fz="22px"
              id="amount"
              width="270px"
              bgColor={WHITE}
              {...register('amount', {
                required: 'Обов\'язкове поле для заповнення',
                pattern: {
                  value: moneyAmountRegex,
                  message: 'Сума може бути від 1 до 8 цифр перед крапкою та до 2 цифр після крапки',
                },
                min: {
                  value: 0.00,
                  message: 'Сума може бути додатньою від 1 до 8 цифр перед крапкою та до 2 цифр після крапки',
                },
              })}
              className={errors.amount && 'error'}
            />
            <Box
              color="red"
              textAlight="left"
              border="red"
              fz="13px"
              height="14px"
              m="0 0 20px 0"
            >
              {errors?.amount && <>{errors?.amount?.message || 'Error!'}</>}
            </Box>
          </Box>
          <Box display="flex" gap="8px" mb="20px">
            <Button
              primary
              width="100%"
              type="submit"
              disabled={!isValid || !!errors?.amount || isLoading}
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
        </Form>
      </Box>
    </Box>
  );
}

export default EditTransaction;
