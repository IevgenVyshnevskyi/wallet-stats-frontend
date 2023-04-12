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
import React, { useContext, useRef } from "react";
import { PopupContext } from "../../../contexts/PopupContext";
import { MessageProps } from "../../../../types/molecules";
import { Form } from "../../atoms/form/Form.styled";
import { moneyAmountRegex } from "../../../shared/utils/regexes";

const PopupAddWallet: React.FC = () => {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const { setIsAddWalletPopupOpen } = useContext(PopupContext);

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
    };

    function handleSub(data: {}) {
        console.log(data);
        //alert(JSON.stringify(data));
        reset();
        handleCloseClick();
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
                                            message: "Повинно бути не менше 2 символів",
                                        }
                                    })} type="text" id="name" width="244px" />
                                    <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                    >{errors?.name && <>{errors?.name?.message || 'Error!'}</>}</Box>
                                </Box>
                                <Box mb="30px">
                                    <Label htmlFor="sum" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT}
                                        textAlight="left">Введіть суму коштів на рахунку</Label>
                                    <Input {...register('sum', {
                                        required: 'Обов\'язкове поле для заповнення',
                                        pattern: {
                                            value: moneyAmountRegex,
                                            message: "Сума може бути від 1 до 8 цифр перед крапкою та до 2 цифр після крапки",
                                        }
                                    })} id="sum" type="number" step="0.01" width="250px"
                                        style={{ paddingRight: '10px' }} />
                                    <Box color="red" textAlight="left" border="red" fz="13px"
                                        height="14px">{errors?.sum && <>{errors?.sum?.message
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
                                <Message message="success" />
                                <Message message="error" />
                            </Box>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="center"
                            gap="35px"
                            borderTop={`2px solid ${DIVIDER}`}
                            pt="25px"
                        >
                            <Button type="submit" primary width="296px" disabled={!isValid}>
                                Зберегти
                            </Button>
                            <Button type="reset" secondary width="296px" onClick={handleCloseClick}>
                                Скасувати
                            </Button>
                        </Box>
                    </Form>
                </Box>
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