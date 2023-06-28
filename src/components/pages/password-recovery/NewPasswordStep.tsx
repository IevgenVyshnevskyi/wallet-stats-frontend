import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { confirmPasswordReset } from "../../../store/passwordRecoverySlice";

import { passwordRegex } from "../../../shared/utils/regexes";

import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { Container } from "../../atoms/container/Container.styled";
import { Img } from "../../atoms/img/Img.styled";
import { Input } from "../../atoms/input/Input.styled";
import { Label } from "../../atoms/label/Label.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { Form } from "../../atoms/form/Form.styled";

import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";
import logo from "../../../shared/assets/images/logo.png";
import VisibilityOn from '../../../shared/assets/icons/visibility-on.svg';
import VisibilityOff from '../../../shared/assets/icons/visibility-off.svg';

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
                <Label htmlFor="password" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                  textAlight="left">Пароль</Label>
                <Box position="relative">
                  <span onClick={() => setShowPassword(!showPassword)} style={{
                    position: "absolute", top: "16px",
                    right: "10px", cursor: "pointer"
                  }}>{showPassword ?
                    <VisibilityOff />
                    :
                    <VisibilityOn />
                    }</span>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    width="265px"
                    {...register("password", {
                      required: 'Обов\'язкове поле для заповнення',
                      pattern: {
                        value: passwordRegex,
                        message: "Пароль повинен містити не менше 8 символів, 1 літеру, 1 цифру та 1 спеціальний символ"
                      },
                    })}
                    style={{ paddingRight: '35px' }}
                    className={errors.password && 'error'}
                  />
                </Box>
                <Box color="red" textAlight="left" border="red" fz="13px" height="14px" width='300px'
                  m="0 0 0 4px">{errors?.password && <>{errors?.password?.message || 'Error!'}</>}</Box>
                <Label htmlFor="confirmPassword" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mt="20px"
                  mb="6px" textAlight="left">Повторити пароль</Label>
                <Box position="relative">
                  <span onClick={() => setShowConfirmPassword(!showConfirmPassword)} style={{
                    position: "absolute", top: "16px",
                    right: "10px", cursor: "pointer"
                  }}>{showConfirmPassword ?
                    <VisibilityOff />
                    :
                    <VisibilityOn />
                    }</span>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    width="265px"
                    {...register("confirmPassword", {
                      required: 'Обов\'язкове поле для заповнення',
                      validate: (val: string) => {
                        if (watch('password') != val) {
                          return "Паролі не співпадають";
                        }
                      }
                    })}
                    style={{ paddingRight: '35px' }}
                    className={errors.confirmPassword && 'error'}
                  />
                </Box>
                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                  m="0 0 20px 0">{errors?.confirmPassword && <>{errors?.confirmPassword?.message || 'Error!'}</>}</Box>
              </Box>
            </Box>
            <Button type="submit" disabled={!isValid || isLoading} width="139px" m="44px auto 0"
              primary>Зберегти</Button>
          </Form>
        </Box>
      </Box>
    </Container>
  )
}

export default NewPasswordStep;