import { useContext, useEffect } from "react";
import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { ButtonLink } from "../../atoms/button/ButtonLink";
import { Typography } from "../../atoms/typography/Typography.styled";
import Header from "../../molecules/header/Header";
import { TransactionsPageWrapper } from "./TransactionsPage.styled";
import { useSearchParams } from "react-router-dom";
import { BASE_2, DARK_FOR_TEXT, MENU_BUTTON_SELECTED, WHITE } from "../../../shared/styles/variables";
import TabFilter from "../../molecules/tabs/filter/TabFilter";
import TabSwitch, { ISwitchButton } from "../../molecules/tabs/switch/TabSwitch";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import Wallet from "../../molecules/wallet/Wallet";
import { Input } from './../../atoms/input/Input.styled';
import { Label } from "../../atoms/label/Label.styled";
import { Select } from "../../atoms/select/Select.styled";
import { Option } from "../../atoms/select/Option.styled";
import Transaction from "../../molecules/transaction/Transaction";
import { IFilterButton } from "../../../../types/molecules";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { getUserDetails } from "../../../store/userSlice";
import { TransactionContext } from "../../../contexts/TransactionContext";
import { ButtonTransparent } from "../../atoms/button/ButtonTransparent.styled";
import { ITransaction, IWallet } from "../../../store/types";

import { mockOptions } from "../../../../mock-data/options";
import { mockTransactions } from "../../../../mock-data/transactions";
import { mockWallets } from "../../../../mock-data/wallets";

import {
  getTransactions,
  resetActiveTransactionState,
  setActiveTransaction,
  setActiveTransactionTypeOfOutlay,
  setActiveTransactionWallet,
  setAddTransactionData,
  setEditTransactionData,
  transactionAction
} from "../../../store/transactionSlice";
import { mockCategories } from "../../../../mock-data/categories";
import { isDev } from "../../../consts/consts";

const TransactionsPage: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    isAddTransactionSuccess,
    isEditTransactionSuccess,
    isDeleteTransactionSuccess
  } = useAppSelector(state => state.transaction);

  const { user } = useAppSelector(state => state.user);

  const { isEditTransactionOpen } = useContext(TransactionContext)

  // const [searchParams] = useSearchParams();

  useEffect(() => {
    dispatch(getTransactions());
    dispatch(getUserDetails());
    // dispatch(setAddTransactionData({ owner: user?.id }))
  }, []);

  useEffect(() => {
    if (isAddTransactionSuccess || isEditTransactionSuccess || isDeleteTransactionSuccess) {
      dispatch(getTransactions());
    }

  }, [isAddTransactionSuccess, isEditTransactionSuccess, isDeleteTransactionSuccess]);

  // const filterOption: string | null = searchParams.get('filter');
  // console.log('filterOption in TransactionsPage', filterOption)

  return (
    <TransactionsPageWrapper>
      <Header />

      <Box m="0 20px 36px" display="flex" grow="1" gap="25px">
        <Transactions />

        {isEditTransactionOpen ? <EditTransaction /> : <AddTransaction />}
      </Box>
    </TransactionsPageWrapper>
  );
}

const Transactions: React.FC = () => {
  const dispatch = useAppDispatch();

  const filterButtons: IFilterButton[] = [
    { buttonName: 'Всі транзакції', filterBy: '?filter=all' },
    { buttonName: 'Витрати', filterBy: '?filter=expenses' },
    { buttonName: 'Надходження', filterBy: '?filter=incomes' },
  ];

  const { transactions } = useAppSelector(state => state.transaction);
  const { setIsEditTransactionOpen } = useContext(TransactionContext);

  // const [searchParams] = useSearchParams();
  // const [allTransactions, setAllTransactions] = useState<ITransaction[]>(transactions);
  // const filterOption: string | null = searchParams.get('sort') || '';
  // console.log('filterOption in TransactionPage', filterOption)

  // const filteredTransactions = useMemo(() => {
  //   switch (filterOption) {
  //     case 'income':
  //       return [...allTransactions].filter((t) => t.type_of_outlay === "income")
  //     case 'expense':
  //       return [...allTransactions].filter((t) => t.type_of_outlay === "expense")
  //     default:
  //       return allTransactions
  //   }
  // }, [allTransactions, filterOption])

  function onTransactionClick(transaction: ITransaction) {
    setIsEditTransactionOpen(true);
    dispatch(setActiveTransaction(transaction));
    dispatch(setEditTransactionData(transaction));
  }

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
          fz="12px"
        >
          Відобразити
        </Typography>
        <TabFilter filterButtons={filterButtons} />
      </Box>

      <Box
        display="flex"
        direction="column"
        bgColor={BASE_2}
        p="15px"
        borderRadius="16px"
        grow="1"
      >
        {Object.keys(isDev ? mockTransactions : transactions).map((date) => (
          <Box mb="20px" key={date}>
            <Typography as="h3" fz="16px" fw="500" mb="20px">
              {date}
            </Typography>
            <List>
              {(isDev ? mockTransactions : transactions)[date].map((transaction) => (
                <ListItem key={transaction?.id}>
                  <ButtonTransparent
                    width="100%"
                    onClick={() => onTransactionClick(transaction)}
                  >
                    <Transaction transaction={transaction} />
                  </ButtonTransparent>
                </ListItem>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

const AddTransaction: React.FC = () => {
  const dispatch = useAppDispatch()

  const { addTransactionData } = useAppSelector(state => state.transaction);

  const { wallets } = useAppSelector(state => state.wallet);

  const isValid = Object.keys(addTransactionData || {}).length >= 5
    && addTransactionData?.amount_of_funds !== "";

  const switchButtons: ISwitchButton[] = [
    {
      buttonName: 'Витрата',
      onTabClick: () => {
        dispatch(setAddTransactionData({ type_of_outlay: "expense" }));
        dispatch(setActiveTransactionTypeOfOutlay("expense"));
      },
      typeOfOutlay: "expense"
    },
    {
      buttonName: 'Надходження',
      onTabClick: () => {
        dispatch(setAddTransactionData({ type_of_outlay: "income" }));
        dispatch(setActiveTransactionTypeOfOutlay("income"));
      },
      typeOfOutlay: "income"
    },
  ];

  function handleAddTransaction() {
    dispatch(setActiveTransaction(null));
    dispatch(transactionAction({ data: addTransactionData, method: "POST" }))
  }

  function onChangeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setAddTransactionData({ category: parseInt(e.target.value) }))
  }

  function onWalletClick(wallet: IWallet) {
    dispatch(setActiveTransactionWallet(wallet));
    dispatch(setAddTransactionData({ wallet: wallet.id }));
  };

  function onDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setAddTransactionData({ created: e.target.value }))
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setAddTransactionData({ amount_of_funds: e.target.value }))
  }

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
              {(isDev ? mockWallets : wallets)?.map((wallet, index) => (
                <ListItem key={index} width="250px">
                  <Wallet wallet={wallet} onWalletClick={() => onWalletClick(wallet)} />
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Box mb="25px">
          <Label fw="500" mb="12px">Категорія</Label>
          <Select
            width="100%"
            defaultValue={mockCategories[0].title}
            onChange={(e) => onChangeCategory(e)}
          >
            {mockCategories.map(({ title, id }) => (
              <Option key={id} value={id}>{title}</Option>
            ))}
          </Select>
        </Box>
        <Box mb="24px">
          <Label fw="500" htmlFor="sum" mb="12px">Сума</Label>
          <Input
            fz="22px"
            type="number"
            id="sum"
            width="270px"
            bgColor={WHITE}
            onChange={(e) => onInputChange(e)}
          />
        </Box>
        <Box>
          <Button
            disabled={!isValid}
            primary
            width="100%"
            onClick={handleAddTransaction}
          >
            Зберегти
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

const EditTransaction: React.FC = () => {
  const dispatch = useAppDispatch()

  const { setIsEditTransactionOpen } = useContext(TransactionContext)

  const { wallets } = useAppSelector(state => state.wallet);

  const {
    activeTransaction,
    editTransactionData
  } = useAppSelector(state => state.transaction)

  const isValid = Object.keys(editTransactionData || {}).length >= 5
    && editTransactionData?.amount_of_funds !== "";

  function handleEditTransaction() {
    dispatch(transactionAction({
      data: editTransactionData,
      method: "PUT",
      id: String(editTransactionData?.id)
    }));
    setIsEditTransactionOpen(false);
  }

  function handleCancelEditTransaction() {
    setIsEditTransactionOpen(false);
    dispatch(setEditTransactionData(null));
    dispatch(resetActiveTransactionState({}));
  }

  function handleDeleteTransaction() {
    dispatch(transactionAction({
      data: activeTransaction,
      method: "DELETE",
      id: String(activeTransaction?.id)
    }));
    dispatch(setActiveTransaction({}));
    setIsEditTransactionOpen(false);
  }

  function onWalletClick(wallet: IWallet) {
    dispatch(setActiveTransactionWallet(wallet));
    dispatch(setEditTransactionData({ wallet: wallet.id }));
  };

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(setEditTransactionData({ amount_of_funds: e.target.value }))
  }

  function onChangeCategory(e: React.ChangeEvent<HTMLSelectElement>) {
    dispatch(setEditTransactionData({ category: parseInt(e.target.value) }))
  }

  const switchButtons: ISwitchButton[] = [
    {
      buttonName: 'Витрата',
      onTabClick: () => {
        dispatch(setEditTransactionData({ type_of_outlay: "expense" }));
        setActiveTransactionTypeOfOutlay("expense");
      },
      typeOfOutlay: "expense"
    },
    {
      buttonName: 'Надходження',
      onTabClick: () => {
        dispatch(setEditTransactionData({ type_of_outlay: "income" }));
        setActiveTransactionTypeOfOutlay("income");
      },
      typeOfOutlay: "income"
    },
  ];

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
      <Box bgColor={MENU_BUTTON_SELECTED} borderRadius="16px" grow="1" p="15px">
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
              {wallets.map((wallet, index) => (
                <ListItem key={index} width="250px">
                  <Wallet wallet={wallet} onWalletClick={() => onWalletClick(wallet)} />
                </ListItem>
              ))}
              {/* {(wallets.length > 0 ? wallets : mockWallets).map((wallet, index) => (
                <ListItem key={index} width="250px">
                  <Wallet wallet={wallet} onWalletClick={() => onWalletClick(wallet)} />
                </ListItem>
              ))} */}
            </List>
          </Box>
        </Box>
        <Box mb="25px">
          <Label fw="500" mb="12px">Категорія</Label>
          <Select
            width="100%"
            defaultValue={mockCategories[0].title}
            onChange={(e) => onChangeCategory(e)}
          >
            {mockCategories.map(({ title, id }) => (
              <Option key={id} value={id}>{title}</Option>
            ))}
          </Select>
        </Box>
        <Box mb="24px">
          <Label fw="500" htmlFor="sum" mb="12px">Сума</Label>
          <Input
            fz="22px"
            type="number"
            id="sum"
            width="270px"
            bgColor={WHITE}
            onChange={(e) => onInputChange(e)}
          />
        </Box>
        <Box display="flex" gap="8px" mb="27px">
          <Button
            primary
            width="100%"
            onClick={handleEditTransaction}
            disabled={isValid}
          >
            Зберегти
          </Button>
          <Button secondary width="100%" onClick={handleCancelEditTransaction}>Скасувати</Button>
        </Box>
        <Box display="flex" justifyContent="flex-end">
          <ButtonLink onClick={handleDeleteTransaction}>Видалити транзакцію</ButtonLink>
        </Box>
      </Box>
    </Box>
  );
}










// type TransactionsSettingsProps = {
//   transactionAction: React.Dispatch<React.SetStateAction<ITransaction>>;
//   newTransactionData: ITransaction;
// }

// const TransactionsSettings: React.FC<TransactionsSettingsProps> = ({
//   transactionAction,
//   newTransactionData
// }) => {
//   const { wallets } = useAppSelector(state => state.wallet);

//   const switchButtons: ISwitchButton[] = [
//     {
//       buttonName: 'Витрата',
//       onClick: transactionAction({
//         ...newTransactionData,
//         type_of_outlay: "income",
//       }),
//     },
//     {
//       buttonName: 'Надходження',
//       onClick: transactionAction({
//         ...newTransactionData,
//         type_of_outlay: "expense",
//       })
//     },
//   ];

//   return (
//     <>
//       <Box mb="25px">
//         <Typography
//           as="h3"
//           fz="16px"
//           fw="500"
//           mb="12px"
//         >
//           Тип транзакції
//         </Typography>
//         <TabSwitch switchButtons={switchButtons} />
//       </Box>
//       <Box mb="24px">
//         <Typography
//           as="h3"
//           fz="16px"
//           fw="500"
//           mb="12px"
//         >
//           Рахунок
//         </Typography>
//         <Box display="flex">
//           <List display="flex" gap="8px" wrap="wrap">
//             {wallets.map((wallet, index) => (
//               <ListItem key={index} width="250px">
//                 <Wallet wallet={wallet} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Box>
//       <Box mb="25px">
//         <Label fw="500" mb="12px">Категорія</Label>
//         <Select width="100%">
//           {mockOptions.map(({ value, label }, index) => (
//             <Option key={index} value={value}>{label}</Option>
//           ))}
//         </Select>
//       </Box>
//       <Box mb="24px">
//         <Label fw="500" htmlFor="sum" mb="12px">Сума</Label>
//         <Input fz="22px" type="number" id="sum" width="270px" bgColor={WHITE} />
//       </Box>
//     </>
//   );
// }

export default TransactionsPage;