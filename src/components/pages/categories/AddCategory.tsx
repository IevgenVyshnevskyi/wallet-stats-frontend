import { BASE_2 } from "../../../shared/styles/variables";
import { categoryAction, setActiveCategory } from "../../../store/categorySlice";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setAddCategoryData } from "../../../store/categorySlice";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import TabSwitch, { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";
import { Label } from "../../atoms/label/Label.styled";
import { Select } from "../../atoms/select/Select.styled";
import { mockCategories } from "../../../../mock-data/categories";
import { Option } from "../../atoms/select/Option.styled";
import { isDev } from "../../../consts/consts";

const AddCategory: React.FC = () => {
  const dispatch = useAppDispatch()

  const { categories, addCategoryData } = useAppSelector(state => state.category);

  const isValid = Object.keys(addCategoryData || {}).length >= 3;

  const switchButtons: ISwitchButton[] = [
    {
      buttonName: 'Витрата',
      onTabClick: () => {
        dispatch(setAddCategoryData({ type_of_outlay: "expense" }));
      },
      isActive: addCategoryData?.type_of_outlay === "expense"
    },
    {
      buttonName: 'Надходження',
      onTabClick: () => {
        dispatch(setAddCategoryData({ type_of_outlay: "income" }));
      },
      isActive: addCategoryData?.type_of_outlay === "income"
    },
  ];

  function handleAddCategory() {
    dispatch(setActiveCategory({}));
    dispatch(categoryAction({ data: addCategoryData, method: "POST" }))
  }

  function onChangeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setAddCategoryData({ category: parseInt(e.target.value) }))
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
        Додати категорію
      </Typography>
      <Box bgColor={BASE_2} borderRadius="16px" p="15px">
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
            <Label fw="500" mb="12px">Назва категорії</Label>
            <Select
              width="100%"
              defaultValue={(isDev ? mockCategories[0] : categories.all[0])?.title}
              onChange={(e) => onChangeCategory(e)}
            >
              {(isDev ? mockCategories : categories.all)?.map(({ title, id }) => (
                <Option key={id} value={id}>{title}</Option>
              ))}
            </Select>
          </Box>
        </Box>
        <Box>
          <Button
            primary
            width="100%"
            disabled={!isValid}
            onClick={handleAddCategory}
          >
            Зберегти
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default AddCategory;