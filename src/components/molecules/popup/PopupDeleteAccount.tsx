import React, { useContext/*, useEffect*/ } from "react";
import { useForm } from "react-hook-form";
import { PopupContext } from "../../../contexts/PopupContext";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from '../../atoms/button/Button.styled';
import CrossIcon from './../../../shared/assets/icons/cross.svg';
import { PopupWrapper } from "./Popup.styled";
import { Typography } from '../../atoms/typography/Typography.styled';
import { Form } from "../../atoms/form/Form.styled";
import { deleteUserAccount, resetDeleteUserAccountError } from "../../../store/userSlice";
import { useNavigate } from 'react-router-dom';


const PopupDeleteAccount: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { setIsDeleteAccountPopupOpen } = useContext(PopupContext);

    const {
        /*deleteUserAccountError,*/

    } = useAppSelector(state => state.user);

    const {
        handleSubmit,
    } = useForm();

    const handleCloseClick = () => {
        dispatch(resetDeleteUserAccountError());
        setIsDeleteAccountPopupOpen(false);
    };

    /*useEffect(() => {
        if (isEditWalletSuccess || isDeleteWalletSuccess) {
            handleCloseClick()
        }
    }, [isEditWalletSuccess, isDeleteWalletSuccess]);*/

    function handleSub() {
        dispatch(deleteUserAccount());
        setIsDeleteAccountPopupOpen(false);
        navigate('/')
    }

    return (
        <PopupWrapper zIndex="6">
            <Box>
                <Box>
                    <Typography as="h2" fw="600" fz="22px" mb="25px">
                        Видалення аккаунту
                    </Typography>
                    <Box width="556px" fz="16px" lh="150%" mr="0px">Ви збираєтесь видалити свій обліковий запис, цей
                        процес <br />
                        незворотній і всі ваші дані та інформація будуть втрачені.<br />
                        <br />
                        Підтвердіть операцію.</Box>
                    <Form onSubmit={handleSubmit(handleSub)}>
                        <Box
                            display="flex"
                            width="100%"
                            justifyContent="space-between"
                            pt="25px"
                        >
                            <Button type="submit" width="262px" primary onClick={handleSub}>
                                Видалити аккаунт
                            </Button>
                            <Button type="reset" width="262px" secondary onClick={handleCloseClick}>
                                Скасувати
                            </Button>
                        </Box>
                    </Form>

                    {/*{deleteUserAccountError && <Typography as="p" color={ALERT_1}>{deleteUserAccountError}</Typography>}*/}
                </Box>
                <Button secondary onClick={handleCloseClick} p="12px 20px">
                    <CrossIcon />
                </Button>
            </Box>
        </PopupWrapper>
    );
}

export default PopupDeleteAccount;