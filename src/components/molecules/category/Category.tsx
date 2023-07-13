import { useAppSelector } from "../../../store/hooks";

import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { CategoryWrapper } from "./CategoryWrapper";

import IncomeIcon from "../../../shared/assets/icons/income.svg";
import ExpenseIcon from "../../../shared/assets/icons/expense.svg";

import COLORS from "../../../shared/styles/variables";

import { ICategory } from "../../../../types/category";

type CategoryProps = {
  category: ICategory;
};

const Category: React.FC<CategoryProps> = ({ category }) => {
  const { activeCategory } = useAppSelector((state) => state.category);

  const isActive = category?.id === activeCategory?.id;
  const isIncome = category?.type_of_outlay === "income";

  return (
    <CategoryWrapper bgColor={isActive ? COLORS.PRIMARY : COLORS.WHITE}>
      <Box grow="1">
        <Typography
          as="h5"
          fw="600"
          fz="16px"
          color={isActive ? COLORS.WHITE : COLORS.DARK_FOR_TEXT}>
          {category.title}
        </Typography>
      </Box>

      <Box
        display="flex"
        direction="column"
        alignItems="center"
        p="3px 6px"
        bgColor={COLORS.WHITE}
        borderRadius="6px">
        <Box display="flex" alignItems="center">
          <Typography
            as="span"
            color={isIncome ? COLORS.GREEN : COLORS.ALERT_1}
            textAlign="right"
            fz="14px"
            fw="600"
            mr="6px">
            {isIncome ? "Надходження" : "Витрата"}
          </Typography>
          {isIncome ? <IncomeIcon /> : <ExpenseIcon />}
        </Box>
      </Box>
    </CategoryWrapper>
  );
};

export default Category;
