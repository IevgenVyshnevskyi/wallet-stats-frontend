import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { requestPasswordReset } from "../../../store/passwordRecoverySlice";

import { emailRegex } from "../../../shared/utils/regexes";

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

import {
  GRADIENT,
  WHITE,
  ALMOST_BLACK_FOR_TEXT
} from "../../../shared/styles/variables";

const EmailStep: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector(state => state.passwordRecovery)

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "all" });

  const handleSub = (data: { email: string }) => {
    dispatch(requestPasswordReset(data));
  }

  return (
    <Container display="flex">
      <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
        <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
      </Box>
      <Box display="flex" flexDirection="column" width="592px" justifyContent="center" alignItems="center"
        textAlign="center"
        background={WHITE}>
        <Box m="auto 0">
          <Img src={logo} alt="Logo" />
          <Typography fw="700" fz="24px" lh="170%" color={ALMOST_BLACK_FOR_TEXT} textAlign="center"
            m="48px 0 48px 0">
            Відновлення пароля
          </Typography>
          <Typography fw="400" fz="16px" lh="24px" m="0 0 24px 0" color={ALMOST_BLACK_FOR_TEXT}
            textAlign="center">
            Введіть пошту на яку ви реєстрували <br /> ваш аккаунт
          </Typography>
          <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
            alignItems="end">
            <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
              <Box mb="6px">
                <Label htmlFor="email" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                  textAlight="left">Пошта</Label>
                <Input {...register('email', {
                  required: 'Обов\'язкове поле для заповнення',
                  pattern: {
                    value: emailRegex,
                    message: "Введіть коректну електронну адресу"
                  }
                })} type="email" id="email" width="284px"
                  className={errors.email && 'error'}
                />
                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                  m="6px 0 58px 0">{errors?.email && <>{errors?.email?.message || 'Error!'}</>}</Box>
              </Box>
            </Box>
            <Button type="submit" disabled={!isValid || isLoading} width="100px" m="0 auto" mt="56px"
              primary>Далі</Button>
          </Form>
        </Box>
      </Box>
    </Container>
  )
}

export default EmailStep;