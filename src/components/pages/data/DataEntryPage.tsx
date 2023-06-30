import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { postEntryData } from "../../../store/walletSlice";
import { getUserDetails } from "../../../store/userSlice";

import { amountFieldRules } from "../../../shared/utils/field-rules/amount";
import { titleFieldRules } from "../../../shared/utils/field-rules/title";

import { localStorageIsDataEntrySuccess, token, userId } from "../../../api/api";

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

import { DataEntryFormData } from "../../../store/types";

const DataEntryPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    const {
        isEntryDataSuccess,
        entryDataError,
        isLoading
    } = useAppSelector(state => state.wallet)

    const {
        user,
        getDetailsError,
        isRegistered
    } = useAppSelector(state => state.user)

    if (!isRegistered && localStorageIsDataEntrySuccess) {
        navigate("/home")
    }

    const handleSub = (data: DataEntryFormData) => {
        const resultData: DataEntryFormData = {
            ...data,
            userId: user?.id || userId,
        }

        dispatch(postEntryData(resultData))
    }

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({ mode: "all" });

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

    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={COLORS.GRADIENT}>
                <Img src={InterfaceImage} m="0 auto" alt="InterfaceImage" />
            </Box>
            <Box display="flex" flexDirection="column" width="592px" alignItems="center" textAlign="center" background={COLORS.WHITE}>
                <Box m="auto 0">
                    <Img src={logo} alt="Logo" />
                    <Typography fw="700" fz="24px" lh="170%" color={COLORS.ALMOST_BLACK_FOR_TEXT} textAlign="center" m="20px 0">
                        Дякуємо за реєстрацію!
                    </Typography>
                    <Typography fw="400" fz="16px" lh="24px" m="0 0 20px 0" color={COLORS.ALMOST_BLACK_FOR_TEXT}
                        textAlign="center">
                        Ви можете внести актуальні дані по <br /> вашому готівковому та картковому <br /> рахунках.
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
                        alignItems="end">
                        <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
                            <Box mb="6px">
                                <BaseField
                                    fieldType="text"
                                    label="Введіть суму наявної готівки"
                                    errors={errors}
                                    name="availableCash"
                                    registerOptions={register('availableCash', amountFieldRules)}
                                />
                                <BaseField
                                    fieldType="text"
                                    label="Введіть назву карткового рахунку"
                                    errors={errors}
                                    name="cardAccountName"
                                    registerOptions={register('cardAccountName', titleFieldRules)}
                                />
                                <BaseField
                                    fieldType="text"
                                    label="Введіть суму наявної готівки"
                                    errors={errors}
                                    name="amountAccount"
                                    registerOptions={register('amountAccount', amountFieldRules)}
                                />
                            </Box>
                            <Box textAlight="start" fz="14px" lh="150%" color={COLORS.GREY_50}>
                                Додаткові карткові рахунки ви зможете <br /> внести пізніше.
                            </Box>
                        </Box>

                        {getDetailsError &&
                            <Typography as="p" textAlight="center">{JSON.stringify(getDetailsError)}</Typography>}

                        {entryDataError &&
                            <Typography as="p" textAlight="center">{JSON.stringify(entryDataError)}</Typography>}

                        <Button type="submit" disabled={!isValid || isLoading} width="177px" m="18px auto 8px"
                            primary>
                            Зберегти дані
                        </Button>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default DataEntryPage;