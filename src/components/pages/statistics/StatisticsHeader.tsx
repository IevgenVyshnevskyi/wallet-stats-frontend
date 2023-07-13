import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setFilterByDays } from "../../../store/statisticsSlice";
import { getFilteredTransactions } from "../../../store/transactionSlice";

import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import TabFilter from "../../molecules/tabs/filter/TabFilter";

import COLORS from "../../../shared/styles/variables";

import { IFilterButton } from "../../../../types/common";

const StatisticsHeader: React.FC = () => {
  const dispatch = useAppDispatch();

  const { filterByDays } = useAppSelector((state) => state.statistics);

  const setFilterButtonOptions = (
    buttonName: string,
    days: string
  ): IFilterButton => ({
    buttonName,
    filterBy: `?days=${days}`,
    isActive: filterByDays === days,
    onTabClick: () => {
      if (filterByDays === days) return;
      dispatch(setFilterByDays(days));
      dispatch(getFilteredTransactions(`?type_of_outlay=expense&days=${days}`));
      dispatch(getFilteredTransactions(`?type_of_outlay=income&days=${days}`));
    },
  });

  const filterButtons: IFilterButton[] = [
    setFilterButtonOptions("1 місяць", "30"),
    setFilterButtonOptions("3 місяці", "90"),
    setFilterButtonOptions("Півроку", "180"),
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
        color={COLORS.DARK_FOR_TEXT}>
        Відобразити дані за період
      </Typography>
      <TabFilter filterButtons={filterButtons} />
    </Box>
  );
};

export default StatisticsHeader;
