import React, {useState} from "react";
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
    ALMOST_BLACK_FOR_TEXT,
    GRADIENT,
    WHITE
} from "../../../shared/styles/variables";

import VisibilityOn from '../../../shared/assets/icons/visibility-on.svg';
import VisibilityOff from '../../../shared/assets/icons/visibility-off.svg';
import {PasswordRecoveryThreeFormData} from "../../../store/types";

const PasswordRecoveryThreePage: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        formState: {
            errors,
            isValid,
        },
        handleSubmit,
        reset,
        watch,
    } = useForm({
        mode: "onBlur",
    });
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleToggleConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    function handleSub(data: PasswordRecoveryThreeFormData) {
        console.log(data);
        //alert(JSON.stringify(data));
        reset();
    }

    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage"/>
            </Box>
            <Box display="flex" flexDirection="column" width="592px" justifyContent="center" alignItems="center" textAlign="center"
                 background={WHITE}>
                <Box m="92.5px 0 76.5px 0" alignItems="center" textAlign="center">
                    <Img src={logo} alt="Logo"/>
                    <Typography fw="700" fz="24px" lh="170%" color={ALMOST_BLACK_FOR_TEXT} textAlign="center"
                                m="48px 0 48px 0">
                        Відновлення пароля
                    </Typography>
                    <Typography fw="400" fz="16px" lh="24px" m="0 0 24px 0" color={ALMOST_BLACK_FOR_TEXT}
                                textAlign="center">
                        Введіть новий пароль для вашого <br/> аккаунту
                    </Typography>
                    <Form onSubmit={handleSubmit(handleSub)} maxWidth="592px" textAlign="center"
                          alignItems="end">
                        <Box maxWidth="320px" alignItems="flex-start" m="0 auto">
                            <Box mb="6px">
                                <Label htmlFor="password" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mb="6px"
                                       textAlight="left">Пароль</Label>
                                <Box position="relative">
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
                                     m="2px 0 0 0">{errors?.password && <>{errors?.password?.message || 'Error!'}</>}</Box>
                                <Label htmlFor="confirmPassword" lh="16px" color={ALMOST_BLACK_FOR_TEXT} mt="16px"
                                       mb="6px" textAlight="left">Повторити пароль</Label>
                                <Box position="relative">
                                    <span onClick={handleToggleConfirmPassword} style={{
                                        position: "absolute", top: "16px",
                                        right: "10px", cursor: "pointer"
                                    }}>{showConfirmPassword ?
                                        <VisibilityOff/>
                                        :
                                        <VisibilityOn/>
                                    }</span>
                                    <Input
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        width="265px" style={{paddingRight: '35px'}}
                                        {...register("confirmPassword", {
                                            required: 'Обов\'язкове поле для заповнення',
                                            validate: (val: string) => {
                                                if (watch('password') != val) {
                                                    return "Паролі не співпадають";
                                                }
                                            }
                                        })}/>
                                </Box>
                                <Box color="red" textAlight="left" border="red" fz="13px" height="14px"
                                     m="6px 0 14px 0">{errors?.confirmPassword && <>{errors?.confirmPassword?.message || 'Error!'}</>}</Box>
                            </Box>
                        </Box>
                        <Button type="submit" disabled={!isValid} width="139px" m="44px auto 0"
                                primary>Зберегти</Button>
                    </Form>
                </Box>
            </Box>
        </Container>
    )
}

export default PasswordRecoveryThreePage;