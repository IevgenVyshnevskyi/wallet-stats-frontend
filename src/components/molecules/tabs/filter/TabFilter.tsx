import { Link } from './../../../atoms/link/Link.styled';
import { List } from "../../../atoms/list/List.styled";
import { ListItem } from "../../../atoms/list/ListItem.styled";
import { TabFilterWrapper } from "./TabFilter.styled";

import COLORS from '../../../../shared/styles/variables';

import { TypeOfOutlay } from '../../../../store/types';

export interface IFilterButton {
  filterBy: string;
  onTabClick: () => void;
  buttonName: string;
  isActive: boolean;
  typeOfOutlay?: TypeOfOutlay | "";
};

type TabFilterProps = {
  filterButtons: IFilterButton[];
};

const TabFilter: React.FC<TabFilterProps> = ({ filterButtons }) => {
  return (
    <TabFilterWrapper>
      <List>
        {filterButtons.map(({ filterBy, onTabClick, buttonName, isActive }, index) => (
          <ListItem
            key={index}
            bgColor={isActive ? COLORS.WHITE : "transparent"}
            textAlight="center"
          >
            <Link
              to={filterBy}
              fw={isActive ? "700" : "400"}
              onClick={onTabClick}
            >
              {buttonName}
            </Link>
          </ListItem>
        ))}
      </List>
    </TabFilterWrapper>
  );
};

export default TabFilter;