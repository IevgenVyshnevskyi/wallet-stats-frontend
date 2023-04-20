import { MENU_BUTTON_HOVER, WHITE } from "../../../shared/styles/variables";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { Label } from "../../atoms/label/Label.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import TabSwitch, { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";
import { isDev } from "../../../consts/consts";

import {
  categoryAction,
  resetActiveCategoryState,
  setActiveCategory,
  setEditCategoryData,
  setIsEditCategoryOpen
} from "../../../store/categorySlice";
import { Input } from "../../atoms/input/Input.styled";

const EditCategory: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    categories,
    activeCategory,
    editCategoryData,
  } = useAppSelector(state => state.category)

  const isValid = Object.keys(editCategoryData)?.length >= 3

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

  function handleEditCategory() {
    const editCategoryDataNoId = { ...editCategoryData };
    delete editCategoryDataNoId.id;

    dispatch(setIsEditCategoryOpen(false));
    dispatch(resetActiveCategoryState({}))
    dispatch(categoryAction({
      data: editCategoryDataNoId,
      method: "PUT",
      id: String(editCategoryData?.id)
    }));
  }

  function handleCancelEditCategory() {
    dispatch(setIsEditCategoryOpen(false));
    dispatch(resetActiveCategoryState({}));
  }

  function handleDeleteCategory() {
    dispatch(setIsEditCategoryOpen(false));
    dispatch(categoryAction({
      data: activeCategory,
      method: "DELETE",
      id: String(activeCategory?.id)
    }));
    dispatch(setActiveCategory({}));
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setEditCategoryData({ title: e.target.value }))
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
      <Box bgColor={MENU_BUTTON_HOVER} borderRadius="16px" p="15px">
        <Box display="flex" direction="column">
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
          <Box mb="25px">
            <Label fw="500" htmlFor="name" mb="12px">Назва категорії</Label>
            <Input type="text" id="name" onChange={onInputChange} width="93%" bgColor={WHITE} />
          </Box>
        </Box>
        <Box display="flex" gap="8px" mb="27px">
          <Button
            primary
            width="100%"
            disabled={!isValid}
            onClick={handleEditCategory}
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