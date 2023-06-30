import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { loginUser } from "../../../store/userSlice";
import { LoginFormData } from "../../../store/types";

import { emailFieldRules } from "../../../shared/utils/field-rules/email";
import { passwordInputRules } from "../../../shared/utils/field-rules/password";

import { Box } from '../../atoms/box/Box.styled';
import { Typography } from '../../atoms/typography/Typography.styled';
import { Img } from '../../atoms/img/Img.styled';
import { Container } from "../../atoms/container/Container.styled";
import { Form } from "../../atoms/form/Form.styled";
import { Link } from '../../atoms/link/Link.styled';
import { Button } from "../../atoms/button/Button.styled";
import BaseField from "../../molecules/base-field/BaseField";

import logo from "../../../shared/assets/images/logo.png";
import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";

import COLORS from "../../../shared/styles/variables";

const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    const { loginError, isLoggedIn, isLoading } = useAppSelector(state => state.user)

    const handleSub = (data: LoginFormData) => {
        dispatch(loginUser(data));
    }

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({ mode: "all" });

    useEffect(() => {
        if (isLoggedIn) {
            navigate('/home');
            reset();
        }
    }, [isLoggedIn]);

    return (
        <Container display="flex" overflowX="hidden">
            <Box flex="1" overflow="hidden" height="100vh" background={COLORS.GRADIENT}>
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
            </Box>
            <Box display="flex" flexDirection="column" width="592px" alignItems="center" textAlign="center"
                background={COLORS.WHITE}>
                <Box m="auto 0" justifyContent="center">
                    <Img src={logo} alt="Logo" />
                    <Typography fw="700" fz="24px" lh="170%" color={COLORS.ALMOST_BLACK_FOR_TEXT} textAlign="center"
                        m="48px 0 48px 0">
                        Вхід до вашого акаунту
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
                        alignItems="end">
                        <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
                            <BaseField
                                fieldType="text"
                                label="Пошта"
                                errors={errors}
                                name="email"
                                registerOptions={register('email', emailFieldRules)}
                            />
                            <BaseField
                                fieldType="password"
                                label="Пароль"
                                name="password"
                                errors={errors}
                                isPasswordVisible={showPassword}
                                setIsPasswordVisible={setShowPassword}
                                registerOptions={register("password", passwordInputRules)}
                            />
                            <Box width="320px" display="flex" justifyContent="end" mt="25px">
                                <Link
                                    to="/password-recovery"
                                    fz="14px"
                                    fw="600"
                                    lh="17px"
                                    color={COLORS.PRIMARY}
                                >
                                    Забули пароль?
                                </Link>
                            </Box>
                        </Box>

                        {loginError && <Typography
                            as="p"
                            color="red"
                            fz="16px"
                            textAlight="center"
                            mt="30px"
                            textAlign="center"
                        >
                            {loginError}
                        </Typography>}

                        <Button type="submit" disabled={!isValid || isLoading} m="50px auto 0" primary>
                            Увійти
                        </Button>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginPage;