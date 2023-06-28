import { useEffect, useState } from "react";

import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import {
  resetActiveTransactionState,
  setActiveTransaction,
  setEditTransactionData,
  setIsEditTransactionOpen,
  transactionAction
} from "../../../store/transactionSlice";

import { setSelectOptions } from "../../../shared/utils/transactions/setSelectOptions";
import { detailsFieldRules } from "../../../shared/utils/field-rules/details";
import { amountFieldRules } from "../../../shared/utils/field-rules/amount";

import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { Typography } from "../../atoms/typography/Typography.styled";
import { Label } from "../../atoms/label/Label.styled";
import { Form } from "../../atoms/form/Form.styled";
import Select from "../../molecules/select/Select";
import DatePicker from "./DatePicker";
import BaseField from "../../molecules/base-field/BaseField";

import { MENU_BUTTON_SELECTED } from "../../../shared/styles/variables";

const EditTransaction: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    isLoading,
    editTransactionData,
    isEditTransactionOpen
  } = useAppSelector(state => state.transaction)
  const { categories } = useAppSelector(state => state.category);

  const selectedCategory = categories.all.find((c) => c.id === editTransactionData?.category)

  const [selectedCategoryValues, setSelectedCategoryValues] = useState<
    { value: number, label: string }
  >({
    value: selectedCategory?.id,
    label: selectedCategory?.title,
  });

  const isValid = Object.keys(editTransactionData)?.length >= 5
    && editTransactionData?.amount_of_funds !== "";

  const selectOptions = setSelectOptions(
    editTransactionData.type_of_outlay,
    categories
  )

  const onCategoryChange = (selectedValue: any): void => {
    dispatch(setEditTransactionData({ category: selectedValue?.value }));
    setSelectedCategoryValues({
      value: selectedValue?.value,
      label: selectedValue?.label
    });
  }

  const handleCancelEditTransaction = () => {
    dispatch(setIsEditTransactionOpen(false));
    dispatch(setEditTransactionData({}));
    dispatch(resetActiveTransactionState({}));
  }

  const handleDeleteTransaction = () => {
    dispatch(setIsEditTransactionOpen(false));
    dispatch(transactionAction({
      method: "DELETE",
      id: String(editTransactionData?.id)
    }));
    dispatch(setActiveTransaction({}));
  }

  const handleSub = (data: { amount: string, title?: string }) => {
    const editTransactionDataNoId = {
      ...editTransactionData,
      amount_of_funds: data?.amount,
    }

    if (!getValues('title')) {
      editTransactionDataNoId.title = "New transaction";
    } else {
      editTransactionDataNoId.title = data.title;
    }

    delete editTransactionDataNoId?.id;

    dispatch(setIsEditTransactionOpen(false));
    dispatch(resetActiveTransactionState({}))
    dispatch(transactionAction({
      data: editTransactionDataNoId,
      method: "PUT",
      id: String(editTransactionData?.id)
    }));
  }

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
    getValues
  } = useForm({ mode: "all" });

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

  useEffect(() => {
    if (editTransactionData?.title !== "New transaction") {
      setValue('title', editTransactionData?.title);
    } else {
      setValue('title', "");
    }
  }, [editTransactionData?.title]);

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
            Час транзакції
          </Typography>
          <DatePicker isEditTrapsactionOpen={isEditTransactionOpen} />
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
          </Box>
          <Box mb="20px">
            <BaseField
              fieldType="text"
              label="Деталі (не обовʼязково)"
              errors={errors}
              name="title"
              registerOptions={register('title', detailsFieldRules(clearErrors))}
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
