import { useContext, useEffect } from "react";

import { useForm } from "react-hook-form";

import { PopupContext } from "../../../../contexts/PopupContext";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import {
  changeUserProfile,
  resetProfileEditErrors,
  setSuccessStatus,
} from "../../../../store/userSlice";

import { nameFieldRules } from "../../../../shared/utils/field-rules/name";

import { userDataParsed } from "../../../../api/api";

import { Form } from "../../../atoms/form/Form.styled";
import { Box } from "../../../atoms/box/Box.styled";
import { Button } from "../../../atoms/button/Button.styled";
import BaseField from "../../base-field/BaseField";

import COLORS from "../../../../shared/styles/variables";

import { IUser } from "../../../../../types/user";

const EditProfileTab: React.FC = () => {
  const dispatch = useAppDispatch();

  const { setIsEditProfilePopupOpen } = useContext(PopupContext);

  const { isProfileChanged, isLoading, user } = useAppSelector(
    (state) => state.user
  );

  const handleCloseClick = () => {
    dispatch(resetProfileEditErrors());
    setIsEditProfilePopupOpen(false);
  };

  const handleSubmitChangeProfile = (data: IUser) => {
    dispatch(changeUserProfile(data));
  };

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({ mode: "all" });

  useEffect(() => {
    if (isProfileChanged) {
      dispatch(setSuccessStatus(false));
      handleCloseClick();
    }
  }, [isProfileChanged]);

  return (
    <Form onSubmit={handleSubmit(handleSubmitChangeProfile)}>
      <BaseField
        fieldType="text"
        label="Ім'я"
        name="first_name"
        errors={errors}
        registerOptions={register("first_name", nameFieldRules)}
        defaultValue={user?.first_name || userDataParsed?.first_name}
        width="325px"
      />
      <BaseField
        fieldType="text"
        label="Прізвище"
        name="last_name"
        errors={errors}
        registerOptions={register("last_name", nameFieldRules)}
        defaultValue={user?.last_name || userDataParsed?.last_name}
        width="325px"
      />
      <BaseField
        fieldType="email"
        label="Пошта"
        name="email"
        errors={errors}
        disabled
        defaultValue={user?.email || userDataParsed?.email}
        width="325px"
      />

      <Box
        display="flex"
        justifyContent="center"
        gap="35px"
        borderTop={`2px solid ${COLORS.DIVIDER}`}
        pt="24px"
        mb="24px">
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          primary
          width="100%">
          Зберегти
        </Button>
        <Button type="reset" secondary width="100%" onClick={handleCloseClick}>
          Скасувати
        </Button>
      </Box>
    </Form>
  );
};

export default EditProfileTab;
