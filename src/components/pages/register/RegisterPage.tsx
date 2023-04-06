import React, { useState } from "react";
import { useForm } from "react-hook-form";

import { Box } from '../../atoms/box/Box.styled';
import { Typography } from '../../atoms/typography/Typography.styled';
import { Img } from '../../atoms/img/Img.styled';
import { Container } from "../../atoms/container/Container.styled";
import { Form } from "../../atoms/form/Form.styled";
import { Label } from "../../atoms/label/Label.styled";
import { Input } from "../../atoms/input/Input.styled";
import { Button } from "../../atoms/button/Button.styled";

import logo from "../../../shared/assets/icons/logo.png";
import InterfaceImage from "../../../shared/assets/icons/interface-image-full.png";

import {
    ALMOST_BLACK_FOR_TEXT,
    GRADIENT,
    WHITE
} from "../../../shared/styles/variables";

import VisibilityOn from '../../../shared/assets/icons/visibility-on.svg';
import VisibilityOff from '../../../shared/assets/icons/visibility-off.svg';
import { RegisterFormData } from "../../../store/types";
import { useAppDispatch } from "../../../store/hooks";
import { registerUser } from '../../../store/userSlice';

const RegisterPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
        watch,
    } = useForm({
        mode: "onBlur",
    });
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    function handleSub(data: RegisterFormData) {
        console.log(data);
        dispatch(registerUser(data));
        //alert(JSON.stringify(data));
        reset();
    }

    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
            </Box>
            <Box display="flex" flexDirection="column" width="592px" alignItems="center" textAlign="center"
                background={WHITE}>
                <Box m="92.5px 0 76.5px 0">
                    <Img src={logo} alt="Logo" />
                    <Typography fw="700" fz="24px" lh="170%" color={ALMOST_BLACK_FOR_TEXT} textAlign="center"
                        m="48px 0 48px 0">
                        Реєстрація нового користувача
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
                        alignItems="end">
                        <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
                            <Box mb="6px">
                                <Label htmlFor="firstName" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Ім'я</Label>
                                <Input {...register('first_name', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    minLength: {
                                        value: 2,
                                        message: "Повинно бути не менше 2 символів",
                                    }
                                })} type="text" id="firstName" />
                                <div style={{
                                    color: 'red',
                                    textAlign: 'left',
                                    border: 'red',
                                    fontSize: '13px',
                                    height: '14px',
                                    margin: "6px 0 14px 0"
                                }}>{errors?.firstName && <>{errors?.firstName?.message || 'Error!'}</>}
                                </div>
                                <Label htmlFor="lastName" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Прізвище</Label>
                                <Input {...register('last_name', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    minLength: {
                                        value: 2,
                                        message: "Повинно бути не менше 2 символів",
                                    }
                                })} type="text" id="lastName" />
                                <div style={{
                                    color: 'red',
                                    textAlign: 'left',
                                    border: 'red',
                                    fontSize: '13px',
                                    height: '14px',
                                    margin: "6px 0 14px 0"
                                }}>{errors?.lastName && <>{errors?.lastName?.message || 'Error!'}</>}
                                </div>
                                <Label htmlFor="email" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Пошта</Label>
                                <Input {...register('email', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    pattern: {
                                        value: /\S+@\S+.\S+/,
                                        message: "Введіть коректну електронну адресу"
                                    }
                                })} type="email" id="email" />
                                <div style={{
                                    color: 'red',
                                    textAlign: 'left',
                                    border: 'red',
                                    fontSize: '13px',
                                    height: '14px',
                                    margin: "6px 0 14px 0"
                                }}>{errors?.email && <>{errors?.email?.message || 'Error!'}</>}</div>
                                <Label htmlFor="password" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Пароль</Label>
                                <Box position="relative">
                                    <span onClick={handleTogglePassword} style={{
                                        position: "absolute", top: "16px",
                                        right: "-30px", cursor: "pointer", zIndex: "1"
                                    }}>{showPassword ?
                                        <VisibilityOff />
                                        :
                                        <VisibilityOn />
                                        }</span>
                                    <Input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        {...register("password", {
                                            required: 'Обов\'язкове поле для заповнення',
                                        })} />
                                </Box>
                                <div style={{
                                    color: 'red',
                                    textAlign: 'left',
                                    border: 'red',
                                    fontSize: '13px',
                                    height: '14px',
                                    margin: "6px 0 14px 0"
                                }}>{errors?.password && <>{errors?.password?.message || 'Error!'}</>}</div>
                                <Label htmlFor="confirmPassword" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mt="16px"
                                    mb="6px" textAlight="left">Повторити пароль</Label>
                                <Box position="relative">
                                    <span onClick={handleToggleConfirmPassword} style={{
                                        position: "absolute", top: "16px",
                                        right: "-30px", cursor: "pointer", zIndex: "1"
                                    }}>{showConfirmPassword ?
                                        <VisibilityOff />
                                        :
                                        <VisibilityOn />
                                        }</span>
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        {...register("password2", {
                                            required: true,
                                            validate: (val: string) => {
                                                if (watch('password') != val) {
                                                    return "Паролі не співпадають";
                                                }
                                            }
                                        })} />
                                </Box>
                                <div style={{
                                    color: 'red',
                                    textAlign: 'left',
                                    border: 'red',
                                    fontSize: '13px',
                                    height: '14px',
                                    margin: "6px 0 14px 0"
                                }}>{errors?.confirmPassword && <>{errors?.confirmPassword?.message || 'Error!'}</>}</div>
                            </Box>
                        </Box>
                        <Button type="submit" disabled={!isValid} width="204px" mt="56px"
                            primary>Зареєструватись</Button>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default RegisterPage;