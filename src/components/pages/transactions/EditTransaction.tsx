import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  resetActiveTransactionState,
  setActiveTransaction,
  setEditTransactionData,
  setIsEditTransactionOpen,
  transactionAction,
} from "../../../store/transactionSlice";

import { setSelectOptions } from "../../../shared/utils/transactions/setSelectOptions";
import { setDetailsFieldRules } from "../../../shared/utils/field-rules/details";
import { amountFieldRules } from "../../../shared/utils/field-rules/amount";

import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { Typography } from "../../atoms/typography/Typography.styled";
import { Label } from "../../atoms/label/Label.styled";
import { Form } from "../../atoms/form/Form.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import Select from "../../molecules/select/Select";
import Wallet from "../../molecules/wallet/Wallet";
import BaseField from "../../molecules/base-field/BaseField";
import TabSwitch from "../../molecules/tabs/switch/TabSwitch";
import DatePicker from "./DatePicker";

import COLORS from "../../../shared/styles/variables";

import { IWallet } from "../../../../types/wallet";
import { ISwitchButton, TypeOfOutlay } from "../../../../types/common";

const EditTransaction: React.FC = () => {
  const dispatch = useAppDispatch();

  const { isLoading, editTransactionData, isEditTransactionOpen } =
    useAppSelector((state) => state.transaction);
  const { categories } = useAppSelector((state) => state.category);
  const { wallets } = useAppSelector((state) => state.wallet);

  const selectedCategory = categories.all.find(
    (c) => c.id === editTransactionData?.category
  );

  const [selectedCategoryValues, setSelectedCategoryValues] = useState<{
    value: number;
    label: string;
  }>({
    value: selectedCategory?.id,
    label: selectedCategory?.title,
  });

  const isValid =
    Object.keys(editTransactionData)?.length >= 5 &&
    editTransactionData?.amount_of_funds !== "";

  const selectOptions = setSelectOptions(
    editTransactionData.type_of_outlay,
    categories
  );

  const setSwitchButtonOptions = (
    buttonName: string,
    typeOfOutlay: TypeOfOutlay
  ): ISwitchButton => {
    return {
      buttonName,
      isActive: editTransactionData?.type_of_outlay === typeOfOutlay,
      onTabClick: () => {
        if (editTransactionData?.type_of_outlay === typeOfOutlay) {
          return;
        }
        dispatch(
          setEditTransactionData({
            type_of_outlay: typeOfOutlay,
            category: categories[typeOfOutlay][0]?.id,
          })
        );
        setSelectedCategoryValues({
          value: categories[typeOfOutlay][0]?.id,
          label: categories[typeOfOutlay][0]?.title,
        });
      },
    };
  };

  const switchButtons: ISwitchButton[] = [
    setSwitchButtonOptions("Витрата", "expense"),
    setSwitchButtonOptions("Надходження", "income"),
  ];

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
    getValues,
  } = useForm({ mode: "all" });

  const handleCancelEditTransaction = () => {
    dispatch(setIsEditTransactionOpen(false));
    dispatch(setEditTransactionData({}));
    dispatch(resetActiveTransactionState({}));
  };

  const handleDeleteTransaction = () => {
    dispatch(setIsEditTransactionOpen(false));
    dispatch(
      transactionAction({
        method: "DELETE",
        id: String(editTransactionData?.id),
      })
    );
    dispatch(setActiveTransaction({}));
  };

  const onCategoryChange = (selectedValue: any): void => {
    dispatch(setEditTransactionData({ category: selectedValue?.value }));
    setSelectedCategoryValues({
      value: selectedValue?.value,
      label: selectedValue?.label,
    });
  };

  const onWalletClick = (wallet: IWallet) => {
    dispatch(setEditTransactionData({ wallet: wallet.id }));
  };

  const handleSub = (data: { amount: string; title?: string }) => {
    const editTransactionDataNoId = {
      ...editTransactionData,
      amount_of_funds: data?.amount,
    };

    if (!getValues("title")) {
      editTransactionDataNoId.title = "New transaction";
    } else {
      editTransactionDataNoId.title = data.title;
    }

    delete editTransactionDataNoId?.id;

    dispatch(setIsEditTransactionOpen(false));
    dispatch(resetActiveTransactionState({}));
    dispatch(
      transactionAction({
        data: editTransactionDataNoId,
        method: "PUT",
        id: String(editTransactionData?.id),
      })
    );
  };

  useEffect(() => {
    setSelectedCategoryValues({
      value: selectedCategory?.id,
      label: selectedCategory?.title,
    });
    clearErrors("category");
    setValue("category", editTransactionData?.category);
  }, [editTransactionData?.category]);

  useEffect(() => {
    clearErrors("amount");
    setValue("amount", editTransactionData?.amount_of_funds);
  }, [editTransactionData?.amount_of_funds]);

  useEffect(() => {
    if (editTransactionData?.title !== "New transaction") {
      setValue("title", editTransactionData?.title);
    } else {
      setValue("title", "");
    }
  }, [editTransactionData?.title]);

  return (
    <Box display="flex" direction="column" width="555px">
      <Typography as="h2" fw="600" fz="22px" mt="5px" mb="30px">
        Редагування транзакції
      </Typography>
      <Box
        bgColor={COLORS.MENU_BUTTON_SELECTED}
        borderRadius="16px"
        grow="1"
        p="15px"
        overflow="auto"
        height="100px">
        <Box mb="20px">
          <Typography as="h3" fz="16px" fw="500" mb="12px">
            Тип транзакції
          </Typography>
          <TabSwitch switchButtons={switchButtons} />
        </Box>
        <Box mb="20px">
          <Typography as="h3" fz="16px" fw="500" mb="12px">
            Час транзакції
          </Typography>
          <DatePicker isEditTrapsactionOpen={isEditTransactionOpen} />
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
                  isActive={editTransactionData?.wallet === wallet.id}
                />
              </ListItem>
            ))}
          </Box>
        </Box>
        <Form onSubmit={handleSubmit(handleSub)}>
          <Box mb="20px">
            <Label fw="500" mb="12px">
              Категорія
            </Label>
            <Select
              value={selectedCategoryValues}
              options={selectOptions}
              onCategoryChange={onCategoryChange}
              {...register("category", {
                required: "Обов'язкове поле для заповнення",
              })}
              isError={errors?.category}
            />
          </Box>
          <Box mb="20px">
            <BaseField
              fieldType="text"
              label="Деталі (не обовʼязково)"
              errors={errors}
              name="title"
              registerOptions={register(
                "title",
                setDetailsFieldRules(clearErrors)
              )}
            />
          </Box>
          <Box mb="20px">
            <BaseField
              fieldType="text"
              label="Сума"
              errors={errors}
              name="amount"
              registerOptions={register("amount", amountFieldRules)}
            />
          </Box>
          <Box display="flex" gap="8px" mb="20px">
            <Button
              primary
              width="100%"
              type="submit"
              disabled={!isValid || !!errors?.amount || isLoading}>
              Зберегти
            </Button>
            <Button
              secondary
              width="100%"
              onClick={handleCancelEditTransaction}>
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
};

export default EditTransaction;
