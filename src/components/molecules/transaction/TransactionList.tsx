import { useMemo, useState } from "react";
import { BASE_2 } from "../../../shared/styles/variables";
import { Box } from "../../atoms/box/Box.styled";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import Transaction, { ITransaction } from "./Transaction";
import { useSearchParams } from "react-router-dom";

type TransactionListProps = {
  transactions: ITransaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  const [searchParams] = useSearchParams();
  const [allTransactions, setAllTransactions] = useState<ITransaction[]>(transactions);
  const filterOption: string | null = searchParams.get('sort') || '';
  console.log('filterOption in TransactionList', filterOption)

  const filteredTransactions = useMemo(() => {
    switch (filterOption) {
      case 'income':
        return [...allTransactions].filter((t) => t.type_of_outlay === "income")
      case 'expense':
        return [...allTransactions].filter((t) => t.type_of_outlay === "expense")
      default:
        return allTransactions
    }
  }, [allTransactions, filterOption])

  return (
    <Box
      display="flex"
      direction="column"
      bgColor={BASE_2}
      p="15px"
      borderRadius="16px"
      grow="1"
    >
      <Box mb="20px">
        <Typography
          as="h3"
          fz="16px"
          fw="500"
          mb="20px"
        >
          {/* {t.created} */} Четвер
        </Typography>
        <List>
          {filteredTransactions.map((t) => (
            <ListItem key={t.id}>
              <Transaction transaction={t} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export default TransactionList;
