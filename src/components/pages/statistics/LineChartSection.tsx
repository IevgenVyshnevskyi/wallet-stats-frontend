import { useState, useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setActiveCategoryId } from "../../../store/statisticsSlice";
import { getFilteredTransactions } from "../../../store/transactionSlice";

import { generateNewLineChartData } from "../../../shared/utils/statistics/generateNewLineChartData";

import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import LineChart from "../../molecules/charts/LineChart";
import Select from "../../molecules/select/Select";

import COLORS from "../../../shared/styles/variables";

import { SelectOptions } from "../../../../types/common";

const LineChartSection: React.FC = () => {
  const dispatch = useAppDispatch();

  const { filterByDays, allOutlaysChart } = useAppSelector(
    (state) => state.statistics
  );
  const { categories } = useAppSelector((state) => state.category);

  const selectedCategory = categories.all.find(
    (c) => c.id === allOutlaysChart.activeCategoryId
  );

  const [selectedCategoryValues, setSelectedCategoryValues] = useState<any>({
    value: selectedCategory?.id,
    label: selectedCategory?.title,
  });

  const [chartData, setChartData] = useState<number[]>([]);

  const options: SelectOptions[] = categories.all?.map(({ id, title }) => ({
    value: id,
    label: title,
  }));

  const onCategoryChange = (e: any): void => {
    if (e.value !== allOutlaysChart?.activeCategoryId) {
      setSelectedCategoryValues({ value: e.value, label: e.label });
      dispatch(setActiveCategoryId(e.value));
      dispatch(
        getFilteredTransactions(`?category=${e.value}&days=${filterByDays}`)
      );
    }
  };

  useEffect(() => {
    const newChartData: number[] = new Array(parseInt(filterByDays)).fill(0);

    const { diffInDays, totalAmount } = generateNewLineChartData(
      allOutlaysChart.categoryTransactions
    );

    newChartData[diffInDays] = totalAmount;

    setChartData(newChartData);
  }, [allOutlaysChart?.categoryTransactions]);

  useEffect(() => {
    if (allOutlaysChart?.activeCategoryId) {
      dispatch(
        getFilteredTransactions(
          `?category=${allOutlaysChart?.activeCategoryId}&days=${filterByDays}`
        )
      );
    } else {
      setSelectedCategoryValues({
        value: categories.all[0]?.id,
        label: categories.all[0]?.title,
      });
      dispatch(setActiveCategoryId(categories.all[0]?.id));
    }
  }, [allOutlaysChart?.activeCategoryId, filterByDays, categories.all]);

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
      <Box borderRadius="8px" bgColor={COLORS.WHITE} p="15px" grow="1">
        <LineChart data={chartData} />
      </Box>
    </Box>
  );
};

export default LineChartSection;
