import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { confirmPasswordReset } from "../../../store/passwordRecoverySlice";

import {
  confirmPasswordInputRules,
  passwordInputRules
} from "../../../shared/utils/field-rules/password";

import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { Container } from "../../atoms/container/Container.styled";
import { Img } from "../../atoms/img/Img.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { Form } from "../../atoms/form/Form.styled";
import BaseField from "../../molecules/base-field/BaseField";

import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";
import logo from "../../../shared/assets/images/logo.png";

import {
  GRADIENT,
  WHITE,
  ALMOST_BLACK_FOR_TEXT
} from "../../../shared/styles/variables";

const NewPasswordStep: React.FC<{
  uid: string,
  resetToken: string
}> = ({ uid, resetToken }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { isNewPasswordSet, isLoading } = useAppSelector(state => state.passwordRecovery)

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSub = (data: { password: string, confirmPassword: string }) => {
    dispatch(confirmPasswordReset({
      uid,
      token: resetToken,
      new_password: data?.password,
    }))
  }

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    watch,
  } = useForm({ mode: "all" });

  useEffect(() => {
    if (isNewPasswordSet) {
      navigate('/login')
    }
  }, [isNewPasswordSet]);

  return (
    <Container display="flex">
      <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
        <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
      </Box>
      <Box display="flex" flexDirection="column" width="592px" justifyContent="center" alignItems="center" textAlign="center"
        background={WHITE}>
        <Box m="auto 0" alignItems="center" textAlign="center">
          <Img src={logo} alt="Logo" />
          <Typography fw="700" fz="24px" lh="170%" color={ALMOST_BLACK_FOR_TEXT} textAlign="center"
            m="48px 0 48px 0">
            Створення нового пароля
          </Typography>
          <Typography fw="400" fz="16px" lh="24px" m="0 0 24px 0" color={ALMOST_BLACK_FOR_TEXT}
            textAlign="center">
            Введіть новий пароль для вашого <br /> аккаунту
          </Typography>
          <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
            alignItems="end">
            <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
              <Box mb="6px">
                <BaseField
                  fieldType="password"
                  label="Пароль"
                  name="password"
                  errors={errors}
                  isPasswordVisible={showPassword}
                  setIsPasswordVisible={setShowPassword}
                  registerOptions={register("password", passwordInputRules)}
                />
                <BaseField
                  fieldType="password"
                  label="Повторити пароль"
                  name="confirmPassword"
                  errors={errors}
                  isPasswordVisible={showConfirmPassword}
                  setIsPasswordVisible={setShowConfirmPassword}
                  registerOptions={register(
                    "confirmPassword",
                    confirmPasswordInputRules(watch, "new_password")
                  )}
                />
              </Box>
            </Box>
            <Button type="submit" disabled={!isValid || isLoading} width="139px" m="44px auto 0"
              primary>
              Зберегти
            </Button>
          </Form>
        </Box>
      </Box>
    </Container>
  )
}

export default NewPasswordStep;