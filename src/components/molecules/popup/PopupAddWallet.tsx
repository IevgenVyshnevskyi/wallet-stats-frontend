import { useRef, useState } from "react";

import { useForm } from "react-hook-form";

import {
    ALERT_1,
    ALMOST_BLACK_FOR_TEXT,
    DIVIDER,
    PRIMARY_HOVER,
    SUCCESS
} from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from '../../atoms/button/Button.styled';
import { Input } from "../../atoms/input/Input.styled";
import { Label } from "../../atoms/label/Label.styled";
import CrossIcon from './../../../shared/assets/icons/cross.svg';
import { PopupWrapper } from "./Popup.styled";
import React, { useContext, useEffect } from "react";
import { PopupContext } from "../../../contexts/PopupContext";
import { Typography } from '../../atoms/typography/Typography.styled';
import { ButtonPopup } from "../../atoms/button/ButtonPopup";
import { Form } from "../../atoms/form/Form.styled";
import { moneyAmountRegex, titleRegex, twoSymbolsRegex } from "../../../shared/utils/regexes";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { IBankData, IWallet, WalletFormData } from "../../../store/types";
import { resetError, setActiveWallet, setSuccessStatus, walletAction } from "../../../store/walletSlice";
import { userId } from "../../../api/api";
import { MessageProps } from "../../../../types/molecules";
import PackageSuccessIcon from "../../../shared/assets/icons/package-success.svg";
import PackageErrorIcon from "../../../shared/assets/icons/package-error.svg";
import { sendBankData, setBankDataSuccessStatus } from "../../../store/bankDataSlice";

const PopupAddWallet: React.FC = () => {
    const dispatch = useAppDispatch()

    const { setIsAddWalletPopupOpen } = useContext(PopupContext);

    const [isAddWalletManuallyOpen, setIsAddWalletManuallyOpen] = useState(true);

    const { isAddWalletSuccess } = useAppSelector(state => state.wallet);

    const handleCloseClick = () => {
        dispatch(setActiveWallet(null));
        dispatch(resetError());
        dispatch(setSuccessStatus(false));
        dispatch(setBankDataSuccessStatus(false));
        setIsAddWalletPopupOpen(false);
    };

    const handleOpenLeftPart = () => {
        setIsAddWalletManuallyOpen(true);
    };
    const handleOpenRightPart = () => {
        setIsAddWalletManuallyOpen(false);
    };

    useEffect(() => {
        if (isAddWalletSuccess) {
            handleCloseClick();
            dispatch(setSuccessStatus(false));
        }
    }, [isAddWalletSuccess]);

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

    return (
        <PopupWrapper onClick={handleCloseClick}>
            <Box onClick={event => event.stopPropagation()}>
                <Box>
                    <Typography as="h2" fw="600" fz="22px" mb="25px">
                        Додати картковий рахунок
                    </Typography>
                    <Box display="flex" width="100%" mb="24px">
                        <ButtonPopup onClick={handleOpenLeftPart}
                            style={{
                                fontWeight: isAddWalletManuallyOpen && "700",
                                borderBottom: isAddWalletManuallyOpen && `2px solid ${PRIMARY_HOVER}`
                            }}>Ввести дані вручну</ButtonPopup>
                        <ButtonPopup onClick={handleOpenRightPart}
                            style={{
                                fontWeight: !isAddWalletManuallyOpen && "700",
                                borderBottom: !isAddWalletManuallyOpen && `2px solid ${PRIMARY_HOVER}`
                            }}>Завантажити дані з файлу</ButtonPopup>
                    </Box>

                    {isAddWalletManuallyOpen ? (
                        <AddWalletTab />
                    ) : (
                        <AddBankDataTab />
                    )}
                </Box>
                <Button secondary onClick={handleCloseClick} p="10px 20px">
                    <CrossIcon />
                </Button>
            </Box>
        </PopupWrapper>
    );
}


const AddWalletTab: React.FC = () => {
    const dispatch = useAppDispatch()

    const { setIsAddWalletPopupOpen } = useContext(PopupContext);

    const {
        error,
        activeWallet,
        isAddWalletSuccess,
        isLoading
    } = useAppSelector(state => state.wallet);

    const { user } = useAppSelector(state => state.user);

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm({
        mode: "all",
    });

    const handleCloseClick = () => {
        reset();
        dispatch(setActiveWallet(null));
        dispatch(resetError());
        dispatch(setSuccessStatus(false));
        dispatch(setBankDataSuccessStatus(false));
        setIsAddWalletPopupOpen(false);
    };

    useEffect(() => {
        if (isAddWalletSuccess) {
            handleCloseClick();
        }
    }, [isAddWalletSuccess]);

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

    function handleSubmitWallet(data: WalletFormData) {
        const wallet: IWallet = {
            title: data.title,
            amount: data.amount,
            type_of_account: "bank",
            owner: user?.id || userId,
        }

        dispatch(walletAction({
            data: wallet,
            method: "POST",
        }))
    }

    return (
        <Form onSubmit={handleSubmit(handleSubmitWallet)}>
            <Box mb="25px">
                <Box>
                    <Label htmlFor="title" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                        textAlight="left">Введіть назву карткового рахунку</Label>
                    <Input {...register('title', {
                        required: 'Обов\'язкове поле для заповнення',
                        validate: {
                            hasTwoSymbols: (value) => twoSymbolsRegex.test(value) || 'Повинно бути не менше 2 символів',
                            hasTwoLetters: (value) => titleRegex.test(value) || 'Повинно бути не менше 2 літер',
                        }
                    })}
                        type="text" id="title" width="340px"
                        className={errors.title && 'error'}
                        defaultValue={activeWallet?.title}
                    />
                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                        m="6px 0 10px 0">{errors?.title && <>{errors?.title?.message || 'Error!'}</>}</Box>
                </Box>
                <Box mb="30px">
                    <Label htmlFor="amount" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT}
                        mb="6px"
                        textAlight="left">Введіть суму коштів на рахунку</Label>
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
                    })} id="amount" type="text" step="0.01" width="340px" pr="10px"
                        className={errors.amount && 'error'}
                        defaultValue={activeWallet?.amount}
                    />
                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                        width="320px"
                        m="6px 0 10px 0">{errors?.amount && <>{errors?.amount?.message
                            || 'Введіть додаткове значення'}</>}</Box>
                </Box>
            </Box>
            {error && <Typography as="p" color={ALERT_1}>{error}</Typography>}
            <Box
                display="flex"
                width="376px"
                justifyContent="space-between"
                borderTop={`2px solid ${DIVIDER}`}
                pt="51px"
                mb="25px"
            >
                <Button type="submit" width="176px" primary disabled={!isValid || isLoading}>
                    Зберегти
                </Button>
                <Button type="reset" width="176px" secondary onClick={handleCloseClick}>
                    Скасувати
                </Button>
            </Box>
        </Form>
    )
}

const AddBankDataTab: React.FC = () => {
    const dispatch = useAppDispatch()

    const { setIsAddWalletPopupOpen } = useContext(PopupContext);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const {
        error,
        activeWallet,
        isAddWalletSuccess,
        isLoading
    } = useAppSelector(state => state.wallet);

    const { isAddBankDataSuccess } = useAppSelector(state => state.bankData);

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset
    } = useForm({
        mode: "all",
    });

    const handleCloseClick = () => {
        reset();
        dispatch(setActiveWallet(null));
        dispatch(resetError());
        dispatch(setSuccessStatus(false));
        dispatch(setBankDataSuccessStatus(false));
        setIsAddWalletPopupOpen(false);
    };

    useEffect(() => {
        if (isAddBankDataSuccess) {
            handleCloseClick();
            dispatch(setBankDataSuccessStatus(false));
        }
    }, [isAddBankDataSuccess]);

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

    function handleSubmitBankData(data: IBankData) {
        // dispatch(sendBankData(data))
    }

    return (
        <Form onSubmit={handleSubmit(handleSubmitBankData)}>
            <Box mb="25px">
                <Box>
                    <Label htmlFor="wallettitle" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                        textAlight="left">Введіть назву карткового рахунку</Label>
                    <Input {...register('wallettitle', {
                        required: 'Обов\'язкове поле для заповнення',
                        pattern: {
                            value: titleRegex,
                            message: "Назва повинна бути не менше 2 літер",
                        },
                    })}
                        type="text" id="wallettitle" width="340px"
                        className={errors.wallettitle && 'error'}
                        defaultValue={activeWallet?.title}
                    />
                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                        m="6px 0 10px 0">{errors?.wallettitle && <>{errors?.wallettitle?.message || 'Error!'}</>}</Box>
                </Box>
                <Box>
                    <Button
                        primary
                        onClick={() => inputFileRef.current.click()}
                        width="376px"
                    >
                        Вибрати файл даних
                    </Button>

                    <Input height="100px"
                        type="file"
                        accept=".xls"
                        ref={inputFileRef}
                        style={{ display: "none" }}
                    />
                    <Box height="55px">
                        {error && <Message message="error" />}
                        {isAddWalletSuccess && <Message message="success" />}
                    </Box>
                </Box>
            </Box>

            {error && <Typography as="p" color={ALERT_1}>{error}</Typography>}

            <Box
                display="flex"
                width="376px"
                justifyContent="space-between"
                borderTop={`2px solid ${DIVIDER}`}
                pt="51px"
                mb="25px"
            >
                <Button
                    type="submit"
                    width="176px"
                    primary
                    disabled={!isValid || (inputFileRef.current && inputFileRef.current.value === '') || isLoading}
                >
                    Зберегти
                </Button>
                <Button type="reset" width="176px" secondary onClick={handleCloseClick}>
                    Скасувати
                </Button>
            </Box>
        </Form>
    )
}

const Message: React.FC<MessageProps> = ({ message }) => {
    return (
        <Box display="flex" alignItems="center" gap="10px" mt="24px">
            {message === "success" ? (
                <PackageSuccessIcon />
            ) : (
                <PackageErrorIcon />
            )}
            <Typography
                as="span"
                fz="16px"
                color={message === "success" ? SUCCESS : ALERT_1}
            >
                {message === "success" ? (
                    "Дані успішно додано"
                ) : (
                    "Виникла помилка"
                )}
            </Typography>
        </Box>
    );
}

export default PopupAddWallet;