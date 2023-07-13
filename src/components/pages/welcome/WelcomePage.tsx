import { useNavigate } from "react-router-dom";

import { Button } from "../../atoms/button/Button.styled";
import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { Img } from "../../atoms/img/Img.styled";
import { Container } from "../../atoms/container/Container.styled";

import logo from "../../../shared/assets/images/logo.png";
import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";

import COLORS from "../../../shared/styles/variables";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleEnterClick = () => {
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleShowDemoClick = () => {
    window.location.replace("https://spendwise-test.vercel.app/home");
  };

  return (
    <Container display="flex">
      <Box
        flex="1"
        overflow="hidden"
        height="100vh"
        background={COLORS.GRADIENT}>
        <Img src={InterfaceImage} m="0 0 0 100px" alt="InterfaceImage" />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        width="592px"
        alignItems="center"
        textAlign="center"
        background={COLORS.WHITE}>
        <Box m="auto 0" justifyContent="space-around" textAlign="center">
          <Img src={logo} alt="Logo" />
          <Typography
            fw="700"
            fz="24px"
            lh="170%"
            textAlign="center"
            m="48px 0 80px 0">
            Контролюйте свої кошти з програмою <br /> обліку персональних
            фінансів!
          </Typography>
          {/* <Typography fw="400" fz="16px" lh="24px" m="0 0 16px 0" textAlign="center">
                        Для початку потрібно пройти невеличку реєстрацію
                    </Typography>
                    <Button m="0 auto" primary onClick={handleRegisterClick}>Почати реєстрацію</Button>
                    <Typography fw="400" fz="16px" lh="19px" m="32px 0 16px 0" textAlign="center">
                        Вже маєте аккаунт?
                    </Typography>
                    <Box display='flex' justifyContent='center'>
                        <Button secondary onClick={handleEnterClick}>Увійти</Button>
                    </Box> */}
          <Typography
            fw="400"
            fz="16px"
            lh="19px"
            m="32px 0 16px 0"
            textAlign="center">
            Сервер тимчасово недоступний
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button secondary onClick={handleShowDemoClick}>
              Перейти до демо версії
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default WelcomePage;
