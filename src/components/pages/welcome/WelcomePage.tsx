import { Box } from '../../atoms/box/Box.styled';
import { Typography } from '../../atoms/typography/Typography.styled';
import { Img } from '../../atoms/img/Img.styled';
import { Container } from "../../atoms/container/Container.styled";

import logo from "../../../shared/assets/images/logo.png";
import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";

import {
    GRADIENT,
    WHITE
} from "../../../shared/styles/variables";
import {Button} from "../../atoms/button/Button.styled";
import { useNavigate } from "react-router-dom";

function WelcomePage() {
    const navigate = useNavigate();

    function handleEnterClick() {
        navigate('/login');
    }

    function handleRegisterClick() {
        navigate('/register');
    }

    function handleChangeMainPageClick() {
        navigate('/home');
    }

    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
            </Box>
            <Box display="flex" flexDirection="column" width="592px" alignItems="center" textAlign="center" background={WHITE}>
                <Box m="100px 0 100px 0" justifyContent="space-around" textAlign="center">
                    <Img src={logo} alt="Logo" />
                    <Typography fw="700" fz="24px" lh="170%" textAlign="center" m="48px 0 80px 0">
                        Контролюйте свої кошти з програмою <br /> обліку персональних фінансів!
                    </Typography>
                    <Typography fw="400" fz="16px" lh="24px" m="0 0 16px 0" textAlign="center">
                        Для початку потрібно пройти невеличку реєстрацію
                    </Typography>
                    <Button m="0 auto" primary onClick={handleRegisterClick}>Почати реєстрацію</Button>
                    <Typography fw="400" fz="16px" lh="19px" m="32px 0 16px 0" textAlign="center">
                        Ви маєте аккаунт?
                    </Typography>
                    <Box display='flex' direction='column' justifyContent='center' alignItems='center' gap="100px">
                        <Button secondary onClick={handleEnterClick}>Увійти</Button>
                        <Button secondary onClick={handleChangeMainPageClick}>Перейти на головну сторінку</Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default WelcomePage;
