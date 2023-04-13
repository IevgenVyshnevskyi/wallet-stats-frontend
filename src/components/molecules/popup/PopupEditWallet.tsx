import { useState } from "react";

import { useForm } from "react-hook-form";

import { ALERT_1, ALMOST_BLACK_FOR_TEXT, DIVIDER } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from '../../atoms/button/Button.styled';
import { Input } from "../../atoms/input/Input.styled";
import { Label } from "../../atoms/label/Label.styled";
import CrossIcon from './../../../shared/assets/icons/cross.svg';
import { PopupWrapper } from "./Popup.styled";
import React, { useContext, useEffect } from "react";
import { PopupContext } from "../../../contexts/PopupContext";
import { Typography } from '../../atoms/typography/Typography.styled';
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { Form } from "../../atoms/form/Form.styled";
import { moneyAmountRegex } from "../../../shared/utils/regexes";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { IWallet, WalletPopupActionsFormData } from "../../../store/types";
import { resetError, setActiveWallet, setSuccessStatus, walletAction } from "../../../store/walletSlice";
import { userId } from "../../../api/api";
import { ActiveElementContext } from "../../../contexts/ActiveElementContext";
// import { ActiveElementContext } from "../../../contexts/ActiveElementContext";

const PopupEditWallet: React.FC = () => {
    const dispatch = useAppDispatch()

    const { setIsEditWalletPopupOpen } = useContext(PopupContext);
    // const { activeWallet } = useContext(ActiveElementContext);

    const {
        error,
        isEditWalletSuccess,
        isDeleteWalletSuccess,
        activeWallet,
    } = useAppSelector(state => state.wallet);
    // const { editWalletError, isEditWalletSuccess } = useAppSelector(state => state.wallet);

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "all",
    });

    const handleCloseClick = () => {
        dispatch(setActiveWallet(null));
        resetError();
        setIsEditWalletPopupOpen(false);
        dispatch(setSuccessStatus(false));
    };

    useEffect(() => {
        if (isEditWalletSuccess || isDeleteWalletSuccess) {
            handleCloseClick()
        }
    }, [isEditWalletSuccess, isDeleteWalletSuccess]);

    const handleDeleteWallet = () => {
        dispatch(setSuccessStatus(false));
        dispatch(walletAction({ method: "DELETE", id: String(activeWallet.id) }));
    };

    function handleSub(data: WalletPopupActionsFormData) {
        const wallet: IWallet = {
            title: data.name,
            amount: data.amount,
            type_of_account: activeWallet.type_of_account,
            owner: userId,
        }

        console.log('edit wallet popup data', wallet)

        dispatch(walletAction({ data: wallet, method: "PUT", id: String(activeWallet.id) }))
    }

    return (
        <PopupWrapper>
            <Box>
                <Box>
                    <Typography as="h2" fw="500" fz="22px" mb="25px">
                        Редагування рахунку
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)}>
                        <Box mb="25px">
                            <Box>
                                <Label htmlFor="name" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Назва карткового рахунку</Label>
                                <Input {...register('name', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    minLength: {
                                        value: 2,
                                        message: "Назва повинна бути не менше 2 символів",
                                    }
                                })}
                                    type="text" id="name" width="284px"
                                    defaultValue={activeWallet?.title}

                                />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    m="6px 0 10px 0">{errors?.name && <>{errors?.name?.message || 'Error!'}</>}</Box>
                            </Box>
                            <Box mb="30px">
                                <Label htmlFor="amount" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Сума коштів на рахунку</Label>
                                <Input {...register('amount', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    pattern: {
                                        value: moneyAmountRegex,
                                        message: "Сума може бути від 1 до 8 цифр перед крапкою та до 2 цифр після крапки",
                                    }
                                })} id="amount" type="number" step="0.01" width="290px"
                                    style={{ paddingRight: '10px' }}
                                    defaultValue={activeWallet?.amount}
                                />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    m="6px 0 10px 0">{errors?.amount && <>{errors?.amount?.message
                                        || 'Введіть додаткове значення'}</>}</Box>
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            width="320px"
                            justifyContent="space-between"
                            borderTop={`2px solid ${DIVIDER}`}
                            pt="25px"
                            mb="25px"
                        >
                            <Button type="submit" width="148px" primary disabled={!isValid}>
                                Зберегти
                            </Button>
                            <Button type="reset" width="148px" secondary onClick={handleCloseClick}>
                                Скасувати
                            </Button>
                        </Box>
                    </Form>

                    {error && <Typography as="p" color={ALERT_1}>{error}</Typography>}

                    {activeWallet?.type_of_account === "bank" && (
                        <Box display="flex" justifyContent="flex-end" onClick={handleDeleteWallet}>
                            <ButtonLink>Видалити рахунок</ButtonLink>
                        </Box>
                    )}

                </Box>
                <Button secondary onClick={handleCloseClick} p="10px 20px">
                    <CrossIcon />
                </Button>
            </Box>
        </PopupWrapper>
    );
}

export default PopupEditWallet;