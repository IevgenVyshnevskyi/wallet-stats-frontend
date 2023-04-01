import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import Account, { AccountProps } from "./Account";

type AccountListProps = {
  accounts: AccountProps[]
  onEditAccount?: any;
  direction?: string;
}

const AccountList: React.FC<AccountListProps> = ({
  accounts,
  onEditAccount,
  direction
}) => {
  return (
    <List display="flex" direction={direction || undefined}>
      {accounts.map(({ name, sum }, index) => (
        <ListItem key={index} onClick={onEditAccount}>
          <Account name={name} sum={sum} />
        </ListItem>
      ))}
    </List>
  );
}

export default AccountList;