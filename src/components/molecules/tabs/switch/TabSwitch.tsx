import { WHITE } from "../../../../shared/styles/variables";
import { TypeOfOutlay } from "../../../../store/types";
import { ButtonTransparent } from "../../../atoms/button/ButtonTransparent.styled";
import { List } from "../../../atoms/list/List.styled";
import { ListItem } from "../../../atoms/list/ListItem.styled";
import { TabSwitchWrapper } from "./TabSwitch.styled";
import { useAppSelector } from '../../../../store/hooks';

export interface ISwitchButton {
  buttonName: string;
  onTabClick: () => void;
  typeOfOutlay: TypeOfOutlay;
};

export type TabSwitchProps = {
  switchButtons: ISwitchButton[];
};

const TabSwitch: React.FC<TabSwitchProps> = ({ switchButtons }) => {
  const { activeTransactionTypeOfOutlay } = useAppSelector(state => state.transaction)

  return (
    <TabSwitchWrapper>
      <List>
        {switchButtons.map(({ buttonName, onTabClick, typeOfOutlay }, index) => (
          <ListItem key={index}>
            <ButtonTransparent
              bgColor={activeTransactionTypeOfOutlay === typeOfOutlay ? WHITE : "red"}
              color="red"
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