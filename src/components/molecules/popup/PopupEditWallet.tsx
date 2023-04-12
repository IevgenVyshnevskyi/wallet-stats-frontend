import {useForm} from "react-hook-form";

import {ALMOST_BLACK_FOR_TEXT, DIVIDER} from "../../../shared/styles/variables";
import {Box} from "../../atoms/box/Box.styled";
import {Button} from '../../atoms/button/Button.styled';
import {Input} from "../../atoms/input/Input.styled";
import {Label} from "../../atoms/label/Label.styled";
import CrossIcon from './../../../shared/assets/icons/cross.svg';
import {PopupWrapper} from "./Popup.styled";
import React, {useContext} from "react";
import {PopupContext} from "../../../contexts/PopupContext";
import {Typography} from '../../atoms/typography/Typography.styled';
import {ButtonLink} from "../../atoms/button/ButtonLink";
import {Form} from "../../atoms/form/Form.styled";

const PopupEditWallet: React.FC = () => {
    const {setIsEditWalletPopupOpen} = useContext(PopupContext);

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });

    const handleCloseClick = () => {
        setIsEditWalletPopupOpen(false);
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
                                        message: "Повинно бути не менше 2 символів",
                                    }
                                })} type="text" id="name" width="284px"/>
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                     m="6px 0 10px 0">{errors?.name && <>{errors?.name?.message || 'Error!'}</>}</Box>
                            </Box>
                            <Box mb="30px">
                                <Label htmlFor="sum" lh="16px" fz="13px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                       textAlight="left">Сума коштів на рахунку</Label>
                                <Input {...register('sum', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    min: 0.01,
                                })} id="sum" type="number" step="0.01" width="290px"
                                       style={{paddingRight: '10px'}}/>
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                     m="6px 0 10px 0">{errors?.sum && <>{errors?.sum?.message
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
                    <Box display="flex" justifyContent="flex-end">
                        <ButtonLink>Видалити рахунок</ButtonLink>
                    </Box>
                </Box>
                <Button secondary onClick={handleCloseClick} p="10px 20px">
                    <CrossIcon/>
                </Button>
            </Box>
        </PopupWrapper>
    );
}

export default PopupEditWallet;