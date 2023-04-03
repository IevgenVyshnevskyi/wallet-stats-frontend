import { BASE_2, DARK_FOR_TEXT, DIVIDER, WHITE } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import Header from '../../molecules/header/Header';
import TabFilter from "../../molecules/tabs/filter/TabFilter";
import { StatisticsPageWrapper } from "./StatisticsPage.styled";
import DoughnutChart from './../../molecules/charts/DoughnutChart';
import { mockOptions } from "../../../../mock-data/options";
import { Select } from "../../atoms/select/Select.styled";
import { Option } from "../../atoms/select/Option.styled";
import LineChart from "../../molecules/charts/LineChart";
import { IFilterButton } from "../../../../types/molecules";

const StatisticsPage: React.FC = () => {
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
  const filterButtons: IFilterButton[] = [
    { buttonName: '1 місяць', filterBy: '?filter=1month' },
    { buttonName: '3 місяці', filterBy: '?filter=3months' },
    { buttonName: 'Півроку', filterBy: '?filter=6months' },
  ];
  // create context for filters

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
            32 450,67 ₴
          </Typography>
        </Box>
        <DoughnutChart />
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
            128 531,31 ₴
          </Typography>
        </Box>
        <DoughnutChart />
      </Box>
    </Box>
  );
}

const LineChartSection: React.FC = () => {
  return (
    <Box display="flex" direction="column">
      <Box display="flex" alignItems="center" gap="16px" mb="16px">
        <Typography as="h3" fz="16px" fw="500">
          Витрати або надходження за категорією
        </Typography>
        <Select width="450px">
          {mockOptions.map(({ value, label }, index) => (
            <Option key={index} value={value}>{label}</Option>
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