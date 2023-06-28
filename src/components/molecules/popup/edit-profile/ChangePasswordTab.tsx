import { useContext, useEffect, useState } from "react";

import { useForm } from 'react-hook-form';

import { PopupContext } from "../../../../contexts/PopupContext";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  changeUserPassword,
  resetProfileEditErrors,
  setSuccessStatus
} from "../../../../store/userSlice";

import {
  confirmPasswordInputRules,
  passwordInputRules
} from "../../../../shared/utils/field-rules/password";

import { Form } from "../../../atoms/form/Form.styled";
import { Box } from "../../../atoms/box/Box.styled";
import { Typography } from "../../../atoms/typography/Typography.styled";
import { Button } from "../../../atoms/button/Button.styled";
import BaseField from './../../base-field/BaseField';

import { ALERT_1, DIVIDER } from "../../../../shared/styles/variables";

import { PasswordChangeFormData } from "../../../../store/types";

const ChangePasswordTab: React.FC = () => {
  const dispatch = useAppDispatch();

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    isLoading,
    isPasswordChanged,
    passwordChangeError
  } = useAppSelector(state => state.user)

  const { setIsEditProfilePopupOpen } = useContext(PopupContext);

  const handleCloseClick = () => {
    dispatch(resetProfileEditErrors());
    setIsEditProfilePopupOpen(false);
  };

  const handleSubmitChangePassword = (data: PasswordChangeFormData) => {
    dispatch(changeUserPassword(data));
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch
  } = useForm({ mode: "all" });

  useEffect(() => {
    if (isPasswordChanged) {
      dispatch(setSuccessStatus(false))
      handleCloseClick();
    }
  }, [isPasswordChanged]);

  return (
    <Form onSubmit={handleSubmit(handleSubmitChangePassword)}>
      <BaseField
        fieldType="password"
        label="Старий пароль"
        name="old_password"
        errors={errors}
        isPasswordVisible={showOldPassword}
        setIsPasswordVisible={setShowOldPassword}
        registerOptions={register("old_password", passwordInputRules)}
      />
      <BaseField
        fieldType="password"
        label="Новий пароль"
        name="new_password"
        errors={errors}
        isPasswordVisible={showPassword}
        setIsPasswordVisible={setShowPassword}
        inputRules={passwordInputRules}
        registerOptions={register("new_password", passwordInputRules)}
      />
      <BaseField
        fieldType="password"
        label="Повторити пароль"
        name="new_password_2"
        errors={errors}
        isPasswordVisible={showConfirmPassword}
        setIsPasswordVisible={setShowConfirmPassword}
        registerOptions={register(
          "new_password_2",
          confirmPasswordInputRules(watch, "new_password")
        )}
      />

      {passwordChangeError && (
        <Typography as="p" color={ALERT_1} textAlight="center">{passwordChangeError}</Typography>
      )}

      <Box
        display="flex"
        justifyContent="center"
        gap="35px"
        borderTop={`2px solid ${DIVIDER}`}
        pt="24px"
        mb="24px"
      >
        <Button type="submit" disabled={!isValid || isLoading} primary width="100%">
          Зберегти
        </Button>
        <Button type="reset" secondary width="100%" onClick={handleCloseClick}>
          Скасувати
        </Button>
      </Box>
    </Form>
  )
}

export default ChangePasswordTab;