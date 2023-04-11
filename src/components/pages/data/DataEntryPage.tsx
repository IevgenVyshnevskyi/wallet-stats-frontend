import React, { useEffect, useState } from "react";
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
    ALMOST_BLACK_FOR_TEXT,
    GRADIENT, GREY_50,
    WHITE
} from "../../../shared/styles/variables";

import { DataEntryFormData, IUser } from "../../../store/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useNavigate } from "react-router-dom";
import { postEntryData } from "../../../store/walletSlice";
import { getUserDetails } from "../../../store/userSlice";

const DataEntryPage: React.FC = () => {
    const dispatch = useAppDispatch()

    const { isEntryDataSuccess, entryDataError } = useAppSelector(state => state.wallet)
    const { getDetailsError } = useAppSelector(state => state.user)

    const userData: IUser = JSON.parse(localStorage.getItem('userData'));
    const userId = userData?.id;

    const navigate = useNavigate();

    // const [cashWallet, setCashWallet] = useState<IWallet>({
    //     title: "Готівка",
    //     amount: null,
    //     owner: null,
    //     type_of_account: "cash",
    // });
    // const [bankWallet, setBankWallet] = useState<IWallet>({
    //     title: null,
    //     amount: null,
    //     owner: null,
    //     type_of_account: "bank",
    // });

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur",
        criteriaMode: "all"
    });

    useEffect(() => {
        if (isEntryDataSuccess) {
            reset();
            navigate('/home');
        }
    }, [isEntryDataSuccess]);

    useEffect(() => {
        if (!localStorage.getItem('userData')) {
            dispatch(getUserDetails())
        }
    }, []);

    const moneyAmountRegex = /^-?\d{1,8}(?:\.\d{0,2})?$/;

    function handleSub(data: DataEntryFormData) {
        const resultData: DataEntryFormData = { ...data, userId }

        dispatch(postEntryData(resultData))
    }

    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
            </Box>
            <Box display="flex" flexDirection="column" width="592px" alignItems="center" textAlign="center"
                background={WHITE}>
                <Box m="46px 0 46.5px 0">
                    <Img src={logo} alt="Logo" />
                    <Typography fw="700" fz="24px" lh="170%" color={ALMOST_BLACK_FOR_TEXT} textAlign="center"
                        m="48px 0 48px 0">
                        Дякуємо за реєстрацію!
                    </Typography>
                    <Typography fw="400" fz="16px" lh="24px" m="0 0 26.5px 0" color={ALMOST_BLACK_FOR_TEXT}
                        textAlign="center">
                        Ви можете внести актуальні дані по <br /> вашому готівковому та картковому <br /> рахунках.
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
                        alignItems="end">
                        <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
                            <Box mb="6px">
                                <Label htmlFor="availableCash" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Введіть суму наявної готівки</Label>
                                <Input {...register('availableCash', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    // min: 0.01,
                                    pattern: {
                                        value: moneyAmountRegex,
                                        message: "Сума може бути від 1 до 8 цифр перед крапкою та до 2 цифр після крапки",
                                    }
                                })} id="availableCash" type="number" step="0.01" width="290px"
                                    style={{ paddingRight: '10px' }} />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    m="6px 0 34px 0">{errors?.availableCash && <>{errors?.availableCash?.message || 'Error!'}</>}</Box>
                                <Label htmlFor="cardAccountName" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Введіть назву карткового рахунку</Label>
                                <Input {...register('cardAccountName', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    minLength: {
                                        value: 2,
                                        message: "Назва повинна бути не менше 2 символів",
                                    },
                                })} type="text" id="cardAccountName" width="284px" />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    m="6px 0 10px 0">{errors?.cardAccountName && <>{errors?.cardAccountName?.message || 'Error!'}</>}</Box>
                                <Label htmlFor="amountAccount" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Введіть суму коштів на рахунку</Label>
                                <Input {...register('amountAccount', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    // min: 0.01,
                                    pattern: {
                                        value: moneyAmountRegex,
                                        message: "Сума може бути від 1 до 8 цифр перед крапкою та до 2 цифр після крапки",
                                    }
                                })} id="amountAccount" type="number" step="0.01" width="290px"
                                    style={{ paddingRight: '10px' }} />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    m="6px 0 40px 0">{errors?.amountAccount && <>{errors?.amountAccount?.message || 'Error!'}</>}</Box>
                            </Box>
                            <Box textAlight="start" fz="14px" lh="150%" color={GREY_50}>Додаткові карткові рахунки ви
                                зможете <br /> внести пізніше.</Box>
                        </Box>

                        {getDetailsError && <Typography as="p" textAlight="center">{getDetailsError}</Typography>}

                        {entryDataError && <Typography as="p" textAlight="center">{entryDataError}</Typography>}

                        <Button type="submit" disabled={!isValid} width="177px" m="48px auto 8px"
                            primary>Зберегти дані</Button>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default DataEntryPage;