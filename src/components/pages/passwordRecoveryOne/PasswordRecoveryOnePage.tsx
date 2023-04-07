import React from "react";
import {useForm} from "react-hook-form";

import {Box} from '../../atoms/box/Box.styled';
import {Typography} from '../../atoms/typography/Typography.styled';
import {Img} from '../../atoms/img/Img.styled';
import {Container} from "../../atoms/container/Container.styled";
import {Form} from "../../atoms/form/Form.styled";
import {Label} from "../../atoms/label/Label.styled";
import {Input} from "../../atoms/input/Input.styled";
import {Button} from "../../atoms/button/Button.styled";

import logo from "../../../shared/assets/icons/logo.png";
import InterfaceImage from "../../../shared/assets/icons/interface-image-full.png";

import {
    ALMOST_BLACK_FOR_TEXT,
    GRADIENT,
    WHITE
} from "../../../shared/styles/variables";

const PasswordRecoveryOnePage: React.FC = () => {

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
    } = useForm({
        mode: "onBlur",
    });

    function handleSub(data: {}) {
        console.log(data);
        //alert(JSON.stringify(data));
        reset();
    }

    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage"/>
            </Box>
            <Box display="flex" flexDirection="column" width="592px" alignItems="center" textAlign="center"
                 background={WHITE}>
                <Box m="150px 0 76.5px 0">
                    <Img src={logo} alt="Logo"/>
                    <Typography fw="700" fz="24px" lh="170%" color={ALMOST_BLACK_FOR_TEXT} textAlign="center"
                                m="48px 0 48px 0">
                        Відновлення пароля
                    </Typography>
                    <Typography fw="400" fz="16px" lh="24px" m="0 0 24px 0" color={ALMOST_BLACK_FOR_TEXT}
                                textAlign="center">
                        Введіть пошту на яку ви реєстрували <br/> ваш аккаунт
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
                          alignItems="end">
                        <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
                            <Box mb="6px">
                                <Label htmlFor="email" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                       textAlight="left">Пошта</Label>
                                <Input {...register('email', {
                                    required: 'Обов\'язкове поле для заповнення',
                                    pattern: {
                                        value: /\S+@\S+.\S+/,
                                        message: "Введіть коректну електронну адресу"
                                    }
                                })} type="email" id="email" width="284px"/>
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                     m="6px 0 58px 0">{errors?.email && <>{errors?.email?.message || 'Error!'}</>}</Box>
                            </Box>
                        </Box>
                        <Button type="submit" disabled={!isValid} width="100px" m="0 auto" mt="56px"
                                primary>Далі</Button>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default PasswordRecoveryOnePage;