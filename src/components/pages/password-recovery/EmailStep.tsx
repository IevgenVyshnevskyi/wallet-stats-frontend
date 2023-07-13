import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { requestPasswordReset } from "../../../store/passwordRecoverySlice";

import emailFieldRules from "../../../shared/utils/field-rules/email";

import Button from "../../atoms/button/Button.styled";
import Box from "../../atoms/box/Box.styled";
import Container from "../../atoms/container/Container.styled";
import Img from "../../atoms/img/Img.styled";
import Typography from "../../atoms/typography/Typography.styled";
import Form from "../../atoms/form/Form.styled";
import BaseField from "../../molecules/base-field/BaseField";

import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";
import logo from "../../../shared/assets/images/logo.png";

import COLORS from "../../../shared/styles/variables";

const EmailStep: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.passwordRecovery);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "all" });

  const handleSub = (data: { email: string }) => {
    dispatch(requestPasswordReset(data));
  };

  return (
    <Container display="flex">
      <Box
        flex="1"
        overflow="hidden"
        height="100vh"
        background={COLORS.GRADIENT}>
        <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="592px"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        background={COLORS.WHITE}>
        <Box m="auto 0">
          <Img src={logo} alt="Logo" />
          <Typography
            fw="700"
            fz="24px"
            lh="170%"
            color={COLORS.ALMOST_BLACK_FOR_TEXT}
            textAlign="center"
            m="48px 0 48px 0">
            Відновлення пароля
          </Typography>
          <Typography
            fw="400"
            fz="16px"
            lh="24px"
            m="0 0 24px 0"
            color={COLORS.ALMOST_BLACK_FOR_TEXT}
            textAlign="center">
            Введіть пошту на яку ви реєстрували <br /> ваш аккаунт
          </Typography>
          <Form
            onSubmit={handleSubmit(handleSub)}
            maxWidth="592px"
            textAlign="center"
            alignItems="end">
            <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
              <Box mb="6px">
                <BaseField
                  fieldType="text"
                  label="Пошта"
                  errors={errors}
                  name="email"
                  registerOptions={register("email", emailFieldRules)}
                />
              </Box>
            </Box>
            <Button
              type="submit"
              disabled={!isValid || isLoading}
              width="100px"
              m="0 auto"
              mt="56px"
              primary>
              Далі
            </Button>
          </Form>
        </Box>
      </Box>
    </Container>
  );
};

export default EmailStep;
