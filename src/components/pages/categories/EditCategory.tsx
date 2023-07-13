import { useEffect } from "react";

import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import useSwitchButtonOptions from "../../../shared/hooks/useSwitchButtonOptions";
import {
  categoryAction,
  resetActiveCategoryState,
  setActiveCategory,
  setEditCategoryData,
  setIsEditCategoryOpen,
} from "../../../store/categorySlice";

import titleFieldRules from "../../../shared/utils/field-rules/title";

import Box from "../../atoms/box/Box.styled";
import Button from "../../atoms/button/Button.styled";
import ButtonLink from "../../atoms/button/ButtonLink";
import Typography from "../../atoms/typography/Typography.styled";
import Form from "../../atoms/form/Form.styled";
import TabSwitch from "../../molecules/tabs/switch/TabSwitch";
import BaseField from "../../molecules/base-field/BaseField";

import COLORS from "../../../shared/styles/variables";

const EditCategory: React.FC = () => {
  const dispatch = useAppDispatch();

  const { activeCategory, editCategoryData, isLoading } = useAppSelector(
    (state) => state.category
  );

  const isValid = Object.keys(editCategoryData || {})?.length >= 2;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
  } = useForm({ mode: "all" });

  const switchButtons = useSwitchButtonOptions(
    editCategoryData,
    setEditCategoryData
  );

  const handleCancelEditCategory = () => {
    dispatch(setIsEditCategoryOpen(false));
    dispatch(resetActiveCategoryState({}));
  };

  const handleDeleteCategory = () => {
    dispatch(setIsEditCategoryOpen(false));
    dispatch(
      categoryAction({
        method: "DELETE",
        id: String(activeCategory?.id),
      })
    );
    dispatch(setActiveCategory({}));
  };

  const handleSub = (data: { title: string }) => {
    const editCategoryDataNoId = {
      ...editCategoryData,
      title: data?.title,
    };
    delete editCategoryDataNoId.id;

    dispatch(setIsEditCategoryOpen(false));
    dispatch(resetActiveCategoryState({}));
    dispatch(
      categoryAction({
        data: editCategoryDataNoId,
        method: "PUT",
        id: String(editCategoryData?.id),
      })
    );
  };

  useEffect(() => {
    clearErrors("title");
    setValue("title", editCategoryData?.title);
  }, [editCategoryData?.title]);

  return (
    <Box display="flex" direction="column" width="540px">
      <Typography as="h2" fw="600" fz="22px" mt="5px" mb="30px">
        Редагування категорії
      </Typography>
      <Box
        bgColor={COLORS.MENU_BUTTON_HOVER}
        display="flex"
        direction="column"
        borderRadius="16px"
        p="15px">
        <Box mb="25px">
          <Typography as="h3" fz="16px" fw="500" mb="12px">
            Тип категорії
          </Typography>
          <TabSwitch switchButtons={switchButtons} />
        </Box>
        <Form onSubmit={handleSubmit(handleSub)}>
          <BaseField
            fieldType="text"
            label="Назва категорії"
            errors={errors}
            name="title"
            registerOptions={register("title", titleFieldRules)}
          />
          <Box display="flex" gap="8px" mb="27px">
            <Button
              primary
              width="100%"
              type="submit"
              disabled={!isValid || !!errors?.title || isLoading}>
              Зберегти
            </Button>
            <Button secondary width="100%" onClick={handleCancelEditCategory}>
              Скасувати
            </Button>
          </Box>
        </Form>
        <Box display="flex" justifyContent="flex-end">
          <ButtonLink disabled={isLoading} onClick={handleDeleteCategory}>
            Видалити категорію
          </ButtonLink>
        </Box>
      </Box>
    </Box>
  );
};

export default EditCategory;
