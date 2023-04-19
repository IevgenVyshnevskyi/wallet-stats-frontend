import { useForm } from "react-hook-form";

import { ALERT_1, ALMOST_BLACK_FOR_TEXT, DIVIDER, SUCCESS } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from '../../atoms/button/Button.styled';
import { Input } from "../../atoms/input/Input.styled";
import { Label } from "../../atoms/label/Label.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import CrossIcon from './../../../shared/assets/icons/cross.svg';
import { PopupWrapper } from "./Popup.styled";
import PackageSuccessIcon from "../../../shared/assets/icons/package-success.svg";
import PackageErrorIcon from "../../../shared/assets/icons/package-error.svg";
import React, { useContext, useEffect, useRef } from "react";
import { PopupContext } from "../../../contexts/PopupContext";
import { MessageProps } from "../../../../types/molecules";
import { Form } from "../../atoms/form/Form.styled";
import { moneyAmountRegex } from "../../../shared/utils/regexes";
import { WalletPopupActionsFormData, IWallet } from "../../../store/types";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { resetError, setSuccessStatus, walletAction } from "../../../store/walletSlice";
import { userId } from "../../../api/api";

const PopupAddWallet: React.FC = () => {
    const dispatch = useAppDispatch()

    const inputFileRef = useRef<HTMLInputElement>(null);

    const { setIsAddWalletPopupOpen } = useContext(PopupContext);

    const { wallets, error, isAddWalletSuccess } = useAppSelector(state => state.wallet);

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
        reset();
        dispatch(resetError());
        setIsAddWalletPopupOpen(false);
    };

    useEffect(() => {
        if (isAddWalletSuccess) {
            handleCloseClick();
            dispatch(setSuccessStatus(false));
        }
    }, [isAddWalletSuccess]);

    function handleSub(data: WalletPopupActionsFormData) {
        const wallet: IWallet = {
            title: data.name,
            amount: data.amount,
            type_of_account: "bank",
            owner: userId,
        }

        dispatch(walletAction({ data: wallet, method: "POST" }))
    }

    return (
        <PopupWrapper>
            <Box>
                <Box>
                    <Typography as="h2" fw="500" fz="22px" mb="25px">
                        Додати картковий рахунок
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)}>
                        <Box mb="25px" display="flex" justifyContent="left">
                            <Box
                                borderRight={`2px solid ${DIVIDER}`}
                                pr="32px"
                            >
                                <Box mb="16px">
                                    <Label htmlFor="name" lh="16px" fz="13px"
                                        color={ALMOST_BLACK_FOR_TEXT}
                                        textAlight="left">Введіть назву карткового рахунку</Label>
                                    <Input {...register('name', {
                                        required: 'Обов\'язкове поле для заповнення',
                                        minLength: {
                                            value: 2,
                                            message: "Назва повинна бути не менше 2 символів",
                                        }
                                    })} type="text" id="name" width="244px" />
                                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    >{errors?.name && <>{errors?.name?.message || 'Error!'}</>}</Box>
                                </Box>
                                <Box mb="30px">
                                    <Label htmlFor="amount" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT}
                                        textAlight="left">Введіть суму коштів на рахунку</Label>
                                    <Input {...register('amount', {
                                        required: 'Обов\'язкове поле для заповнення',
                                        pattern: {
                                            value: moneyAmountRegex,
                                            message: "Сума може бути від 1 до 8 цифр перед крапкою та до 2 цифр після крапки",
                                        }
                                    })} id="amount" type="number" step="0.01" width="250px"
                                        style={{ paddingRight: '10px' }} />
                                    <Box color="red" textAlight="left" border="red" fz="13px"
                                        height="14px">{errors?.amount && <>{errors?.amount?.message
                                            || 'Введіть додаткове значення'}</>}</Box>
                                </Box>
                            </Box>
                            <Box basis="50%" ml="32px">
                                <Typography as="h3" fz="16px" lh="150%" mb="24px" color={ALMOST_BLACK_FOR_TEXT}>
                                    Або ви можете завантажити дані <br /> вашого рахунку з банку
                                </Typography>
                                <Button
                                    primary
                                    onClick={() => inputFileRef.current.click()}
                                    width="280px"
                                >
                                    Вибрати файл даних
                                </Button>
                                <Input
                                    type="file"
                                    ref={inputFileRef}
                                    style={{ display: "none" }}
                                />
                                {error && <Message message="error" />}
                                {isAddWalletSuccess && <Message message="success" />}
                            </Box>
                        </Box>

                        {/* {error && <Typography as="p" textAlight="center" color={ALERT_1}>{error}</Typography>} */}

                        <Box
                            display="flex"
                            justifyContent="center"
                            gap="35px"
                            borderTop={`2px solid ${DIVIDER}`}
                            pt="25px"
                        >
                            <Button
                                type="submit"
                                primary
                                width="296px"
                                disabled={!isValid || wallets.length > 4}
                            >
                                Зберегти
                            </Button>
                            <Button type="reset" secondary width="296px" onClick={handleCloseClick}>
                                Скасувати
                            </Button>
                        </Box>
                    </Form>
                </Box>

                {/* {addWalletError && <Typography as="p">{addWalletError}</Typography>} */}

                <Button secondary onClick={handleCloseClick} p="10px 20px">
                    <CrossIcon />
                </Button>
            </Box>
        </PopupWrapper>
    );
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