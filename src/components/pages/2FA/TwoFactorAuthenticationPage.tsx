import { useEffect, useRef, useState } from "react";

import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getUserDetails } from "../../../store/userSlice";

import { Box } from '../../atoms/box/Box.styled';
import { Typography } from '../../atoms/typography/Typography.styled';
import { Img } from '../../atoms/img/Img.styled';
import { Container } from "../../atoms/container/Container.styled";
import { Form } from "../../atoms/form/Form.styled";
import { Button } from "../../atoms/button/Button.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import BaseField from "../../molecules/base-field/BaseField";

import logo from "../../../shared/assets/images/logo.png";
import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";

import {
    ALMOST_BLACK_FOR_TEXT,
    DISABLED,
    GRADIENT, PRIMARY,
    WHITE
} from "../../../shared/styles/variables";

const TwoFactorAuthenticationPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const [count, setCount] = useState(60);

    const { isLoading } = useAppSelector(state => state.user);

    const intervalRef = useRef(null);

    const handleSub = (data: {}) => {
        reset();
    }

    const {
        register,
        formState: { errors, isValid },
        handleSubmit,
        reset,
    } = useForm({ mode: "all" });

    useEffect(() => {
        dispatch(getUserDetails());

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
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
            </Box>
            <Box display="flex" flexDirection="column" width="592px" justifyContent="center" alignItems="center"
                textAlign="center"
                background={WHITE}>
                <Box m="auto 0" alignItems="center" textAlign="center">
                    <Img src={logo} alt="Logo" />
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
                                <BaseField
                                    errors={errors}
                                    fieldType="text"
                                    label="Код"
                                    name="authentication"
                                    registerOptions={register('authentication', {
                                        required: 'Обов\'язкове поле для заповнення',
                                        min: 0,
                                    })}
                                    type="number"
                                />
                                <Box width="320px" p="0 0 0 39%">
                                    <ButtonLink disabled color={count > 0 ? DISABLED : PRIMARY}>
                                        Надіслати код ще раз {count > 0 ? count : null}
                                    </ButtonLink>
                                </Box>
                            </Box>
                        </Box>
                        <Button type="submit" disabled={!isValid || isLoading} width="115px" m="52px auto 0"
                            primary>
                            Увійти
                        </Button>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default TwoFactorAuthenticationPage;