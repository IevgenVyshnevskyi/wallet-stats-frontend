import { useContext, useEffect, useState } from "react";

import { PopupContext } from "../../../../contexts/PopupContext";

import { useAppSelector } from "../../../../store/hooks";

import { Box } from "../../../atoms/box/Box.styled";
import { Button } from "../../../atoms/button/Button.styled";
import { PopupWrapper } from "../Popup.styled";
import { ButtonPopup } from "../../../atoms/button/ButtonPopup";
import { Typography } from "../../../atoms/typography/Typography.styled";
import { ButtonLink } from "../../../atoms/button/ButtonLink";
import EditProfileTab from "./EditProfileTab";
import ChangePasswordTab from "./ChangePasswordTab";

import CrossIcon from "../../../../shared/assets/icons/cross.svg";

const PopupEditProfile: React.FC = () => {
  const { setIsEditProfilePopupOpen, setIsDeleteAccountPopupOpen } =
    useContext(PopupContext);

  const { isProfileChanged } = useAppSelector((state) => state.user);

  const [isEditProfileTabOpen, setIsEditProfileTabOpen] = useState(true);

  const handleCloseClick = () => {
    setIsEditProfilePopupOpen(false);
  };

  const onDeleteAccountClick = () => {
    setIsDeleteAccountPopupOpen(true);
  };

  useEffect(() => {
    if (isProfileChanged) {
      handleCloseClick();
    }
  }, [isProfileChanged]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCloseClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <PopupWrapper zIndex="5" onClick={handleCloseClick}>
      <Box onClick={(event) => event.stopPropagation()}>
        <Box>
          <Typography as="h2" fw="500" fz="22px" mb="25px">
            Налаштування профілю
          </Typography>
          <Box display="flex" direction="column" mb="25px">
            <Box display="flex" width="100%" mb="24px">
              <ButtonPopup
                onClick={() => setIsEditProfileTabOpen(true)}
                isActive={isEditProfileTabOpen}>
                Дані користувача
              </ButtonPopup>
              <ButtonPopup
                onClick={() => setIsEditProfileTabOpen(false)}
                isActive={!isEditProfileTabOpen}>
                Зміна паролю
              </ButtonPopup>
            </Box>

            {isEditProfileTabOpen ? <EditProfileTab /> : <ChangePasswordTab />}
          </Box>
          <Box display="flex" justifyContent="flex-end">
            <ButtonLink onClick={onDeleteAccountClick}>
              Видалити аккаунт
            </ButtonLink>
          </Box>
        </Box>
        <Button secondary onClick={handleCloseClick} p="10px 20px">
          <CrossIcon />
        </Button>
      </Box>
    </PopupWrapper>
  );
};

export default PopupEditProfile;
