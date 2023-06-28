import { useRef, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setTotalIncomes, setTotalExpenses } from "../../../store/categorySlice";

import { calculateTotalAmount } from "../../../shared/utils/statistics/calculateTotalAmount";
import {
  calculateCategoriesWithTotalAmount
} from "../../../shared/utils/statistics/calculateCategoriesWithTotalAmount";

import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import DoughnutChart from "../../molecules/charts/DoughnutChart";

import { BASE_2 } from "../../../shared/styles/variables";

import { ICategoryWithTotalAmount } from "../../../store/types";

const Statistics: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    incomesChart,
    expensesChart,
    isLoading
  } = useAppSelector(state => state.statistics);

  const incomesLabels = useRef<string[]>(null);
  const expensesLabels = useRef<string[]>(null);

  const incomesData = useRef<any>(null);
  const expensesData = useRef<any>(null);

  const incomeCategoriesWithTotalAmount = useRef<ICategoryWithTotalAmount[]>(null);
  const expenseCategoriesWithTotalAmount = useRef<ICategoryWithTotalAmount[]>(null);

  const totalIncomesAmount: string = calculateTotalAmount(incomesChart?.allTransactions);
  const totalExpensesAmount: string = calculateTotalAmount(expensesChart?.allTransactions);

  useEffect(() => {
    if (incomesChart.categories && incomesChart.allTransactions) {
      incomeCategoriesWithTotalAmount.current = calculateCategoriesWithTotalAmount(
        incomesChart.categories,
        incomesChart.allTransactions,
      )

      incomesLabels.current = incomeCategoriesWithTotalAmount.current.map(c => {
        return c.title
      })
      incomesData.current = incomeCategoriesWithTotalAmount.current.map(c => {
        return c.totalAmount
      })
    }
  }, [incomesChart.categories, incomesChart.allTransactions]);

  useEffect(() => {
    if (expensesChart.categories && expensesChart.allTransactions) {
      expenseCategoriesWithTotalAmount.current = calculateCategoriesWithTotalAmount(
        expensesChart.categories,
        expensesChart.allTransactions,
      )

      expensesLabels.current = expenseCategoriesWithTotalAmount.current.map(c => {
        return c.title
      })
      expensesData.current = expenseCategoriesWithTotalAmount.current.map(c => {
        return c.totalAmount
      })
    }
  }, [expensesChart.categories, expensesChart.allTransactions])

  useEffect(() => {
    if (!isLoading) {
      if (incomesChart.allTransactions) {
        dispatch(setTotalIncomes(totalIncomesAmount));
      }
      if (expensesChart.allTransactions) {
        dispatch(setTotalExpenses(totalExpensesAmount));
      }
    }
  }, [isLoading, incomesChart.allTransactions, expensesChart.allTransactions]);

  return (
    <Box display="flex" direction="column" width="650px">
      <Typography
        as="h2"
        fz="22px"
        fw="600"
        mb="20px"
      >
        Статистика за останній місяць
      </Typography>
      <Box
        display="flex"
        direction="column"
        bgColor={BASE_2}
        borderRadius="16px"
        overflow="auto"
        height="100px"
        p="15px"
      >
        <Box mb="20px">
          <Box display="flex" justifyContent="space-between">
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              Витрати
            </Typography>
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              {expensesChart.totalAmount} ₴
            </Typography>
          </Box>
          <Box>
            <DoughnutChart
              labels={expensesLabels.current}
              data={expensesData.current}
              isHomePage
            />
          </Box>
        </Box>
        <Box mb="20px">
          <Box display="flex" justifyContent="space-between">
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              Надходження
            </Typography>
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              {incomesChart.totalAmount} ₴
            </Typography>
          </Box>
          <Box>
            <DoughnutChart
              labels={incomesLabels.current}
              data={incomesData.current}
              isHomePage
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Statistics;