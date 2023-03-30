import { Typography } from "../../atoms/typography/Typography.styled";
import IncomeIcon from "../../../shared/assets/icons/income.svg"
import ExpenseIcon from "../../../shared/assets/icons/expense.svg"
import { DARK_FOR_TEXT, GREEN, WHITE, DIVIDER, ALERT_1 } from './../../../shared/styles/variables';
import { Box } from "../../atoms/box/Box.styled";

type TransactionProps = {
  type: "income" | "expense";
}

const Transaction: React.FC<TransactionProps> = ({ type }) => {
  return (
    <Box
      display="flex"
      gap="16px"
      borderRadius="8px"
      bgColor={WHITE}
      p="16px"
      m="0 0 8px 0"
    >
      <Box grow="1">
        <Typography
          as="h4"
          fw="500"
          fz="14px"
          color={DARK_FOR_TEXT}
          m="0 0 16px 0"
        >
          Назва рахунку
        </Typography>
        <Typography
          as="h5"
          fw="600"
          fz="16px"
        >
          Назва категорії
        </Typography>
      </Box>

      <Box
        width="120px"
        display="flex"
        direction="column"
        alignItems="flex-end"
        borderLeft={`2px solid ${DIVIDER}`}
        p="0 0 0 18px"
      >
        <Box display="flex" alignItems="center" m="0 0 15px 0">
          <Typography
            as="span"
            color={type === "income" ? GREEN : ALERT_1}
            textAlign="right"
            fw="600"
            m="0 6px 0 0"
          >
            {type === "income" ? "Надходження" : "Витрата"}
          </Typography>
          {type === "income" ? <IncomeIcon /> : <ExpenseIcon />}
        </Box>

        <Typography
          as="span"
          textAlign="right"
          fz="16px"
          fw="600"
        >
          1 265,35 ₴
        </Typography>
      </Box>
    </Box>
  );
}

export default Transaction;