import { useContext, useEffect, useState } from "react";

import { PopupContext } from "../../../../contexts/PopupContext";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { setBankDataSuccessStatus } from "../../../../store/bankDataSlice";
import {
  resetError,
  setActiveWallet,
  setSuccessStatus,
} from "../../../../store/walletSlice";

import Box from "../../../atoms/box/Box.styled";
import Button from "../../../atoms/button/Button.styled";
import ButtonPopup from "../../../atoms/button/ButtonPopup";
import Typography from "../../../atoms/typography/Typography.styled";
import PopupWrapper from "../Popup.styled";
import AddWalletTab from "./AddWalletTab";
import AddBankDataTab from "./AddBankdataTab";

import CrossIcon from "../../../../shared/assets/icons/cross.svg";

const PopupAddWallet: React.FC = () => {
  const dispatch = useAppDispatch();

  const [isAddWalletManuallyOpen, setIsAddWalletManuallyOpen] = useState(true);

  const { setIsAddWalletPopupOpen } = useContext(PopupContext);

  const { isAddWalletSuccess } = useAppSelector((state) => state.wallet);

  const handleCloseClick = () => {
    dispatch(setActiveWallet(null));
    dispatch(resetError());
    dispatch(setSuccessStatus(false));
    dispatch(setBankDataSuccessStatus(false));
    setIsAddWalletPopupOpen(false);
  };

  useEffect(() => {
    if (isAddWalletSuccess) {
      handleCloseClick();
      dispatch(setSuccessStatus(false));
    }
  }, [isAddWalletSuccess]);

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
    <PopupWrapper onClick={handleCloseClick}>
      <Box onClick={(event) => event.stopPropagation()}>
        <Box>
          <Typography as="h2" fw="600" fz="22px" mb="25px">
            Додати картковий рахунок
          </Typography>
          <Box display="flex" width="100%" mb="24px">
            <ButtonPopup
              onClick={() => setIsAddWalletManuallyOpen(true)}
              isActive={isAddWalletManuallyOpen}>
              Ввести дані вручну
            </ButtonPopup>
            <ButtonPopup
              onClick={() => setIsAddWalletManuallyOpen(false)}
              isActive={!isAddWalletManuallyOpen}>
              Завантажити дані з файлу
            </ButtonPopup>
          </Box>

          {isAddWalletManuallyOpen ? <AddWalletTab /> : <AddBankDataTab />}
        </Box>
        <Button secondary onClick={handleCloseClick} p="10px 20px">
          <CrossIcon />
        </Button>
      </Box>
    </PopupWrapper>
  );
};

export default PopupAddWallet;
