import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import { Box } from "../../atoms/box/Box.styled";
import { ButtonTransparent } from "../../atoms/button/ButtonTransparent.styled";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import Category from "../../molecules/category/Category";
import TabFilter from "../../molecules/tabs/filter/TabFilter";

import { BASE_2, DARK_FOR_TEXT } from "../../../shared/styles/variables";

import { IFilterButton } from "../../molecules/tabs/filter/TabFilter";
import { ICategory } from "../../../store/types";

import {
  getFilteredCategories,
  setActiveCategory,
  setEditCategoryData,
  setFilterByTypeOfOutlay,
  setIsEditCategoryOpen
} from "../../../store/categorySlice";

const Categories: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    categories,
    filterByTypeOfOutlay
  } = useAppSelector(state => state.category);

  const filterButtons: IFilterButton[] = [
    {
      buttonName: 'Всі категорії',
      filterBy: "",
      onTabClick: () => {
        dispatch(setFilterByTypeOfOutlay("all"));
        dispatch(getFilteredCategories(""))
      },
      isActive: filterByTypeOfOutlay === "all"
    },
    {
      buttonName: "Витрати",
      filterBy: '?type_of_outlay=expense',
      onTabClick: () => {
        dispatch(setFilterByTypeOfOutlay("expense"));
        dispatch(getFilteredCategories("?type_of_outlay=expense"))
      },
      isActive: filterByTypeOfOutlay === "expense"
    },
    {
      buttonName: "Надходження",
      filterBy: '?type_of_outlay=income',
      onTabClick: () => {
        dispatch(setFilterByTypeOfOutlay("income"));
        dispatch(getFilteredCategories("?type_of_outlay=income"))
      },
      isActive: filterByTypeOfOutlay === "income"
    },
  ];

  const onCategoryClick = (category: ICategory) => {
    dispatch(setActiveCategory(category));
    dispatch(setEditCategoryData(category));
    dispatch(setIsEditCategoryOpen(true));
  }

  const categoriesData = (): ICategory[] => {
    if (filterByTypeOfOutlay === "all") {
      return categories.all;
    } else if (filterByTypeOfOutlay === "expense") {
      return categories.expense;
    } else if (filterByTypeOfOutlay === "income") {
      return categories.income;
    }
  }

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
          color={DARK_FOR_TEXT}
        >
          Відобразити
        </Typography>
        <TabFilter filterButtons={filterButtons} />
      </Box>

      <Box
        display="flex"
        direction="column"
        bgColor={BASE_2}
        borderRadius="16px"
        grow="1"
        overflow="auto"
        height="100px"
        p="15px"
      >
        <List gap="8px" display="flex" direction="column">
          {categoriesData()?.map((category, index) => (
            <ListItem key={index}>
              <ButtonTransparent
                width="100%"
                onClick={() => onCategoryClick(category)}
                borderRadius="8px"
              >
                <Category category={category} />
              </ButtonTransparent>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default Categories;