import React from "react";

import {Box} from '../../atoms/box/Box.styled';
import {Typography} from '../../atoms/typography/Typography.styled';
import {Img} from '../../atoms/img/Img.styled';
import {Container} from "../../atoms/container/Container.styled";

import logo from "../../../shared/assets/images/logo.png";
import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";

import {
    ALMOST_BLACK_FOR_TEXT,
    GRADIENT, PRIMARY,
    WHITE
} from "../../../shared/styles/variables";
import {Link} from "../../atoms/link/Link.styled";

const PasswordRecoveryTwoPage: React.FC = () => {

    return (
        <Container display="flex">
            <Box flex="1" overflow="hidden" height="100vh" background={GRADIENT}>
                <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage"/>
            </Box>
            <Box display="flex" flexDirection="column" width="592px" alignItems="center"
                 background={WHITE}>
                <Box width="492px" m="150px 0 76.5px 0" alignItems="center" textAlign="center">
                    <Img src={logo} m="0 auto" alt="Logo"/>
                    <Typography fw="700" fz="24px" lh="170%" color={ALMOST_BLACK_FOR_TEXT} textAlign="center"
                                m="48px 0 48px 0">
                        Відновлення пароля
                    </Typography>
                    <Typography fw="400" fz="16px" lh="24px" m="0 0 48px 0" color={ALMOST_BLACK_FOR_TEXT}
                                textAlign="center">
                        Посилання для скидання пароля надіслано на вашу <br/> електронну адресу. Якщо посилання не
                        прийшло, то ви <br/> можете надіслати його знову.
                    </Typography>
                    <Link to="#" fz="14px" outline="none" m="0 auto" color={PRIMARY}>Надіслати знову</Link>
                </Box>
            </Box>
        </Container>
    )
}

export default PasswordRecoveryTwoPage;