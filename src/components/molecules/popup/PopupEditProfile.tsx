import {ALMOST_BLACK_FOR_TEXT, DIVIDER} from "../../../shared/styles/variables";
import {Box} from "../../atoms/box/Box.styled";
import {Button} from '../../atoms/button/Button.styled';
import {Input} from "../../atoms/input/Input.styled";
import {Label} from "../../atoms/label/Label.styled";
import CrossIcon from './../../../shared/assets/icons/cross.svg';
import {PopupWrapper} from "./Popup.styled";
import React, {useContext, useState} from "react";
import {PopupContext} from "../../../contexts/PopupContext";
import {Typography} from '../../atoms/typography/Typography.styled';
import {ButtonLink} from "../../atoms/button/ButtonLink";
import {useForm} from "react-hook-form";
import {Form} from "../../atoms/form/Form.styled";
import VisibilityOff from "../../../shared/assets/icons/visibility-off.svg";
import VisibilityOn from "../../../shared/assets/icons/visibility-on.svg";

const PopupEditProfile: React.FC = () => {
    const {setIsEditProfilePopupOpen} = useContext(PopupContext);
    const [showOldPassword, setShowOldPassword] = useState(false);
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
    const handleToggleOldPassword = () => {
        setShowOldPassword(!showOldPassword);
    };
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };
    const handleCloseClick = () => {
        setIsEditProfilePopupOpen(false);
    };

    function handleSub(data: {}) {
        console.log(data);
        //alert(JSON.stringify(data));
        reset();
        handleCloseClick();
    }

    return (
        <PopupWrapper zIndex="5">
            <Box>
                <Box>
                    <Typography as="h2" fw="500" fz="22px" mb="25px">
                        Налаштування профілю
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)}>
                        <Box display="flex" mb="25px">
                            <Box pr="38px" borderRight={`2px solid ${DIVIDER}`}>
                                <Typography fw="500" fz="16px" lh="19px" m="0 0 16px 0" color={ALMOST_BLACK_FOR_TEXT}
                                            textAlign="left">
                                    Дані користувача
                                </Typography>
                                <Box mb="10px" mr="30px">
                                    <Label htmlFor="firstName" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT}
                                           mb="6px"
                                           textAlight="left">Ім'я</Label>
                                    <Input {...register('firstName', {
                                        required: 'Обов\'язкове поле для заповнення',
                                        minLength: {
                                            value: 2,
                                            message: "Повинно бути не менше 2 символів",
                                        }
                                    })} type="text" id="firstName"/>
                                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                         m="6px 0 14px 0">{errors?.firstName && <>{errors?.firstName?.message || 'Error!'}</>}</Box>
                                </Box>
                                <Box mb="10px" mr="30px">
                                    <Label htmlFor="lastName" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                           textAlight="left">Прізвище</Label>
                                    <Input {...register('lastName', {
                                        required: 'Обов\'язкове поле для заповнення',
                                        minLength: {
                                            value: 2,
                                            message: "Повинно бути не менше 2 символів",
                                        }
                                    })} type="text" id="lastName"/>
                                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                         m="6px 0 14px 0">{errors?.lastName && <>{errors?.lastName?.message || 'Error!'}</>}</Box>
                                </Box>
                                <Box mb="10px" mr="30px">
                                    <Label htmlFor="email" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                           textAlight="left">Пошта</Label>
                                    <Input {...register('email', {
                                        required: 'Обов\'язкове поле для заповнення',
                                        pattern: {
                                            value: /\S+@\S+.\S+/,
                                            message: "Введіть коректну електронну адресу"
                                        }
                                    })} type="email" id="email"/>
                                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                         m="6px 0 14px 0">{errors?.email && <>{errors?.email?.message || 'Error!'}</>}</Box>
                                </Box>
                            </Box>
                            <Box pl="32px">
                                <Typography fw="500" fz="16px" lh="19px" m="0 0 16px 0" color={ALMOST_BLACK_FOR_TEXT}
                                            textAlign="left">
                                    Змінити пароль
                                </Typography>
                                <Box mb="10px" mr="30px">
                                    <Label htmlFor="oldPassword" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT}
                                           mb="6px"
                                           textAlight="left">Старий пароль</Label>
                                    <Box position="relative">
                                    <span onClick={handleToggleOldPassword} style={{
                                        position: "absolute", top: "16px",
                                        right: "-30px", cursor: "pointer", zIndex: "1"
                                    }}>{showOldPassword ?
                                        <VisibilityOff/>
                                        :
                                        <VisibilityOn/>
                                    }</span>
                                        <Input
                                            type={showOldPassword ? "text" : "password"}
                                            id="oldPassword"
                                            name="oldPassword"
                                            {...register("oldPassword", {
                                                required: 'Обов\'язкове поле для заповнення',
                                            })} />
                                    </Box>
                                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                         m="6px 0 14px 0">{errors?.oldPassword && <>{errors?.oldPassword?.message || 'Error!'}</>}</Box>
                                </Box>
                                <Box mb="10px" mr="30px">
                                    <Label htmlFor="password" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                           textAlight="left">Новий пароль</Label>
                                    <Box position="relative">
                                    <span onClick={handleTogglePassword} style={{
                                        position: "absolute", top: "16px",
                                        right: "-30px", cursor: "pointer", zIndex: "1"
                                    }}>{showPassword ?
                                        <VisibilityOff/>
                                        :
                                        <VisibilityOn/>
                                    }</span>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            name="password"
                                            {...register("password", {
                                                required: 'Обов\'язкове поле для заповнення',
                                            })} />
                                    </Box>
                                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                         m="6px 0 14px 0">{errors?.password && <>{errors?.password?.message || 'Error!'}</>}</Box>
                                </Box>
                                <Box mb="10px" mr="30px">
                                    <Label htmlFor="confirmPassword" fz="13px" lh="16px" color={ALMOST_BLACK_FOR_TEXT}
                                           mt="16px"
                                           mb="6px" textAlight="left">Повторити пароль</Label>
                                    <Box position="relative">
                                    <span onClick={handleToggleConfirmPassword} style={{
                                        position: "absolute", top: "16px",
                                        right: "-30px", cursor: "pointer", zIndex: "1"
                                    }}>{showConfirmPassword ?
                                        <VisibilityOff/>
                                        :
                                        <VisibilityOn/>
                                    }</span>
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            {...register("confirmPassword", {
                                                required: true,
                                                validate: (val: string) => {
                                                    if (watch('password') != val) {
                                                        return "Паролі не співпадають";
                                                    }
                                                }
                                            })}/>
                                    </Box>
                                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                         m="6px 0 14px 0">{errors?.confirmPassword && <>{errors?.confirmPassword?.message || 'Обов\'язкове поле для заповнення'}</>}</Box>
                                </Box>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="center"
                            gap="35px"
                            borderTop={`2px solid ${DIVIDER}`}
                            pt="24px"
                            mb="24px"
                        >
                            <Button type="submit" disabled={!isValid} primary width="100%">
                                Зберегти
                            </Button>
                            <Button type="reset" secondary width="100%" onClick={handleCloseClick}>
                                Скасувати
                            </Button>
                        </Box>
                    </Form>
                    <Box display="flex" justifyContent="flex-end">
                        <ButtonLink>Видалити аккаунт</ButtonLink>
                    </Box>
                </Box>
                <Button secondary onClick={handleCloseClick} p="10px 20px">
                    <CrossIcon/>
                </Button>
            </Box>
        </PopupWrapper>
    );
}

export default PopupEditProfile;