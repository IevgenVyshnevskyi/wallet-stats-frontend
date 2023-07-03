import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { registerUser } from '../../../store/userSlice';

import { nameFieldRules } from "../../../shared/utils/field-rules/name";
import { emailFieldRules } from "../../../shared/utils/field-rules/email";
import {
    confirmPasswordInputRules,
    passwordInputRules
} from "../../../shared/utils/field-rules/password";

import { Box } from '../../atoms/box/Box.styled';
import { Typography } from '../../atoms/typography/Typography.styled';
import { Img } from '../../atoms/img/Img.styled';
import { Container } from "../../atoms/container/Container.styled";
import { Form } from "../../atoms/form/Form.styled";
import { Button } from "../../atoms/button/Button.styled";
import BaseField from "../../molecules/base-field/BaseField";

import logo from "../../../shared/assets/images/logo.png";
import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";

import COLORS from "../../../shared/styles/variables";

import { RegisterFormData } from "../../../../types/user";

const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const { registerError, isRegistered, isLoading } = useAppSelector(state => state.user)

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
        watch,
    } = useForm({ mode: "all" });

    useEffect(() => {
        if (isRegistered) {
            navigate('/data-entry');
            reset();
        }
    }, [isRegistered]);

    const handleSub = (data: RegisterFormData) => {
        dispatch(registerUser(data));
    }

    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={COLORS.GRADIENT}>
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
            </Box>
            <Box display="flex" flexDirection="column" width="592px" alignItems="center" textAlign="center"
                background={COLORS.WHITE}>
                <Box m="auto 0" alignItems="center" textAlign="center">
                    <Img src={logo} alt="Logo" />
                    <Typography fw="700" fz="24px" lh="170%" m="20px 0" color={COLORS.ALMOST_BLACK_FOR_TEXT} textAlign="center">
                        Реєстрація нового користувача
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
                        alignItems="end">
                        <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
                            <Box mb="10px">
                                <BaseField
                                    fieldType="text"
                                    label="Ім'я"
                                    errors={errors}
                                    name="first_name"
                                    registerOptions={register('first_name', nameFieldRules)}
                                />
                                <BaseField
                                    fieldType="text"
                                    label="Прізвище"
                                    errors={errors}
                                    name="last_name"
                                    registerOptions={register('last_name', nameFieldRules)}
                                />
                                <BaseField
                                    fieldType="email"
                                    label="Пошта"
                                    name="email"
                                    errors={errors}
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
                                <BaseField
                                    fieldType="password"
                                    label="Повторити пароль"
                                    name="password2"
                                    errors={errors}
                                    isPasswordVisible={showConfirmPassword}
                                    setIsPasswordVisible={setShowConfirmPassword}
                                    registerOptions={register(
                                        "password2",
                                        confirmPasswordInputRules(watch, "password2")
                                    )}
                                />
                            </Box>
                        </Box>

                        {registerError && (
                            <Box display="flex" justifyContent="center" m="10px 0">
                                <Typography as="p" textAlight="center" color={COLORS.ALERT_1}>
                                    {registerError}
                                </Typography>
                            </Box>
                        )}

                        <Box display="flex" justifyContent="center">
                            <Button type="submit" disabled={!isValid || isLoading} width="204px" mt="6px"
                                primary>
                                Зареєструватись
                            </Button>
                        </Box>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default RegisterPage;