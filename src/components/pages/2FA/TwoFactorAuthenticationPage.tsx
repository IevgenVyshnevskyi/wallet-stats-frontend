import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";

import {Box} from '../../atoms/box/Box.styled';
import {Typography} from '../../atoms/typography/Typography.styled';
import {Img} from '../../atoms/img/Img.styled';
import {Container} from "../../atoms/container/Container.styled";
import {Form} from "../../atoms/form/Form.styled";
import {Label} from "../../atoms/label/Label.styled";
import {Input} from "../../atoms/input/Input.styled";
import {Button} from "../../atoms/button/Button.styled";

import logo from "../../../shared/assets/images/logo.png";
import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";

import {
    ALERT_1, ALERT_2,
    ALMOST_BLACK_FOR_TEXT,
    DISABLED,
    GRADIENT, PRIMARY,
    WHITE
} from "../../../shared/styles/variables";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { getUserDetails } from "../../../store/userSlice";
import { useAppDispatch } from "../../../store/hooks";
import { token } from "../../../api/api";

const TwoFactorAuthenticationPage: React.FC = () => {
    const dispatch = useAppDispatch();

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

    function handleSub(data: {}) {
        console.log(data);
        //alert(JSON.stringify(data));
        reset();
    }

    const [count, setCount] = useState(60);
    const intervalRef = useRef(null);

    useEffect(() => {
        dispatch(getUserDetails())

        intervalRef.current = setInterval(() => {
            setCount(count => count - 1);
        }, 1000);

        return () => clearInterval(intervalRef.current);
    }, []);

    useEffect(() => {
        if (count === 0) {
            clearInterval(intervalRef.current);
        }
    }, [count]);

    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage"/>
            </Box>
            <Box display="flex" flexDirection="column" width="592px" justifyContent="center" alignItems="center"
                 textAlign="center"
                 background={WHITE}>
                <Box m="auto 0" alignItems="center" textAlign="center">
                    <Img src={logo} alt="Logo"/>
                    <Typography fw="700" fz="24px" lh="170%" color={ALMOST_BLACK_FOR_TEXT} textAlign="center"
                                m="48px 0 48px 0">
                        Вхід до вашого акаунту
                    </Typography>
                    <Typography fw="400" fz="16px" lh="24px" m="0 0 24px 0" color={ALMOST_BLACK_FOR_TEXT}
                                textAlign="center">
                        Введіть код якій вам було надіслано
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
                          alignItems="end">
                        <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
                            <Box mb="6px">
                                <Label htmlFor="authentication" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                       textAlight="left">Код</Label>
                                <Input {...register('authentication', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    min: 0,
                                })} type="number" id="authentication" width="290px"
                                       style={{paddingRight: '10px'}}
                                       className={errors.authentication && 'error'}
                                />
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                     m="6px 0 6px 0">{errors?.authentication && <>{errors?.authentication?.message
                                    || 'Введіть додаткове значення'}</>}</Box>
                                <Box width="320px" p="0 0 0 39%">
                                    <ButtonLink disabled color={count > 0 ? DISABLED : PRIMARY}>
                                        Надіслати код ще раз {count > 0 ? count : null}
                                    </ButtonLink>
                                </Box>
                            </Box>
                        </Box>
                        <Button type="submit" disabled={!isValid} width="115px" m="52px auto 0"
                                primary>Увійти</Button>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default TwoFactorAuthenticationPage;