import { TabSwitchProps } from "../../../../../types/molecules";
import { ButtonTransparent } from "../../../atoms/button/ButtonTransparent.styled";
import { List } from "../../../atoms/list/List.styled";
import { ListItem } from "../../../atoms/list/ListItem.styled";
import { TabSwitchWrapper } from "./TabSwitch.styled";

const TabSwitch: React.FC<TabSwitchProps> = ({ switchButtons }) => {
  return (
    <TabSwitchWrapper>
      <List>
        {switchButtons.map(({ buttonName, onClick }, index) => (
          <ListItem key={index}>
            <ButtonTransparent onClick={onClick}>
              {buttonName}
            </ButtonTransparent>
          </ListItem>
        ))}
      </List>
    </TabSwitchWrapper>
  );
}

export default TabSwitch;