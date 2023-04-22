import {useRef, useState} from "react";

import {useForm} from "react-hook-form";

import {
    ALERT_1,
    ALMOST_BLACK_FOR_TEXT,
    DIVIDER,
    PRIMARY_HOVER,
    SUCCESS
} from "../../../shared/styles/variables";
import {Box} from "../../atoms/box/Box.styled";
import {Button} from '../../atoms/button/Button.styled';
import {Input} from "../../atoms/input/Input.styled";
import {Label} from "../../atoms/label/Label.styled";
import CrossIcon from './../../../shared/assets/icons/cross.svg';
import {PopupWrapper} from "./Popup.styled";
import React, {useContext, useEffect} from "react";
import {PopupContext} from "../../../contexts/PopupContext";
import {Typography} from '../../atoms/typography/Typography.styled';
import {ButtonPopup} from "../../atoms/button/ButtonPopup";
import {Form} from "../../atoms/form/Form.styled";
import {lettersRegex, moneyAmountRegex} from "../../../shared/utils/regexes";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {IWallet, WalletPopupActionsFormData} from "../../../store/types";
import {resetError, setActiveWallet, setSuccessStatus, walletAction} from "../../../store/walletSlice";
import {userId} from "../../../api/api";
import {MessageProps} from "../../../../types/molecules";
import PackageSuccessIcon from "../../../shared/assets/icons/package-success.svg";
import PackageErrorIcon from "../../../shared/assets/icons/package-error.svg";

const PopupAddAccount: React.FC = () => {
    const dispatch = useAppDispatch()

    const {setIsAddWalletPopupOpen} = useContext(PopupContext);

    const [isLeftPartOpen, setIsLeftPartOpen] = useState(true);

    const inputFileRef = useRef<HTMLInputElement>(null);

    const {
        error,
        isEditWalletSuccess,
        isDeleteWalletSuccess,
        activeWallet,
        isAddWalletSuccess
    } = useAppSelector(state => state.wallet);


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
        setIsAddWalletPopupOpen(false);
        dispatch(setActiveWallet(null));
        dispatch(resetError());
        dispatch(setSuccessStatus(false));
        reset();
    };

    useEffect(() => {
        if (isEditWalletSuccess || isDeleteWalletSuccess) {
            handleCloseClick()
        }
    }, [isEditWalletSuccess, isDeleteWalletSuccess]);

    /*const handleDeleteWallet = () => {
        dispatch(setSuccessStatus(false));
        dispatch(walletAction({method: "DELETE", id: String(activeWallet.id)}));
    };*/
    const handleOpenLeftPart = () => {
        setIsLeftPartOpen(true);
    };
    const handleOpenRightPart = () => {
        setIsLeftPartOpen(false);
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

    function handleSub(data: WalletPopupActionsFormData) {
        const wallet: IWallet = {
            title: data.name,
            amount: data.amount,
            type_of_account: activeWallet.type_of_account,
            owner: userId,
        }
        if (isLeftPartOpen) {
            dispatch(walletAction({data: wallet, method: "PUT", id: String(activeWallet.id)}))
        } else {
            dispatch(walletAction({data: wallet, method: "POST"}))
        }

    }

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
                                         fontWeight: isLeftPartOpen && "700",
                                         borderBottom: isLeftPartOpen && `2px solid ${PRIMARY_HOVER}`
                                     }}>Ввести дані вручну</ButtonPopup>
                        <ButtonPopup onClick={handleOpenRightPart}
                                     style={{
                                         fontWeight: !isLeftPartOpen && "700",
                                         borderBottom: !isLeftPartOpen && `2px solid ${PRIMARY_HOVER}`
                                     }}>Завантажити дані з файлу</ButtonPopup>
                    </Box>
                    <Form onSubmit={handleSubmit(handleSub)}>
                        {isLeftPartOpen ?
                            (<Box mb="25px">
                                    <Box>
                                        <Label htmlFor="name" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                               textAlight="left">Введіть назву карткового рахунку</Label>
                                        <Input {...register('name', {
                                            required: 'Обов\'язкове поле для заповнення',
                                            pattern: {
                                                value: lettersRegex,
                                                message: "Назва повинна бути не менше 2 літер",
                                            },
                                        })}
                                               type="text" id="name" width="340px"
                                               className={errors.name && 'error'}
                                               defaultValue={activeWallet?.title}
                                        />
                                        <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                             m="6px 0 10px 0">{errors?.name && <>{errors?.name?.message || 'Error!'}</>}</Box>
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
                            ) : (
                                <Box mb="25px">
                                    <Box>
                                        <Label htmlFor="name" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                               textAlight="left">Введіть назву карткового рахунку</Label>
                                        <Input {...register('name', {
                                            required: 'Обов\'язкове поле для заповнення',
                                            pattern: {
                                                value: lettersRegex,
                                                message: "Назва повинна бути не менше 2 літер",
                                            },
                                        })}
                                               type="text" id="name" width="340px"
                                               className={errors.name && 'error'}
                                               defaultValue={activeWallet?.title}
                                        />
                                        <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                             m="6px 0 10px 0">{errors?.name && <>{errors?.name?.message || 'Error!'}</>}</Box>
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
                                               ref={inputFileRef}
                                               style={{display: "none"}}
                                        />
                                        <Box height="55px">
                                            {error && <Message message="error"/>}
                                            {isAddWalletSuccess && <Message message="success"/>}
                                        </Box>
                                    </Box>
                                </Box>
                            )
                        }
                        {error && <Typography as="p" color={ALERT_1}>{error}</Typography>}
                        <Box
                            display="flex"
                            width="376px"
                            justifyContent="space-between"
                            borderTop={`2px solid ${DIVIDER}`}
                            pt="51px"
                            mb={activeWallet?.type_of_account === "bank" && "25px"}
                        >
                            <Button type="submit" width="176px" primary disabled={!isValid}>
                                Зберегти
                            </Button>
                            <Button type="reset" width="176px" secondary onClick={handleCloseClick}>
                                Скасувати
                            </Button>
                        </Box>
                    </Form>
                    {/*{activeWallet?.type_of_account === "bank" && (
                        <Box display="flex" justifyContent="flex-end" onClick={handleDeleteWallet}>
                            <ButtonLink>Видалити рахунок</ButtonLink>
                        </Box>
                    )}*/}

                </Box>
                <Button secondary onClick={handleCloseClick} p="10px 20px">
                    <CrossIcon/>
                </Button>
            </Box>
        </PopupWrapper>
    );
}

const Message: React.FC<MessageProps> = ({message}) => {
    return (
        <Box display="flex" alignItems="center" gap="10px" mt="24px">
            {message === "success" ? (
                <PackageSuccessIcon/>
            ) : (
                <PackageErrorIcon/>
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

export default PopupAddAccount;