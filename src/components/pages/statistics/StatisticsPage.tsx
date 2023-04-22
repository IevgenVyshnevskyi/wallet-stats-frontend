import { useEffect } from "react";

import { BASE_2, DARK_FOR_TEXT, DIVIDER, WHITE } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import Header from '../../molecules/header/Header';
import TabFilter, { IFilterButton } from "../../molecules/tabs/filter/TabFilter";
import { StatisticsPageWrapper } from "./StatisticsPage.styled";
import DoughnutChart from './../../molecules/charts/DoughnutChart';
import { Select } from "../../atoms/select/Select.styled";
import { Option } from "../../atoms/select/Option.styled";
import LineChart from "../../molecules/charts/LineChart";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getFilteredTransactions, getTransactions } from "../../../store/transactionSlice";
import { mockCategories } from "../../../../mock-data/categories";
import { setActiveCategory, setFilterByDays, setTotalExpenses, setTotalIncomes } from "../../../store/statisticsSlice";
import { isDev } from "../../../consts/consts";
import { getCategories, getFilteredCategories } from "../../../store/categorySlice";
import { mockData, mockLabels } from "../../../../mock-data/doughnutCharts";
import { mockTransactions } from "../../../../mock-data/transactions";
import { token } from "../../../api/api";
import { useNavigate } from "react-router-dom";

const StatisticsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { incomesChart } = useAppSelector(state => state.statistics);
  const { categories } = useAppSelector(state => state.category);
  const { isLoggedIn, isRegistered } = useAppSelector(state => state.user);

  if (!token && !isRegistered && !isLoggedIn) {
    navigate("/")
  }

  useEffect(() => {
    dispatch(getCategories())
    dispatch(getTransactions())

    // if (incomesChart.categories.length === 0) {
    dispatch(getFilteredCategories("?type_of_outlay=income"))
    dispatch(getFilteredCategories("?type_of_outlay=expense"))
    // }

    dispatch(getFilteredTransactions("?type_of_outlay=expense&days=30"));
    dispatch(getFilteredTransactions("?type_of_outlay=income&days=30"));
  }, []);

  useEffect(() => {
    if (categories.all?.length > 0) {
      dispatch(getFilteredTransactions(`?category=${categories?.all[0]?.id}`))
    }
  }, [categories.all]);

  return (
    <StatisticsPageWrapper>
      <Header />

      <Box m="0 20px 36px" display="flex" grow="1" direction="column">
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

const DoughnutChartsSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    incomesChart,
    expensesChart,
  } = useAppSelector(state => state.statistics);

  const incomesData: string[] = Object.values(incomesChart?.transactions)
    .flatMap(transactionsArr => transactionsArr.map(transaction => {
      return transaction.amount_of_funds
    }));
  const expensesData: string[] = Object.values(expensesChart?.transactions)
    .flatMap(transactionsArr => transactionsArr.map(transaction => {
      return transaction.amount_of_funds
    }));

  const incomesLabels: string[] = incomesChart.categories?.map(c => c.title);
  const expensesLabels: string[] = expensesChart.categories?.map(c => c.title);

  useEffect(() => {
    const totalIncomesAmount: string = Object.values(incomesChart?.transactions)
      .map((transactionsArr) => transactionsArr.reduce((sum, transaction) => {
        console.log('transaction in totalIncomesAmount', totalIncomesAmount)
        return sum += parseFloat(transaction.amount_of_funds)
      }, 0))
      .reduce((sum, t) => sum + t, 0)
      .toFixed(2);
    console.log(totalIncomesAmount)

    const totalExpensesAmount: string = Object.values(expensesChart?.transactions)
      .map((transactionsArr) => transactionsArr.reduce((sum, transaction) => {
        return sum += parseFloat(transaction.amount_of_funds)
      }, 0))
      .reduce((sum, t) => sum + t, 0)
      .toFixed(2);

    dispatch(setTotalIncomes(totalIncomesAmount))
    dispatch(setTotalExpenses(totalExpensesAmount))
  }, []);

  useEffect(() => {
    // if ()
  }, []);

  return (
    <Box
      display="flex"
      gap="32px"
      pb="20px"
      mb="20px"
      borderBottom={`2px solid ${DIVIDER}`}
    >
      <Box
        display="flex"
        direction="column"
        borderRadius="16px"
        grow="1"
      >
        <Box display="flex" mb="20px" >
          <Typography as="h3" fz="16px" fw="500" mr="12px">
            Витрати:
          </Typography>
          <Typography as="span" fz="16px" fw="600">
            {isDev ? "32450.67" : expensesChart.totalExpenses} ₴
          </Typography>
        </Box>
        <DoughnutChart
          data={isDev ? mockData : expensesData}
          labels={isDev ? mockLabels : expensesLabels}
          chartType="expense"
        />
      </Box>
      <Box
        display="flex"
        direction="column"
        borderRadius="16px"
        grow="1"
      >
        <Box display="flex" mb="20px">
          <Typography as="h3" fz="16px" fw="500" mr="12px">
            Надходження:
          </Typography>
          <Typography as="span" fz="16px" fw="600">
            {isDev ? "128531.31" : incomesChart.totalIncomes} ₴
          </Typography>
        </Box>
        <DoughnutChart
          data={isDev ? mockData : incomesData}
          labels={isDev ? mockLabels : incomesLabels}
          chartType="income"
        />
      </Box>
    </Box>
  );
}

const LineChartSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const { categories } = useAppSelector(state => state.category);
  const { filterByDays } = useAppSelector(state => state.statistics);

  function onChangeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setActiveCategory(e.target.value))
    dispatch(getFilteredTransactions(
      `?category=${e.target.value}&days=${filterByDays}`
    ))
  }

  return (
    <Box display="flex" direction="column">
      <Box display="flex" alignItems="center" gap="16px" mb="16px">
        <Typography as="h3" fz="16px" fw="500">
          Витрати або надходження за категорією
        </Typography>
        <Select
          width="450px"
          defaultValue={(isDev ? mockCategories[0] : categories.all[0])?.title}
          onChange={(e) => onChangeCategory(e)}
        >
          {(isDev ? mockCategories : categories.all)?.map(({ title, id }) => (
            <Option key={id} value={id}>{title}</Option>
          ))}
        </Select>
      </Box>
      <Box borderRadius="8px" bgColor={WHITE} p="15px" grow="1">
        <LineChart />
      </Box>
    </Box>
  );
}

export default StatisticsPage;