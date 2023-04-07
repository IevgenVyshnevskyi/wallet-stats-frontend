import React, {useState} from "react";
import {useForm} from "react-hook-form";

import {Box} from '../../atoms/box/Box.styled';
import {Typography} from '../../atoms/typography/Typography.styled';
import {Img} from '../../atoms/img/Img.styled';
import {Container} from "../../atoms/container/Container.styled";
import {Form} from "../../atoms/form/Form.styled";
import {Label} from "../../atoms/label/Label.styled";
import {Input} from "../../atoms/input/Input.styled";
import {Link} from '../../atoms/link/Link.styled';
import {Button} from "../../atoms/button/Button.styled";

import logo from "../../../shared/assets/icons/logo.png";
import InterfaceImage from "../../../shared/assets/icons/interface-image-full.png";

import VisibilityOn from '../../../shared/assets/icons/visibility-on.svg';
import VisibilityOff from '../../../shared/assets/icons/visibility-off.svg';

import {
    ALMOST_BLACK_FOR_TEXT,
    GRADIENT, PRIMARY,
    WHITE
} from "../../../shared/styles/variables";
import {loginUser} from "../../../store/userSlice";
import {useAppDispatch} from "../../../store/hooks";
import {LoginFormData} from "../../../store/types";


const LoginPage: React.FC = () => {
    const dispatch = useAppDispatch()
    const [showPassword, setShowPassword] = useState(false);

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
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    function handleSub(data: LoginFormData) {
        console.log(data);
        dispatch(loginUser(data));
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
                <Box m="177px 0 177.21px 0">
                    <Img src={logo} alt="Logo"/>
                    <Typography fw="700" fz="24px" lh="170%" color={ALMOST_BLACK_FOR_TEXT} textAlign="center"
                                m="48px 0 48px 0">
                        Вхід до вашого акаунту
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
                          alignItems="end">
                        <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
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
                                 m="6px 0 14px 0">{errors?.email && <>{errors?.email?.message || 'Error!'}</>}</Box>
                            <Label htmlFor="password" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                   textAlight="left">Пароль</Label>
                            <Box position="relative" width="320px">
                                <span onClick={handleTogglePassword} style={{
                                    position: "absolute", top: "16px",
                                    right: "10px", cursor: "pointer"
                                }}>{showPassword ?
                                    <VisibilityOff/>
                                    :
                                    <VisibilityOn/>
                                }</span>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    width="265px" style={{paddingRight: '35px'}}
                                        {...register("password", {
                                        required: 'Обов\'язкове поле для заповнення',
                                    })} />
                            </Box>
                            <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                 m="6px 0 6px 0">{errors?.password && <>{errors?.password?.message || 'Error!'}</>}</Box>
                            <Box width="320px" p="0 0 0 50%"><Link to="/recoveryOne" fz="14px" outline="none"
                                                                   color={PRIMARY}>
                                Забули пароль?</Link></Box>
                        </Box>
                        <Button type="submit" disabled={!isValid} m="56px auto 0" primary>Увійти</Button>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default LoginPage;