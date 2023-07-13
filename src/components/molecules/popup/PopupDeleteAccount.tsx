import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { PopupContext } from "../../../contexts/PopupContext";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  deleteUserAccount,
  resetDeleteUserAccountError,
  resetUserState,
  setIsAccountDeleted,
} from "../../../store/userSlice";
import { resetWalletState } from "../../../store/walletSlice";
import { resetCategoryState } from "../../../store/categorySlice";
import { resetTransactionState } from "../../../store/transactionSlice";
import { resetStatisticsState } from "../../../store/statisticsSlice";

import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { Form } from "../../atoms/form/Form.styled";
import { PopupWrapper } from "./Popup.styled";

import CrossIcon from "../../../shared/assets/icons/cross.svg";

const PopupDeleteAccount: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { setIsDeleteAccountPopupOpen, setIsEditProfilePopupOpen } =
    useContext(PopupContext);
  const { isAccountDeleted, isLoading } = useAppSelector((state) => state.user);

  const { handleSubmit } = useForm();

  const handleCloseClick = () => {
    dispatch(resetDeleteUserAccountError());
    setIsDeleteAccountPopupOpen(false);
  };

  const handleSub = () => {
    dispatch(deleteUserAccount());
  };

  useEffect(() => {
    if (isAccountDeleted) {
      dispatch(resetWalletState());
      dispatch(resetCategoryState());
      dispatch(resetTransactionState());
      dispatch(resetStatisticsState());
      dispatch(resetUserState());
      dispatch(setIsAccountDeleted(true));
      handleCloseClick();
      setIsEditProfilePopupOpen(false);
      navigate("/welcome");
    }
  }, [isAccountDeleted]);

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
    <PopupWrapper zIndex="6" onClick={handleCloseClick}>
      <Box onClick={(event) => event.stopPropagation()}>
        <Box>
          <Typography as="h2" fw="600" fz="22px" mb="25px">
            Видалення аккаунту
          </Typography>
          <Box width="556px" fz="16px" lh="150%" mr="0px">
            Ви збираєтесь видалити свій обліковий запис, цей процес <br />
            незворотній і всі ваші дані та інформація будуть втрачені.
            <br /> <br />
            Підтвердіть операцію.
          </Box>
          <Form onSubmit={handleSubmit(handleSub)}>
            <Box
              display="flex"
              width="100%"
              justifyContent="space-between"
              pt="25px">
              <Button
                type="submit"
                width="262px"
                primary
                onClick={handleSub}
                disabled={isLoading}>
                Видалити аккаунт
              </Button>
              <Button
                type="reset"
                width="262px"
                secondary
                onClick={handleCloseClick}>
                Скасувати
              </Button>
            </Box>
          </Form>
        </Box>
        <Button secondary onClick={handleCloseClick} p="12px 20px">
          <CrossIcon />
        </Button>
      </Box>
    </PopupWrapper>
  );
};

export default PopupDeleteAccount;
