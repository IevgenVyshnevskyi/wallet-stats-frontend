import { Typography } from "../../atoms/typography/Typography.styled";
import IncomeIcon from "../../../shared/assets/icons/income.svg"
import ExpenseIcon from "../../../shared/assets/icons/expense.svg"
import { GREEN, WHITE, ALERT_1, PRIMARY, DARK_FOR_TEXT } from './../../../shared/styles/variables';
import { Box } from "../../atoms/box/Box.styled";
import { CategoryProps } from "../../../../types/molecules";
import { useAppSelector } from "../../../store/hooks";
import { CategoryWrapper } from "./CategoryWrapper";

const Category: React.FC<CategoryProps> = ({ category }) => {
  const { activeCategory } = useAppSelector(state => state.category)

  const isActive = category?.id === activeCategory?.id;
  const isIncome = category?.type_of_outlay === "income";

  return (
    <CategoryWrapper
      display="flex"
      alignItems="center"
      gap="16px"
      borderRadius="8px"
      bgColor={isActive ? PRIMARY : WHITE}
      width="100%"
      p="16px"
      mb="8px"
    >
      <Box grow="1">
        <Typography
          as="h5"
          fw="600"
          fz="16px"
          color={isActive ? WHITE : DARK_FOR_TEXT}
        >
          {category.title}
        </Typography>
      </Box>

      <Box
        display="flex"
        direction="column"
        alignItems="center"
        p="3px 6px"
        bgColor={WHITE}
        borderRadius="6px"
      >
        <Box display="flex" alignItems="center">
          <Typography
            as="span"
            color={isIncome ? GREEN : ALERT_1}
            textAlign="right"
            fz="14px"
            fw="600"
            mr="6px"
          >
            {isIncome ? "Надходження" : "Витрата"}
          </Typography>
          {isIncome ? <IncomeIcon /> : <ExpenseIcon />}
        </Box>
      </Box>
    </CategoryWrapper>
  );
}

export default Category;