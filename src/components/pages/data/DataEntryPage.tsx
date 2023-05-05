import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Box } from '../../atoms/box/Box.styled';
import { Typography } from '../../atoms/typography/Typography.styled';
import { Img } from '../../atoms/img/Img.styled';
import { Container } from "../../atoms/container/Container.styled";
import { Form } from "../../atoms/form/Form.styled";
import { Label } from "../../atoms/label/Label.styled";
import { Input } from "../../atoms/input/Input.styled";
import { Button } from "../../atoms/button/Button.styled";

import logo from "../../../shared/assets/images/logo.png";
import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";

import {
    ALERT_1, ALERT_2,
    ALMOST_BLACK_FOR_TEXT,
    GRADIENT,
    GREY_50,
    WHITE
} from "../../../shared/styles/variables";

import { DataEntryFormData } from "../../../store/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { postEntryData } from "../../../store/walletSlice";
import { getUserDetails } from "../../../store/userSlice";
import { moneyAmountRegex, titleRegex, twoSymbolsRegex } from "../../../shared/utils/regexes";
import { localStorageIsDataEntrySuccess, token, userId } from "../../../api/api";

const DataEntryPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const { isEntryDataSuccess, entryDataError, isLoading } = useAppSelector(state => state.wallet)
    const { user, getDetailsError, isRegistered } = useAppSelector(state => state.user)

    if (!isRegistered && localStorageIsDataEntrySuccess) {
        navigate("/home")
    }

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: "all",
    });

    useEffect(() => {
        if (isEntryDataSuccess) {
            reset();
            navigate('/home');
        }
    }, []);

    useEffect(() => {
        if (isEntryDataSuccess) {
            reset();
            navigate('/home');
        }
    }, [isEntryDataSuccess]);

    useEffect(() => {
        if (user?.token !== "" || token) {
            dispatch(getUserDetails())
        }
    }, [user?.token]);

    function handleSub(data: DataEntryFormData) {
        const resultData: DataEntryFormData = {
            ...data,
            userId: user?.id || userId,
        }

        dispatch(postEntryData(resultData))
    }

    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
                <Img src={InterfaceImage} m="0 auto" alt="InterfaceImage" />
            </Box>
            <Box display="flex" flexDirection="column" width="592px" alignItems="center" textAlign="center"background={WHITE}>
                <Box m="auto 0">
                    <Img src={logo} alt="Logo" />
                    <Typography fw="700" fz="24px" lh="170%" color={ALMOST_BLACK_FOR_TEXT} textAlign="center" m="20px 0">
                        Дякуємо за реєстрацію!
                    </Typography>
                    <Typography fw="400" fz="16px" lh="24px" m="0 0 20px 0" color={ALMOST_BLACK_FOR_TEXT}
                        textAlign="center">
                        Ви можете внести актуальні дані по <br /> вашому готівковому та картковому <br /> рахунках.
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
                        alignItems="end">
                        <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
                            <Box mb="6px">
                                <Label htmlFor="availableCash" lh="16px" color={ALMOST_BLACK_FOR_TEXT}
                                    textAlight="left">Введіть суму наявної готівки</Label>
                                <Input {...register('availableCash', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    pattern: {
                                        value: moneyAmountRegex,
                                        message: 'Сума може бути від 1 до 8 цифр перед крапкою та до 2 цифр після крапки',
                                    },
                                    min: {
                                        value: 0.00,
                                        message: 'Сума може бути додатньою від 1 до 8 цифр перед крапкою та до 2 цифр після крапки',
                                    },
                                })} id="availableCash" type="text" step="0.01" width="290px"
                                    style={{ paddingRight: '10px', }}
                                    className={errors.availableCash && 'error'}
                                />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    m="0 0 20px 0">{errors?.availableCash && <>{errors?.availableCash?.message
                                        || 'Введіть додаткове значення'}</>}</Box>
                                <Label htmlFor="cardAccountName" lh="16px" color={ALMOST_BLACK_FOR_TEXT}
                                    textAlight="left">Введіть назву карткового рахунку</Label>
                                <Input {...register('cardAccountName', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    validate: {
                                        hasTwoSymbols: (value) => twoSymbolsRegex.test(value) || 'Повинно бути не менше 2 символів',
                                        hasTwoLetters: (value) => titleRegex.test(value) || 'Повинно бути не менше 2 літер',
                                    }
                                })}
                                    type="text" id="cardAccountName" width="284px"
                                    className={errors.cardAccountName && 'error'}
                                />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    m="0 0 20px 0">{errors?.cardAccountName && <>{errors?.cardAccountName?.message
                                        || 'Error!'}</>}</Box>
                                <Label htmlFor="amountAccount" lh="16px" color={ALMOST_BLACK_FOR_TEXT}
                                    textAlight="left">Введіть суму коштів на рахунку</Label>
                                <Input {...register('amountAccount', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    pattern: {
                                        value: moneyAmountRegex,
                                        message: 'Сума може бути від 1 до 8 цифр перед крапкою та до 2 цифр після крапки',
                                    },
                                    min: {
                                        value: 0.00,
                                        message: 'Сума може бути додатньою від 1 до 8 цифр перед крапкою та до 2 цифр після крапки',
                                    },
                                })} id="amountAccount" type="text" step="0.01" width="290px"
                                    style={{ paddingRight: '10px', }}
                                    className={errors.amountAccount && 'error'}
                                />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    m="0 0 20px 0">{errors?.amountAccount && <>{errors?.amountAccount?.message
                                        || 'Введіть додаткове значення'}</>}</Box>
                            </Box>
                            <Box textAlight="start" fz="14px" lh="150%" color={GREY_50}>Додаткові карткові рахунки ви
                                зможете <br /> внести пізніше.</Box>
                        </Box>

                        {getDetailsError &&
                            <Typography as="p" textAlight="center">{JSON.stringify(getDetailsError)}</Typography>}

                        {entryDataError &&
                            <Typography as="p" textAlight="center">{JSON.stringify(entryDataError)}</Typography>}

                        <Button type="submit" disabled={!isValid || isLoading} width="177px" m="18px auto 8px"
                            primary>Зберегти дані</Button>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default DataEntryPage;