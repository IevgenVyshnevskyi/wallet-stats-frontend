import { useAppDispatch } from "../../../store/hooks";
import { setIsResetLinkStepOpen } from "../../../store/passwordRecoverySlice";

import { Box } from "../../atoms/box/Box.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { Container } from "../../atoms/container/Container.styled";
import { Img } from "../../atoms/img/Img.styled";
import { Typography } from "../../atoms/typography/Typography.styled";

import InterfaceImage from "../../../shared/assets/images/interface-image-full.png";
import logo from "../../../shared/assets/images/logo.png";

import COLORS from "../../../shared/styles/variables";

const ResetLinkStep: React.FC = () => {
  const dispatch = useAppDispatch();

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
        background={COLORS.WHITE}>
        <Box m="auto 0" width="492px" alignItems="center" textAlign="center">
          <Img src={logo} m="0 auto" alt="Logo" />
          <Typography
            fw="700"
            fz="24px"
            lh="170%"
            color={COLORS.ALMOST_BLACK_FOR_TEXT}
            textAlign="center"
            m="48px 0 48px 0">
            Відновлення пароля
          </Typography>
          <Typography
            fw="400"
            fz="16px"
            lh="24px"
            m="0 0 48px 0"
            color={COLORS.ALMOST_BLACK_FOR_TEXT}
            textAlign="center">
            Посилання для скидання пароля надіслано на вашу <br /> електронну
            адресу. Якщо посилання не прийшло, то ви <br /> можете надіслати
            його знову.
          </Typography>
          <Box display="flex" justifyContent="center">
            <ButtonLink
              onClick={() => dispatch(setIsResetLinkStepOpen(false))}
              fz="14px"
              m="0 auto">
              Надіслати знову
            </ButtonLink>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default ResetLinkStep;
