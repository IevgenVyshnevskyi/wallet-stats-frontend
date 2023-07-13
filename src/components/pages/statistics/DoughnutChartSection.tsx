import { useRef, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setTotalIncomes,
  setTotalExpenses,
} from "../../../store/categorySlice";

import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import DoughnutChart from "../../molecules/charts/DoughnutChart";

import { calculateCategoriesWithTotalAmount } from "../../../shared/utils/statistics/calculateCategoriesWithTotalAmount";
import { calculateTotalAmount } from "../../../shared/utils/statistics/calculateTotalAmount";

import COLORS from "../../../shared/styles/variables";

import { ICategoryWithTotalAmount } from "../../../../types/category";

const DoughnutChartsSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const { incomesChart, expensesChart, isLoading } = useAppSelector(
    (state) => state.statistics
  );

  const incomesLabels = useRef<string[]>(null);
  const expensesLabels = useRef<string[]>(null);

  const incomesData = useRef<any>(null);
  const expensesData = useRef<any>(null);

  const incomeCategoriesWithTotalAmount =
    useRef<ICategoryWithTotalAmount[]>(null);
  const expenseCategoriesWithTotalAmount =
    useRef<ICategoryWithTotalAmount[]>(null);

  const totalIncomesAmount: string = calculateTotalAmount(
    incomesChart?.allTransactions
  );
  const totalExpensesAmount: string = calculateTotalAmount(
    expensesChart?.allTransactions
  );

  useEffect(() => {
    if (incomesChart.categories && incomesChart.allTransactions) {
      incomeCategoriesWithTotalAmount.current =
        calculateCategoriesWithTotalAmount(
          incomesChart.categories,
          incomesChart.allTransactions
        );

      incomesLabels.current = incomeCategoriesWithTotalAmount.current.map(
        (c) => c.title
      );
      incomesData.current = incomeCategoriesWithTotalAmount.current.map(
        (c) => c.totalAmount
      );
    }
  }, [incomesChart.categories, incomesChart.allTransactions]);

  useEffect(() => {
    if (expensesChart.categories && expensesChart.allTransactions) {
      expenseCategoriesWithTotalAmount.current =
        calculateCategoriesWithTotalAmount(
          expensesChart.categories,
          expensesChart.allTransactions
        );

      expensesLabels.current = expenseCategoriesWithTotalAmount.current.map(
        (c) => c.title
      );
      expensesData.current = expenseCategoriesWithTotalAmount.current.map(
        (c) => c.totalAmount
      );
    }
  }, [expensesChart.categories, expensesChart.allTransactions]);

  useEffect(() => {
    if (!isLoading) {
      if (incomesChart.allTransactions) {
        dispatch(setTotalIncomes(totalIncomesAmount));
      }
      if (expensesChart.allTransactions) {
        dispatch(setTotalExpenses(totalExpensesAmount));
      }
    }
  }, [incomesChart.allTransactions, expensesChart.allTransactions, isLoading]);

  return (
    <Box
      display="flex"
      gap="32px"
      pb="20px"
      mb="20px"
      borderBottom={`2px solid ${COLORS.DIVIDER}`}>
      <Box display="flex" direction="column" borderRadius="16px" grow="1">
        <Box display="flex" mb="20px">
          <Typography as="h3" fz="16px" fw="500" mr="12px">
            Витрати:
          </Typography>
          <Typography as="span" fz="16px" fw="600">
            {expensesChart.totalAmount} ₴
          </Typography>
        </Box>
        <DoughnutChart
          labels={expensesLabels.current}
          data={expensesData.current}
        />
      </Box>
      <Box display="flex" direction="column" borderRadius="16px" grow="1">
        <Box display="flex" mb="20px">
          <Typography as="h3" fz="16px" fw="500" mr="12px">
            Надходження:
          </Typography>
          <Typography as="span" fz="16px" fw="600">
            {incomesChart.totalAmount} ₴
          </Typography>
        </Box>
        <DoughnutChart
          labels={incomesLabels.current}
          data={incomesData.current}
        />
      </Box>
    </Box>
  );
};

export default DoughnutChartsSection;
