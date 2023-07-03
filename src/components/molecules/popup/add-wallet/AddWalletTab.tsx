import { useContext, useEffect } from "react";

import { useForm } from "react-hook-form";

import { PopupContext } from "../../../../contexts/PopupContext";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setBankDataSuccessStatus } from "../../../../store/bankDataSlice";
import {
  resetError,
  setActiveWallet,
  setSuccessStatus,
  walletAction
} from "../../../../store/walletSlice";

import { titleFieldRules } from "../../../../shared/utils/field-rules/title";
import { amountFieldRules } from "../../../../shared/utils/field-rules/amount";

import { userId } from "../../../../api/api";

import { Form } from "../../../atoms/form/Form.styled";
import { Box } from "../../../atoms/box/Box.styled";
import { Button } from "../../../atoms/button/Button.styled";
import { Typography } from "../../../atoms/typography/Typography.styled";
import BaseField from "../../base-field/BaseField";

import COLORS from "../../../../shared/styles/variables";

import { IWallet, WalletFormData } from "../../../../../types/wallet";

const AddWalletTab: React.FC = () => {
  const dispatch = useAppDispatch()

  const { setIsAddWalletPopupOpen } = useContext(PopupContext);

  const {
    error,
    isAddWalletSuccess,
    isLoading
  } = useAppSelector(state => state.wallet);

  const { user } = useAppSelector(state => state.user);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset
  } = useForm({ mode: "all" });

  const handleCloseClick = () => {
    reset();
    dispatch(setActiveWallet(null));
    dispatch(resetError());
    dispatch(setSuccessStatus(false));
    dispatch(setBankDataSuccessStatus(false));
    setIsAddWalletPopupOpen(false);
  };

  const handleSubmitWallet = (data: WalletFormData) => {
    const wallet: IWallet = {
      title: data.title,
      amount: data.amount,
      type_of_account: "bank",
      owner: user?.id || userId,
    }

    dispatch(walletAction({
      data: wallet,
      method: "POST",
    }))
  }

  useEffect(() => {
    if (isAddWalletSuccess) {
      handleCloseClick();
    }
  }, [isAddWalletSuccess]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleCloseClick()
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <Form onSubmit={handleSubmit(handleSubmitWallet)}>
      <Box mb="25px">
        <BaseField
          fieldType="text"
          label="Введіть назву карткового рахунку"
          errors={errors}
          name="title"
          registerOptions={register('title', titleFieldRules)}
          width="325px"
        />
        <BaseField
          fieldType="text"
          label="Введіть суму коштів на рахунку"
          errors={errors}
          name="amount"
          registerOptions={register('amount', amountFieldRules)}
          width="325px"
        />
      </Box>

      {error && <Typography as="p" color={COLORS.ALERT_1}>{error}</Typography>}

      <Box
        display="flex"
        width="376px"
        justifyContent="space-between"
        borderTop={`2px solid ${COLORS.DIVIDER}`}
        pt="51px"
        mb="25px"
      >
        <Button type="submit" width="176px" primary disabled={!isValid || isLoading}>
          Зберегти
        </Button>
        <Button type="reset" width="176px" secondary onClick={handleCloseClick}>
          Скасувати
        </Button>
      </Box>
    </Form>
  )
}

export default AddWalletTab;