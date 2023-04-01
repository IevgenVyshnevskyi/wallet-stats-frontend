import { useState } from "react";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { Typography } from "../../atoms/typography/Typography.styled";
import Header from "../../molecules/header/Header";
import { TransactionsPageWrapper } from "./TransactionsPage.styled";
import { useSearchParams } from "react-router-dom";
import { BASE_2, DARK_FOR_TEXT, WHITE } from "../../../shared/styles/variables";
import TransactionList from "../../molecules/transaction/TransactionList";
import TabFilter from "../../molecules/tabs/filter/TabFilter";
import { IFilterButton } from './../../molecules/tabs/filter/TabFilter';
import TabSwitch, { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import { mockTransactions } from "../../../../mock-data/transactions";
import { mockAccounts } from "../../../../mock-data/accounts";
import Account from "../../molecules/account/Account";
import { Input } from './../../atoms/input/Input.styled';
import { Label } from "../../atoms/label/Label.styled";
import { Select } from "../../atoms/select/Select.styled";
import { mockOptions } from "../../../../mock-data/options";
import { Option } from "../../atoms/select/Option.styled";

const TransactionsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [isEditTransactionOpen, setIsEditTransactionOpen] = useState(false);

  const filterButtons: IFilterButton[] = [
    { buttonName: 'Всі транзакції', filterBy: '?filter=all' },
    { buttonName: 'Витрати', filterBy: '?filter=expenses' },
    { buttonName: 'Надходження', filterBy: '?filter=incomes' },
  ];

  const filterOption: string | null = searchParams.get('filter');
  console.log('filterOption in TransactionsPage', filterOption)

  return (
    <TransactionsPageWrapper>
      <Header />

      <Box m="0 20px 36px" display="flex" grow="1" gap="25px">
        <Transactions filterButtonsProps={filterButtons} />

        {!isEditTransactionOpen && <AddTransactions />}
        {isEditTransactionOpen && <EditTransactions />}
      </Box>
    </TransactionsPageWrapper>
  );
}

type TransactionsProps = {
  filterButtonsProps: IFilterButton[];
}

const Transactions: React.FC<TransactionsProps> = ({
  filterButtonsProps
}) => {

  return (
    <Box grow="1" display="flex" direction="column">
      <Box display="flex" alignItems="center" mb="20px">
        <Box grow="1">
          <Typography as="h2" fz="22px" fw="600">
            Транзакції
          </Typography>
        </Box>
        <Typography
          as="span"
          mr="10px"
          fw="600"
          color={DARK_FOR_TEXT}
        >
          Відобразити
        </Typography>
        <TabFilter filterButtons={filterButtonsProps} />
      </Box>

      <TransactionList transactions={mockTransactions} />
    </Box>
  );
}




const AddTransactions: React.FC = () => {
  return (
    <Box display="flex" direction="column" width="540px">
      <Typography
        as="h2"
        fw="600"
        fz="22px"
        mt="5px"
        mb="30px"
      >
        Додати транзакцію
      </Typography>
      <Box bgColor={BASE_2} borderRadius="16px" grow="1" p="15px">
        <TransactionsSettings />
        <Box>
          <Button primary width="100%">Зберегти</Button>
        </Box>
      </Box>
    </Box>
  );
}

const EditTransactions: React.FC = () => {
  return (
    <Box display="flex" direction="column" width="540px">
      <Typography
        as="h2"
        fw="600"
        fz="22px"
        mt="5px"
        mb="30px"
      >
        Редагування транзакції
      </Typography>
      <Box bgColor={BASE_2} borderRadius="16px" grow="1" p="15px">
        <TransactionsSettings />
        <Box display="flex" gap="8px">
          <Button primary width="100%">Зберегти</Button>
          <Button secondary width="100%">Скасувати</Button>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <ButtonLink>Видалити рахунок</ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}

const TransactionsSettings: React.FC = () => {
  const switchButtons: ISwitchButton[] = [
    { buttonName: 'Витрата', onClick: () => { } },
    { buttonName: 'Надходження', onClick: () => { } },
  ];

  return (
    <>
      <Box mb="25px">
        <Typography
          as="h3"
          fz="16px"
          fw="500"
          mb="12px"
        >
          Тип транзакції
        </Typography>
        <TabSwitch switchButtons={switchButtons} />
      </Box>
      <Box mb="24px">
        <Typography
          as="h3"
          fz="16px"
          fw="500"
          mb="12px"
        >
          Рахунок
        </Typography>
        <Box display="flex">
          <List display="flex" gap="8px" wrap="wrap">
            {mockAccounts.map(({ name, sum }, index) => (
              <ListItem key={index} width="250px">
                <Account name={name} sum={sum} noIcon />
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
      <Box mb="25px">
        <Label fw="500" mb="12px">Категорія</Label>
        <Select width="100%">
          {mockOptions.map(({ value, label }, index) => (
            <Option key={index} value={value}>{label}</Option>
          ))}
        </Select>
      </Box>
      <Box mb="24px">
        <Label fw="500" mb="12px">Сума</Label>
        <Input type="text" width="270px" bgColor={WHITE} />
      </Box>
    </>
  );
}

export default TransactionsPage;