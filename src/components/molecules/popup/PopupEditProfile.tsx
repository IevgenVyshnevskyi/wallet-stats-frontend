import { DIVIDER } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from '../../atoms/button/Button.styled';
import { Input } from "../../atoms/input/Input.styled";
import { Label } from "../../atoms/label/Label.styled";
import CrossIcon from './../../../shared/assets/icons/cross.svg';
import { PopupWrapper } from "./Popup.styled";
import { useContext } from "react";
import { PopupContext } from "../../../contexts/PopupContext";
import { Typography } from '../../atoms/typography/Typography.styled';
import { ButtonLink } from "../../atoms/button/ButtonLink";

const PopupEditProfile: React.FC = () => {
  const { setIsEditProfilePopupOpen } = useContext(PopupContext);

  const handleCloseClick = () => {
    setIsEditProfilePopupOpen(false);
  };

  return (
    <PopupWrapper zIndex="5">
      <Box>
        <Box>
          <Typography as="h2" fw="500" fz="22px" mb="25px">
            Редагування рахунку
          </Typography>
          <Box mb="25px">
            <Box mb="30px" mr="30px">
              <Label htmlFor="name">Назва карткового рахунку</Label>
              <Input id="name" />
            </Box>
            <Box mb="30px" mr="30px">
              <Label htmlFor="sum">Сума коштів на рахунку</Label>
              <Input id="sum" />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap="35px"
            borderTop={`2px solid ${DIVIDER}`}
            pt="25px"
            mb="25px"
          >
            <Button primary width="100%" onClick={handleCloseClick}>
              Зберегти
            </Button>
            <Button secondary width="100%" onClick={handleCloseClick}>
              Скасувати
            </Button>
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <ButtonLink>Видалити рахунок</ButtonLink>
          </Box>
        </Box>
        <Button secondary onClick={handleCloseClick} p="10px 20px">
          <CrossIcon />
        </Button>
      </Box>
    </PopupWrapper>
  );
}

export default PopupEditProfile;