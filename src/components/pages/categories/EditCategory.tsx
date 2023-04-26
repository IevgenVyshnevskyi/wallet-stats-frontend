import { MENU_BUTTON_HOVER, WHITE } from "../../../shared/styles/variables";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { Label } from "../../atoms/label/Label.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import TabSwitch, { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";

import {
  categoryAction,
  resetActiveCategoryState,
  setActiveCategory,
  setEditCategoryData,
  setIsEditCategoryOpen
} from "../../../store/categorySlice";
import { Input } from "../../atoms/input/Input.styled";
import { useForm } from "react-hook-form";
import { Form } from "../../atoms/form/Form.styled";
import { lettersRegex } from "../../../shared/utils/regexes";
import { useEffect } from "react";

const EditCategory: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    activeCategory,
    editCategoryData,
    isLoading
  } = useAppSelector(state => state.category)

  const isValid = Object.keys(editCategoryData || {})?.length >= 2;

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
    clearErrors,
    reset,
  } = useForm({
    mode: "all",
  });

  useEffect(() => {
    clearErrors('title')
    setValue('title', editCategoryData?.title)
  }, [editCategoryData?.title]);

  const switchButtons: ISwitchButton[] = [
    {
      buttonName: 'Витрата',
      onTabClick: () => {
        dispatch(setEditCategoryData({ type_of_outlay: "expense" }));
      },
      isActive: editCategoryData?.type_of_outlay === "expense"
    },
    {
      buttonName: 'Надходження',
      onTabClick: () => {
        dispatch(setEditCategoryData({ type_of_outlay: "income" }));
      },
      isActive: editCategoryData?.type_of_outlay === "income"
    },
  ];

  function handleCancelEditCategory() {
    dispatch(setIsEditCategoryOpen(false));
    dispatch(resetActiveCategoryState({}));
  }

  function handleDeleteCategory() {
    dispatch(setIsEditCategoryOpen(false));
    dispatch(categoryAction({
      method: "DELETE",
      id: String(activeCategory?.id)
    }));
    dispatch(setActiveCategory({}));
  }

  function handleSub(data: { title: string }) {
    const editCategoryDataNoId = {
      ...editCategoryData,
      title: data?.title
    };
    delete editCategoryDataNoId.id;

    dispatch(setIsEditCategoryOpen(false));
    dispatch(resetActiveCategoryState({}))
    dispatch(categoryAction({
      data: editCategoryDataNoId,
      method: "PUT",
      id: String(editCategoryData?.id)
    }));
  }

  return (
    <Box display="flex" direction="column" width="540px">
      <Typography
        as="h2"
        fw="600"
        fz="22px"
        mt="5px"
        mb="30px"
      >
        Редагування категорії
      </Typography>
      <Box
        bgColor={MENU_BUTTON_HOVER}
        display="flex"
        direction="column"
        borderRadius="16px"
        p="15px"
      >
        <Box mb="25px">
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="12px"
          >
            Тип категорії
          </Typography>
          <TabSwitch switchButtons={switchButtons} />
        </Box>
        <Form onSubmit={handleSubmit(handleSub)}>
          <Box mb="25px">
            <Label fw="500" htmlFor="title" mb="12px">
              Назва категорії
            </Label>
            <Input
              type="text"
              id="title"
              width="93%"
              bgColor={WHITE}
              className={errors.title && 'error'}
              {...register('title', {
                required: 'Обов\'язкове поле для заповнення',
                validate: {
                  hasTwoSymbols: (value) => /^.{2,}$/.test(value) || 'Повинно бути не менше 2 символів',
                  hasTwoLetters: (value) => /^[A-Za-zА-Яа-яІіЇїЄєҐґ]+$/.test(value) || 'Повинно бути не менше 2 літер',
                }
              })}
            />
            <Box
              color="red"
              textAlight="left"
              border="red"
              fz="13px"
              height="14px"
              m="0 0 20px 0"
            >
              {errors?.title && <>{errors?.title?.message || 'Error!'}</>}
            </Box>
          </Box>
          <Box display="flex" gap="8px" mb="27px">
            <Button
              primary
              width="100%"
              type="submit"
              disabled={!isValid || !!errors?.title || isLoading}
            >
              Зберегти
            </Button>
            <Button
              secondary
              width="100%"
              onClick={handleCancelEditCategory}>
              Скасувати
            </Button>
          </Box>
        </Form>
        <Box display="flex" justifyContent="flex-end">
          <ButtonLink onClick={handleDeleteCategory}>
            Видалити категорію
          </ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}

export default EditCategory;