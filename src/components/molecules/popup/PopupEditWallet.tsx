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
import { moneyAmountRegex, titleRegex } from "../../../shared/utils/regexes";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { IWallet, WalletFormData } from "../../../store/types";
import { resetError, setActiveWallet, setSuccessStatus, walletAction } from "../../../store/walletSlice";
import { userId } from "../../../api/api";

const PopupEditWallet: React.FC = () => {
    const dispatch = useAppDispatch()

    const { setIsEditWalletPopupOpen } = useContext(PopupContext);

    const {
        error,
        isEditWalletSuccess,
        isDeleteWalletSuccess,
        activeWallet,
        isLoading
    } = useAppSelector(state => state.wallet);

    const { user } = useAppSelector(state => state.user);

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
        setIsEditWalletPopupOpen(false);
        dispatch(setActiveWallet(null));
        dispatch(resetError());
        dispatch(setSuccessStatus(false));
    };

    useEffect(() => {
        if (isEditWalletSuccess || isDeleteWalletSuccess) {
            handleCloseClick()
        }
    }, [isEditWalletSuccess, isDeleteWalletSuccess]);

    const handleDeleteWallet = () => {
        dispatch(setSuccessStatus(false));
        dispatch(walletAction({
            method: "DELETE",
            id: String(activeWallet?.id)
        }));
    };

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                handleCloseClick()
            }
        }
        window.addEventListener('keydown', handleKeyPress)
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    function handleSub(data: WalletFormData) {
        const wallet: IWallet = {
            title: data.title,
            amount: data.amount,
            type_of_account: activeWallet.type_of_account,
            owner: user?.id || userId,
        }

        dispatch(walletAction({
            data: wallet,
            method: "PUT",
            id: String(activeWallet?.id)
        }))
    }

    return (
        <PopupWrapper onClick={handleCloseClick}>
            <Box onClick={event => event.stopPropagation()}>
                <Box>
                    <Typography as="h2" fw="500" fz="22px" mb="25px">
                        Редагування рахунку
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)}>
                        <Box mb="25px">
                            <Box>
                                <Label htmlFor="title" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Назва рахунку</Label>
                                <Input {...register('title', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    pattern: {
                                        value: titleRegex,
                                        message: "Назва повинна бути не менше 2 літер",
                                    },
                                })}
                                    type="text" id="title" width="284px"
                                    className={errors.title && 'error'}
                                    defaultValue={activeWallet?.title}

                                />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    m="6px 0 10px 0">{errors?.title && <>{errors?.title?.message || 'Error!'}</>}</Box>
                            </Box>
                            <Box mb="30px">
                                <Label htmlFor="amount" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                    textAlight="left">Сума коштів на рахунку</Label>
                                <Input {...register('amount', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    pattern: {
                                        value: moneyAmountRegex,
                                        message: 'Сума може бути від 1 до 8 цифр перед крапкою та до 2 цифр після крапки',
                                    },
                                    min: {
                                        value: 0.00,
                                        message: 'Сума може бути додатньою від 1 до 8 цифр перед крапкою та до 2 цифр після крапки' /*'Мінімальне значення суми повинно бути не менше 0.01'*/
                                    },
                                })} id="amount" type="text" step="0.01" width="284px" pr="10px"
                                    className={errors.amount && 'error'}
                                    defaultValue={activeWallet?.amount}
                                />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px" width="320px"
                                    m="6px 0 10px 0">{errors?.amount && <>{errors?.amount?.message
                                        || 'Введіть додаткове значення'}</>}</Box>
                            </Box>
                        </Box>
                        {error && <Typography as="p" color={ALERT_1}>{error}</Typography>}

                        <Box
                            display="flex"
                            width="320px"
                            justifyContent="space-between"
                            borderTop={`2px solid ${DIVIDER}`}
                            pt="25px"
                            mb={activeWallet?.type_of_account === "bank" && "25px"}
                        >
                            <Button type="submit" width="148px" primary disabled={!isValid || isLoading}>
                                Зберегти
                            </Button>
                            <Button type="reset" width="148px" secondary onClick={handleCloseClick}>
                                Скасувати
                            </Button>
                        </Box>
                    </Form>

                    {activeWallet?.type_of_account === "bank" && (
                        <Box display="flex" justifyContent="flex-end" onClick={handleDeleteWallet}>
                            <ButtonLink disabled={isLoading}>Видалити рахунок</ButtonLink>
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