import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  getFilteredTransactions,
  getTransactions,
} from "../../../store/transactionSlice";
import {
  getCategories,
  getFilteredCategories,
} from "../../../store/categorySlice";

import { token } from "../../../api/api";

import { Box } from "../../atoms/box/Box.styled";
import Header from "../../molecules/header/Header";
import StatisticsHeader from "./StatisticsHeader";
import DoughnutChartsSection from "./DoughnutChartSection";
import LineChartSection from "./LineChartSection";
import { StatisticsPageWrapper } from "./StatisticsPage.styled";

import COLORS from "../../../shared/styles/variables";

const StatisticsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categories } = useAppSelector((state) => state.category);
  const { isLoggedIn, isRegistered } = useAppSelector((state) => state.user);
  const { allOutlaysChart, filterByDays } = useAppSelector(
    (state) => state.statistics
  );

  const activeCategoryId =
    categories.all?.length > 0 && !allOutlaysChart?.activeCategoryId;

  if (!token && !isRegistered && !isLoggedIn) {
    navigate("/welcome");
  }

  useEffect(() => {
    dispatch(getCategories());
    dispatch(getTransactions());
    dispatch(getFilteredCategories("?type_of_outlay=income"));
    dispatch(getFilteredCategories("?type_of_outlay=expense"));
    dispatch(
      getFilteredTransactions(`?type_of_outlay=income&days=${filterByDays}`)
    );
    dispatch(
      getFilteredTransactions(`?type_of_outlay=expense&days=${filterByDays}`)
    );
  }, []);

  useEffect(() => {
    if (activeCategoryId) {
      dispatch(getFilteredTransactions(`?category=${categories?.all[0]?.id}`));
    }
  }, [categories.all]);

  return (
    <StatisticsPageWrapper>
      <Header />

      <Box m="0 36px 24px" display="flex" grow="1" direction="column">
        <StatisticsHeader />
        <Box p="15px" bgColor={COLORS.BASE_2} borderRadius="16px" grow="1">
          <DoughnutChartsSection />
          <LineChartSection />
        </Box>
      </Box>
    </StatisticsPageWrapper>
  );
};

export default StatisticsPage;
