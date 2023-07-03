import { ButtonTransparent } from "../../../atoms/button/ButtonTransparent.styled";
import { List } from "../../../atoms/list/List.styled";
import { ListItem } from "../../../atoms/list/ListItem.styled";
import { TabSwitchWrapper } from "./TabSwitch.styled";

import COLORS from "../../../../shared/styles/variables";

import { ISwitchButton } from "../../../../../types/common";

type TabSwitchProps = {
  switchButtons: ISwitchButton[];
};

const TabSwitch: React.FC<TabSwitchProps> = ({ switchButtons }) => {
  return (
    <TabSwitchWrapper>
      <List>
        {switchButtons.map(({ buttonName, onTabClick, isActive }, index) => (
          <ListItem
            key={index}
            bgColor={isActive ? COLORS.WHITE : "transparent"}
          >
            <ButtonTransparent
              fw={isActive ? "700" : "400"}
              onClick={onTabClick}
            >
              {buttonName}
            </ButtonTransparent>
          </ListItem>
        ))}
      </List>
    </TabSwitchWrapper>
  );
}

export default TabSwitch;