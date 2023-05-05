import { useEffect, useRef, useState } from "react";

import { BASE_2, DARK_FOR_TEXT, DIVIDER, WHITE } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import Header from '../../molecules/header/Header';
import TabFilter, { IFilterButton } from "../../molecules/tabs/filter/TabFilter";
import { StatisticsPageWrapper } from "./StatisticsPage.styled";
import DoughnutChart from './../../molecules/charts/DoughnutChart';
import Select from "../../molecules/select/Select";
import LineChart from "../../molecules/charts/LineChart";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFilteredTransactions, getTransactions } from "../../../store/transactionSlice";
import { setActiveCategoryId, setFilterByDays, setTotalExpenses, setTotalIncomes } from "../../../store/statisticsSlice";
import { getCategories, getFilteredCategories } from "../../../store/categorySlice";
import { token } from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { ICategory } from "../../../store/types";

const StatisticsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categories } = useAppSelector(state => state.category);
  const { isLoggedIn, isRegistered } = useAppSelector(state => state.user);
  const { allOutlaysChart, filterByDays } = useAppSelector(state => state.statistics);

  if (!token && !isRegistered && !isLoggedIn) {
    navigate("/welcome")
  }

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getTransactions())
    dispatch(getFilteredCategories("?type_of_outlay=income"))
    dispatch(getFilteredCategories("?type_of_outlay=expense"))
    dispatch(getFilteredTransactions(`?type_of_outlay=income&days=${filterByDays}`));
    dispatch(getFilteredTransactions(`?type_of_outlay=expense&days=${filterByDays}`));
  }, []);

  useEffect(() => {
    if (categories.all?.length > 0 && !allOutlaysChart?.activeCategoryId) {
      dispatch(getFilteredTransactions(`?category=${categories?.all[0]?.id}`))
    }
  }, [categories.all]);

  return (
    <StatisticsPageWrapper>
      <Header />

      <Box m="0 36px 24px" display="flex" grow="1" direction="column">
        <StatisticsHeader />
        <Box p="15px" bgColor={BASE_2} borderRadius="16px" grow="1">
          <DoughnutChartsSection />
          <LineChartSection />
        </Box>
      </Box>
    </StatisticsPageWrapper>
  );
}

const StatisticsHeader: React.FC = () => {
  const dispatch = useAppDispatch();

  const { filterByDays } = useAppSelector(state => state.statistics);

  const filterButtons: IFilterButton[] = [
    {
      buttonName: '1 місяць',
      filterBy: "?days=30",
      onTabClick: () => {
        if (filterByDays === "30") return;
        dispatch(setFilterByDays("30"));
        dispatch(getFilteredTransactions("?type_of_outlay=expense&days=30"));
        dispatch(getFilteredTransactions("?type_of_outlay=income&days=30"));
      },
      isActive: filterByDays === "30"
    },
    {
      buttonName: "3 місяці",
      filterBy: '?days=90',
      onTabClick: () => {
        if (filterByDays === "90") return;
        dispatch(setFilterByDays("90"));
        dispatch(getFilteredTransactions("?type_of_outlay=expense&days=90"));
        dispatch(getFilteredTransactions("?type_of_outlay=income&days=90"));
      },
      isActive: filterByDays === "90"
    },
    {
      buttonName: "Півроку",
      filterBy: '?days=180',
      onTabClick: () => {
        if (filterByDays === "180") return;
        dispatch(setFilterByDays("180"));
        dispatch(getFilteredTransactions("?type_of_outlay=expense&days=180"));
        dispatch(getFilteredTransactions("?type_of_outlay=income&days=180"));
      },
      isActive: filterByDays === "180"
    },
  ];

  return (
    <Box display="flex" alignItems="center" mb="20px">
      <Typography as="h2" grow="1" fz="22px" fw="600">
        Статистика за всіма категоріями
      </Typography>
      <Typography
        as="span"
        mr="10px"
        fw="600"
        fz="12px"
        color={DARK_FOR_TEXT}
      >
        Відобразити дані за період
      </Typography>
      <TabFilter filterButtons={filterButtons} />
    </Box>
  );
}

interface ICategoryWithTotalAmount extends ICategory {
  totalAmount: number;
}

const DoughnutChartsSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const { incomesChart, expensesChart, isLoading } = useAppSelector(state => state.statistics);

  const incomesLabels = useRef<string[]>(null);
  const expensesLabels = useRef<string[]>(null);

  const incomesData = useRef<any>(null);
  const expensesData = useRef<any>(null);

  const incomeCategoriesWithTotalAmount = useRef<ICategoryWithTotalAmount[]>(null);
  const expenseCategoriesWithTotalAmount = useRef<ICategoryWithTotalAmount[]>(null);

  useEffect(() => {
    if (incomesChart.categories && incomesChart.allTransactions) {
      incomeCategoriesWithTotalAmount.current = incomesChart.categories
        .flatMap((category) => {
          const transactionsForCategory = Object.values(incomesChart.allTransactions)
            .flat()
            .filter(
              (transaction) =>
                parseFloat(transaction.amount_of_funds) > 0 &&
                transaction.category === category.id
            );
          if (!transactionsForCategory || transactionsForCategory.length === 0) {
            return [];
          }
          const totalAmount = transactionsForCategory.reduce(
            (sum, transaction) =>
              sum + parseFloat(transaction.amount_of_funds),
            0
          );
          return {
            id: category.id,
            title: category.title,
            type_of_outlay: category.type_of_outlay,
            owner: category.owner,
            totalAmount,
          };
        })
        .filter((category) => category.totalAmount > 0);

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
      expenseCategoriesWithTotalAmount.current = expensesChart.categories
        .flatMap((category) => {
          const transactionsForCategory = Object.values(expensesChart.allTransactions)
            .flat()
            .filter(
              (transaction) =>
                parseFloat(transaction.amount_of_funds) > 0 &&
                transaction.category === category.id
            );
          if (!transactionsForCategory || transactionsForCategory.length === 0) {
            return [];
          }
          const totalAmount = transactionsForCategory.reduce(
            (sum, transaction) =>
              sum + parseFloat(transaction.amount_of_funds),
            0
          );
          return {
            id: category.id,
            title: category.title,
            type_of_outlay: category.type_of_outlay,
            owner: category.owner,
            totalAmount,
          };
        })
        .filter((category) => category.totalAmount > 0);

      expensesLabels.current = expenseCategoriesWithTotalAmount.current.map(c => {
        return c.title
      })
      expensesData.current = expenseCategoriesWithTotalAmount.current.map(c => {
        return c.totalAmount
      })
    }
  }, [expensesChart.categories, expensesChart.allTransactions])

  const totalIncomesAmount: string = Object.values(incomesChart?.allTransactions)
    .map((transactionsArr) => transactionsArr.reduce((sum, transaction) => {
      return sum += parseFloat(transaction.amount_of_funds)
    }, 0))
    .reduce((sum, t) => sum + t, 0)
    .toFixed(2);

  const totalExpensesAmount: string = Object.values(expensesChart?.allTransactions)
    ?.map((transactionsArr) => transactionsArr?.reduce((sum, transaction) => {
      return sum += parseFloat(transaction?.amount_of_funds)
    }, 0))
    .reduce((sum, t) => sum + t, 0)
    .toFixed(2);

  useEffect(() => {
    if (isLoading === false) {
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
      borderBottom={`2px solid ${DIVIDER}`}
    >
      <Box display="flex" direction="column" borderRadius="16px" grow="1">
        <Box display="flex" mb="20px" >
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
}

const LineChartSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    filterByDays,
    allOutlaysChart,
  } = useAppSelector(state => state.statistics);
  const { categories } = useAppSelector(state => state.category);

  const selectedCategory = categories.all.find((c) => c.id === allOutlaysChart.activeCategoryId)

  const [selectedCategoryValues, setSelectedCategoryValues] = useState<any>({
    value: selectedCategory?.id,
    label: selectedCategory?.title,
  });

  const options: any = categories.all?.map(({ id, title }) => {
    return { value: id, label: title }
  })

  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    const newChartData: number[] = new Array(parseInt(filterByDays)).fill(0);

    Object.entries(allOutlaysChart.categoryTransactions)?.forEach(([dateStr, transactionsArr]) => {
      const targetDate = new Date(dateStr);
      const currentDate = new Date();

      const diffInTime = targetDate.getTime() - currentDate.getTime();
      const diffInDays = Math.abs(Math.ceil(diffInTime / (1000 * 60 * 60 * 24)));

      const totalAmount = transactionsArr.reduce((acc, transaction) => acc + parseInt(transaction.amount_of_funds), 0);
      newChartData[diffInDays] = totalAmount;
    });

    setChartData(newChartData);
  }, [allOutlaysChart?.categoryTransactions]);

  useEffect(() => {
    if (!allOutlaysChart?.activeCategoryId) {
      setSelectedCategoryValues({
        value: categories.all[0]?.id,
        label: categories.all[0]?.title
      })
      dispatch(setActiveCategoryId(categories.all[0]?.id))
    }
  }, [categories.all]);

  useEffect(() => {
    if (allOutlaysChart?.activeCategoryId) {
      dispatch(getFilteredTransactions(
        `?category=${allOutlaysChart?.activeCategoryId}&days=${filterByDays}`
      ))
    }
  }, [allOutlaysChart?.activeCategoryId, filterByDays]);

  function onCategoryChange(e: any): void {
    setSelectedCategoryValues({ value: e.value, label: e.label })
    dispatch(setActiveCategoryId(e.value))
    dispatch(getFilteredTransactions(
      `?category=${e.value}&days=${filterByDays}`
    ))
  }

  return (
    <Box display="flex" direction="column">
      <Box display="flex" alignItems="center" gap="16px" mb="16px" zIndex="7">
        <Typography as="h3" fz="16px" fw="500">
          Витрати або надходження за категорією
        </Typography>
        <Select
          width="450px"
          options={options}
          value={selectedCategoryValues}
          onCategoryChange={onCategoryChange}
        />
      </Box>
      <Box borderRadius="8px" bgColor={WHITE} p="15px" grow="1">
        <LineChart data={chartData} />
      </Box>
    </Box>
  );
}

export default StatisticsPage;