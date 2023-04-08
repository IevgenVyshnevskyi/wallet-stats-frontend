import { Typography } from "../../atoms/typography/Typography.styled";
import IncomeIcon from "../../../shared/assets/icons/income.svg"
import ExpenseIcon from "../../../shared/assets/icons/expense.svg"
import { GREEN, WHITE, ALERT_1 } from './../../../shared/styles/variables';
import { Box } from "../../atoms/box/Box.styled";
import { CategoryProps } from "../../../../types/molecules";

const Category: React.FC<CategoryProps> = ({ category }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap="16px"
      borderRadius="8px"
      bgColor={WHITE}
      p="16px"
      mb="8px"
    >
      <Box grow="1">
        <Typography
          as="h5"
          fw="600"
          fz="16px"
        >
          {category.title}
        </Typography>
      </Box>

      <Box
        display="flex"
        direction="column"
        alignItems="center"
      >
        <Box display="flex" alignItems="center">
          <Typography
            as="span"
            color={category.type_of_outlay === "income"
              ? GREEN
              : ALERT_1
            }
            textAlign="right"
            fz="14px"
            fw="600"
            mr="6px"
          >
            {category.type_of_outlay === "income"
              ? "Надходження"
              : "Витрата"
            }
          </Typography>
          {category.type_of_outlay === "income"
            ? <IncomeIcon />
            : <ExpenseIcon />
          }
        </Box>
      </Box>
    </Box>
  );
}

export default Category;