import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setActiveCategory,
  setEditCategoryData,
  setIsEditCategoryOpen,
} from "../../../store/categorySlice";

import useFilterButtonOptions from "../../../shared/hooks/useFilterButtonOptions";

import { Box } from "../../atoms/box/Box.styled";
import { ButtonTransparent } from "../../atoms/button/ButtonTransparent.styled";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import Category from "../../molecules/category/Category";
import TabFilter from "../../molecules/tabs/filter/TabFilter";

import COLORS from "../../../shared/styles/variables";

import { ICategory } from "../../../../types/category";

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();

  const { categories, filterByTypeOfOutlay } = useAppSelector(
    (state) => state.category
  );

  const filterButtons = useFilterButtonOptions("category");

  const onCategoryClick = (category: ICategory) => {
    dispatch(setActiveCategory(category));
    dispatch(setEditCategoryData(category));
    dispatch(setIsEditCategoryOpen(true));
  };

  const categoriesData = (): ICategory[] => {
    switch (filterByTypeOfOutlay) {
      case "all":
        return categories.all;
      case "expense":
        return categories.expense;
      case "income":
        return categories.income;
      default:
        break;
    }
  };

  return (
    <Box grow="1" display="flex" direction="column">
      <Box display="flex" alignItems="center" mb="20px">
        <Typography as="h2" grow="1" fz="22px" fw="600">
          Категорії
        </Typography>
        <Typography
          as="span"
          mr="10px"
          fw="600"
          fz="12px"
          color={COLORS.DARK_FOR_TEXT}>
          Відобразити
        </Typography>
        <TabFilter filterButtons={filterButtons} />
      </Box>

      <Box
        display="flex"
        direction="column"
        bgColor={COLORS.BASE_2}
        borderRadius="16px"
        grow="1"
        overflow="auto"
        height="100px"
        p="15px">
        <List gap="8px" display="flex" direction="column">
          {categoriesData()?.map((category, index) => (
            <ListItem key={index}>
              <ButtonTransparent
                width="100%"
                onClick={() => onCategoryClick(category)}
                borderRadius="8px">
                <Category category={category} />
              </ButtonTransparent>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Categories;
