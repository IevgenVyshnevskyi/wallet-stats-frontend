import { Box } from '../../atoms/box/Box.styled';
import { Typography } from '../../atoms/typography/Typography.styled';
import { Link } from '../../atoms/link/Link.styled';
import { Img } from '../../atoms/img/Img.styled';
import { Container } from "../../atoms/container/Container.styled";

import logo from "../../../shared/assets/icons/logo.png";
import InterfaceImage from "../../../shared/assets/icons/interface-image-full.png";

import {
    ALMOST_BLACK_FOR_TEXT,
    GRADIENT,
    PRIMARY,
    WHITE
} from "../../../shared/styles/variables";

const WelcomePage: React.FC = () => {
    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
            </Box>
            <Box display="flex" flexDirection="column" width="592px" alignItems="center" textAlign="center"
                background={WHITE}>
                <Box m="100px 0 100px 0" justifyContent="space-around" textAlign="center">
                    <Img src={logo} alt="Logo" />
                    <Typography fw="700" fz="24px" lh="170%" textAlign="center" m="48px 0 80px 0">
                        Контролюйте свої кошти з програмою <br /> обліку персональних фінансів!
                    </Typography>
                    <Typography fw="400" fz="16px" lh="24px" m="0 0 26.5px 0" textAlign="center">
                        Для початку потрібно пройти невеличку реєстрацію
                    </Typography>
                    <Link to="/register" fw="600" fz="16px" lh="19px" width="211px" height="40px" color="WHITE"
                        background={PRIMARY} padding="10.5px 32px" borderRadius="12px">Почати реєстрацію</Link>
                    <Typography fw="400" fz="16px" lh="19px" m="42.5px 0 26.5px 0" textAlign="center">
                        Ви вже маєте аккаунт?
                    </Typography>
                    <Box display='flex' direction='column' justifyContent='center' alignItems='center' gap="100px">
                        <Link to="/login" fw="600" fz="16px" color={ALMOST_BLACK_FOR_TEXT}
                            background={WHITE} padding="10.5px 32px" border="2px solid #737FEF"
                            borderRadius="12px">Увійти</Link>
                        <Link to="/home" fw="600" fz="16px" lh="19px" color={ALMOST_BLACK_FOR_TEXT}
                            background={WHITE} padding="10.5px 32px" border="2px solid #737FEF"
                            borderRadius="12px">Перейти на головну сторінку</Link>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
}

export default WelcomePage;
