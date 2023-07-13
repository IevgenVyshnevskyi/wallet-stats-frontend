import Link from "../../../atoms/link/Link.styled";
import List from "../../../atoms/list/List.styled";
import ListItem from "../../../atoms/list/ListItem.styled";
import TabFilterWrapper from "./TabFilter.styled";

import COLORS from "../../../../shared/styles/variables";

import { IFilterButton } from "../../../../../types/common";

type TabFilterProps = {
  filterButtons: IFilterButton[];
};

const TabFilter: React.FC<TabFilterProps> = ({ filterButtons }) => (
  <TabFilterWrapper>
    <List>
      {filterButtons.map(({ filterBy, onTabClick, buttonName, isActive }) => (
        <ListItem
          key={buttonName}
          bgColor={isActive ? COLORS.WHITE : "transparent"}
          textAlight="center">
          <Link
            to={filterBy}
            fw={isActive ? "700" : "400"}
            onClick={onTabClick}>
            {buttonName}
          </Link>
        </ListItem>
      ))}
    </List>
  </TabFilterWrapper>
);

export default TabFilter;
