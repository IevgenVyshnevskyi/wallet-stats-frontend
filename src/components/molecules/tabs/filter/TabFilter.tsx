import { Link } from "react-router-dom";
import { TabFilterWrapper } from "./TabFilter.styled";
import { List } from "../../../atoms/list/List.styled";
import { ListItem } from "../../../atoms/list/ListItem.styled";

export interface IFilterButton {
  filterBy: string;
  buttonName: string;
};

type TabFilterProps = {
  filterButtons: IFilterButton[];
};

const TabFilter: React.FC<TabFilterProps> = ({ filterButtons }) => {
  return (
    <TabFilterWrapper>
      <List>
        {filterButtons.map(({ filterBy, buttonName }, index) => (
          <ListItem key={index}>
            <Link to={filterBy}>{buttonName}</Link>
          </ListItem>
        ))}
      </List>
    </TabFilterWrapper>
  );
};

export default TabFilter;