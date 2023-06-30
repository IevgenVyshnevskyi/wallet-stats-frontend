import { useContext, useState, useRef, useEffect } from "react";

import { useForm } from "react-hook-form";

import { PopupContext } from "../../../../contexts/PopupContext";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setBankDataSuccessStatus, sendBankData } from "../../../../store/bankDataSlice";
import { setSuccessStatus } from "../../../../store/userSlice";
import { setActiveWallet, resetError } from "../../../../store/walletSlice";

import { titleFieldRules } from "../../../../shared/utils/field-rules/title";

import { userId } from "../../../../api/api";

import { Box } from "../../../atoms/box/Box.styled";
import { Button } from "../../../atoms/button/Button.styled";
import { Input } from "../../../atoms/input/Input.styled";
import { Typography } from "../../../atoms/typography/Typography.styled";
import { Form } from "../../../atoms/form/Form.styled";
import BaseField from "../../base-field/BaseField";
import BankdataInfoMessage from "./BankdataInfoMessage";

import { ALERT_1, DIVIDER } from "../../../../shared/styles/variables";

import { IBankData } from "../../../../store/types";

const AddBankDataTab: React.FC = () => {
  const dispatch = useAppDispatch()

  const [fileValue, setFileValue] = useState<any>();

  const inputFileRef = useRef<HTMLInputElement>(null);
  const submitButtonRef = useRef<HTMLButtonElement>(null);

  const { setIsAddWalletPopupOpen } = useContext(PopupContext);

  const {
    error,
    isAddWalletSuccess,
    isLoading
  } = useAppSelector(state => state.wallet);
  const { user } = useAppSelector(state => state.user);
  const { isAddBankDataSuccess } = useAppSelector(state => state.bankData);

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

  const handleSubmitBankData = (data: IBankData) => {
    const formData: any = new FormData();
    formData.append('file', fileValue);
    formData.append('owner', user?.id || userId);
    formData.append('wallettitle', data.wallettitle);

    dispatch(sendBankData(formData));
  }

  useEffect(() => {
    if (isAddBankDataSuccess) {
      handleCloseClick();
      dispatch(setBankDataSuccessStatus(false));
    }
  }, [isAddBankDataSuccess]);

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
    <Form onSubmit={handleSubmit(handleSubmitBankData)}>
      <Box mb="25px">
        <BaseField
          fieldType="text"
          label="Введіть назву карткового рахунку"
          errors={errors}
          name="wallettitle"
          registerOptions={register('wallettitle', titleFieldRules)}
          width="325px"
        />
        <Box>
          <Button
            primary
            onClick={() => inputFileRef.current.click()}
            width="376px"
            type="button"
          >
            Вибрати файл даних
          </Button>

          <Input
            height="100px"
            type="file"
            accept=".xls"
            ref={inputFileRef}
            onChange={(e) => setFileValue(e.target.files[0])}
            multiple={false}
            style={{ display: "none" }}
          />
          <Box height="55px">
            {error && <BankdataInfoMessage message="error" />}
            {isAddWalletSuccess && <BankdataInfoMessage message="success" />}
          </Box>
        </Box>
      </Box>

      {error && <Typography as="p" color={ALERT_1}>{error}</Typography>}

      <Box
        display="flex"
        width="376px"
        justifyContent="space-between"
        borderTop={`2px solid ${DIVIDER}`}
        pt="51px"
        mb="25px"
      >
        <Button
          type="submit"
          width="176px"
          ref={submitButtonRef}
          primary
          disabled={!isValid || !fileValue || isLoading}
        >
          Зберегти
        </Button>
        <Button type="reset" width="176px" secondary onClick={handleCloseClick}>
          Скасувати
        </Button>
      </Box>
    </Form>
  )
}

export default AddBankDataTab;