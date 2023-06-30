import { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFilteredCategories } from '../../../store/categorySlice';
import {
  setActiveTransaction,
  setAddTransactionData,
  transactionAction
} from "../../../store/transactionSlice";

import {
  formatTransactionDateToUTC
} from '../../../shared/utils/transactions/formatTransactionDate';
import {
  setSelectOptions
} from '../../../shared/utils/transactions/setSelectOptions';
import { amountFieldRules } from '../../../shared/utils/field-rules/amount';
import { setDetailsFieldRules } from '../../../shared/utils/field-rules/details';

import { userId } from '../../../api/api';

import { Form } from '../../atoms/form/Form.styled';
import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { Label } from "../../atoms/label/Label.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import Select from "../../molecules/select/Select";
import Wallet from "../../molecules/wallet/Wallet";
import TabSwitch from "../../molecules/tabs/switch/TabSwitch";
import BaseField from '../../molecules/base-field/BaseField';
import DatePicker from './DatePicker';

import { BASE_2, } from "../../../shared/styles/variables";

import { IWallet, TypeOfOutlay } from "../../../store/types";
import { SelectOptions } from '../../../../types/molecules';
import { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";

const AddTransaction: React.FC = () => {
  const dispatch = useAppDispatch()

  const { addTransactionData, isLoading } = useAppSelector(state => state.transaction);
  const { categories } = useAppSelector(state => state.category);
  const { wallets } = useAppSelector(state => state.wallet);
  const { user } = useAppSelector(state => state.user);

  const selectedCategory = categories.all.find((c) => c.id === addTransactionData?.category)

  const [selectedCategoryValues, setSelectedCategoryValues] = useState<SelectOptions>({
    value: selectedCategory?.id,
    label: selectedCategory?.title,
  });

  const isValid = Object.keys(addTransactionData || {})?.length >= 4;

  const selectOptions = setSelectOptions(
    addTransactionData?.type_of_outlay,
    categories
  )

  const setSwitchButtonOptions = (
    buttonName: string,
    typeOfOutlay: TypeOfOutlay,
  ): any => {
    return {
      buttonName,
      isActive: addTransactionData?.type_of_outlay === typeOfOutlay,
      onTabClick: () => {
        if (addTransactionData?.type_of_outlay === typeOfOutlay) {
          return;
        };
        dispatch(setAddTransactionData({
          type_of_outlay: typeOfOutlay,
          category: categories[typeOfOutlay][0]?.id
        }));
        setSelectedCategoryValues({
          value: categories[typeOfOutlay][0]?.id,
          label: categories[typeOfOutlay][0]?.title
        })
      },
    }
  }

  const switchButtons: ISwitchButton[] = [
    setSwitchButtonOptions('Витрата', "expense"),
    setSwitchButtonOptions('Надходження', "income"),
  ];

  const onWalletClick = (wallet: IWallet) => {
    dispatch(setAddTransactionData({ wallet: wallet.id }));
  };

  const onCategoryChange = (selectedValue: any): void => {
    dispatch(setAddTransactionData({ category: selectedValue?.value }));
    setSelectedCategoryValues({
      value: selectedValue?.value,
      label: selectedValue?.label
    });
  }

  const handleSub = (
    data: {
      amount: string,
      category: number,
      title?: string
    }
  ) => {
    let transactionTitle;

    if (!getValues('title')) {
      transactionTitle = "New transaction";
    } else {
      transactionTitle = data.title;
    }

    dispatch(setActiveTransaction(null));
    dispatch(transactionAction({
      data: {
        ...addTransactionData,
        amount_of_funds: data?.amount,
        owner: user?.id || userId,
        title: transactionTitle
      },
      method: "POST"
    }))
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
    clearErrors,
  } = useForm({ mode: "all" });

  useEffect(() => {
    clearErrors('category');
    setValue('category', addTransactionData?.category);
  }, [addTransactionData?.category]);

  useEffect(() => {
    dispatch(getFilteredCategories("?type_of_outlay=income"))
    dispatch(getFilteredCategories("?type_of_outlay=expense"))

    dispatch(setAddTransactionData({
      created: formatTransactionDateToUTC(new Date()),
      type_of_outlay: "expense",
      category: categories.expense[0]?.id
    }))
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
    setValue('category', selectedCategoryValues)
  }, [categories.expense]);

  return (
    <Box display="flex" direction="column" width="555px">
      <Typography
        as="h2"
        fw="600"
        fz="22px"
        mt="5px"
        mb="30px"
      >
        Додати транзакцію
      </Typography>
      <Box overflow='auto' height="100px" bgColor={BASE_2} borderRadius="16px" grow="1" p="15px">
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
          <DatePicker isEditTrapsactionOpen={false} />
        </Box>
        <Box mb="20px">
          <Typography as="h3" fz="16px" fw="500" mb="12px">
            Рахунок
          </Typography>
          <Box display="flex" wrap="wrap" gap="8px">
            {wallets?.map((wallet, index) => (
              <ListItem key={index} flex="1 1 240px">
                <Wallet
                  wallet={wallet}
                  onWalletClick={() => onWalletClick(wallet)}
                  isActive={addTransactionData?.wallet === wallet.id}
                />
              </ListItem>
            ))}
          </Box>
        </Box>
        <Form onSubmit={handleSubmit(handleSub)}>
          <Box mb="20px">
            <Label fw="500" mb="12px">Категорія</Label>
            <Select
              value={selectedCategoryValues}
              options={selectOptions}
              onCategoryChange={onCategoryChange}
              {...register('category', {
                required: 'Обов\'язкове поле для заповнення',
              })}
              isError={errors?.category}
            />
            <Box
              color="red"
              textAlight="left"
              border="red"
              fz="13px"
              height="14px"
              m="0 0 20px 0"
            >
              {errors?.category && <>{errors?.category?.message || 'Error!'}</>}
            </Box>
          </Box>
          <Box mb="25px">
            <BaseField
              fieldType="text"
              label="Деталі (не обовʼязково)"
              errors={errors}
              name="title"
              registerOptions={register('title', setDetailsFieldRules(clearErrors))}
            />
          </Box>
          <Box mb="20px">
            <BaseField
              fieldType="text"
              label="Сума"
              errors={errors}
              name="amount"
              registerOptions={register('amount', amountFieldRules)}
            />
          </Box>
          <Box>
            <Button
              primary
              width="100%"
              type="submit"
              disabled={!isValid || !!errors?.amount || isLoading}
            >
              Зберегти
            </Button>
          </Box>
        </Form>
      </Box>
    </Box>
  );
}

export default AddTransaction;