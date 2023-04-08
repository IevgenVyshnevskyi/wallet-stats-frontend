import { ALERT_1, DIVIDER, SUCCESS } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from '../../atoms/button/Button.styled';
import { Input } from "../../atoms/input/Input.styled";
import { Label } from "../../atoms/label/Label.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import CrossIcon from './../../../shared/assets/icons/cross.svg';
import { PopupWrapper } from "./Popup.styled";
import PackageSuccessIcon from "../../../shared/assets/icons/package-success.svg";
import PackageErrorIcon from "../../../shared/assets/icons/package-error.svg";
import { useContext, useRef } from "react";
import { PopupContext } from "../../../contexts/PopupContext";
import { MessageProps } from "../../../../types/molecules";

const PopupAddWallet: React.FC = () => {
  const inputFileRef = useRef<HTMLInputElement>(null)

  const { setIsAddWalletPopupOpen } = useContext(PopupContext);

  const handleCloseClick = () => {
    setIsAddWalletPopupOpen(false);
  };

  return (
    <PopupWrapper>
      <Box>
        <Box>
          <Typography as="h2" fw="500" fz="22px" mb="25px">
            Додати картковий рахунок
          </Typography>
          <Box mb="25px" display="flex" justifyContent="center">
            <Box
              basis="50%"
              borderRight={`2px solid ${DIVIDER}`}
              pr="32px"
            >
              <Box mb="30px" mr="30px">
                <Label htmlFor="name">Введіть назву карткового рахунку</Label>
                <Input id="name" />
              </Box>
              <Box mb="30px" mr="30px">
                <Label htmlFor="sum">Введіть суму коштів на рахунку</Label>
                <Input id="sum" />
              </Box>
            </Box>
            <Box basis="50%" ml="32px">
              <Typography as="h3" fz="16px" lh="150%" mb="24px">
                Або ви можете завантажити дані вашого рахунку з банку
              </Typography>
              <Button
                primary
                onClick={() => inputFileRef.current.click()}
                width="100%"
              >
                Вибрати файл даних
              </Button>
              <Input
                type="file"
                ref={inputFileRef}
                style={{ display: "none" }}
              />
              <Message message="success" />
              <Message message="error" />
            </Box>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            gap="35px"
            borderTop={`2px solid ${DIVIDER}`}
            pt="25px"
          >
            <Button primary width="100%" onClick={handleCloseClick}>
              Зберегти
            </Button>
            <Button secondary width="100%" onClick={handleCloseClick}>
              Скасувати
            </Button>
          </Box>
        </Box>
        <Button secondary onClick={handleCloseClick} p="10px 20px">
          <CrossIcon />
        </Button>
      </Box>
    </PopupWrapper>
  );
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <Box display="flex" alignItems="center" gap="10px" mt="24px">
      {message === "success" ? (
        <PackageSuccessIcon />
      ) : (
        <PackageErrorIcon />
      )
      }
      <Typography
        as="span"
        fz="16px"
        color={message === "success" ? SUCCESS : ALERT_1}
      >
        {message === "success" ? (
          "Дані успішно додано"
        ) : (
          "Виникла помилка"
        )
        }
      </Typography>
    </Box>
  );
}

export default PopupAddWallet;