import { useContext } from "react";

import { PopupContext } from "../../../contexts/PopupContext";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { setActiveWallet } from "../../../store/walletSlice";

import { Box } from "../../atoms/box/Box.styled";
import { Button } from "../../atoms/button/Button.styled";
import { List } from "../../atoms/list/List.styled";
import { ListItem } from "../../atoms/list/ListItem.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import Wallet from "../../molecules/wallet/Wallet";

import COLORS from "../../../shared/styles/variables";

import { IWallet } from "../../../../types/wallet";

const Wallets: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    setIsAddWalletPopupOpen,
    setIsEditWalletPopupOpen
  } = useContext(PopupContext);

  const {
    wallets,
    activeWallet,
    isLoading
  } = useAppSelector(state => state.wallet)

  const cashWallet = wallets?.find(wallet => {
    return wallet?.type_of_account === "cash";
  })

  const bankWallets = wallets?.filter(wallet => {
    return wallet?.type_of_account === "bank";
  })

  const onWalletClick = (wallet: IWallet) => {
    setIsEditWalletPopupOpen(true)
    dispatch(setActiveWallet(wallet));
  };

  return (
    <Box display="flex" direction="column">
      <Typography
        as="h2"
        fz="22px"
        fw="600"
        mb="20px"
      >
        Рахунки
      </Typography>
      <Box
        display="flex"
        direction="column"
        bgColor={COLORS.BASE_2}
        p="15px"
        borderRadius="16px"
        grow="1"
        overflow="auto"
        height="100px"
      >
        <Box
          p="0 0 20px 0"
          borderBottom={`2px solid ${COLORS.DIVIDER}`}
          mb="20px"
        >
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="20px"
          >
            {cashWallet?.title || "Готівка"}
          </Typography>
          <Wallet
            wallet={cashWallet}
            onWalletClick={() => onWalletClick(cashWallet)}
            isActive={activeWallet?.id === cashWallet?.id}
          />
        </Box>
        <Box grow="1" mb="20px">
          <Typography
            as="h3"
            fz="16px"
            fw="500"
            mb="20px"
          >
            Картки
          </Typography>
          <List display="flex" direction="column" gap="8px">
            {bankWallets?.map((wallet) => (
              <ListItem key={wallet.id}>
                <Wallet
                  wallet={wallet}
                  onWalletClick={() => onWalletClick(wallet)}
                  isActive={activeWallet?.id === wallet.id}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Button
          disabled={wallets?.length > 4 || isLoading}
          secondary
          onClick={() => setIsAddWalletPopupOpen(true)}
        >
          Додати картковий рахунок
        </Button>
      </Box>
    </Box>
  );
}

export default Wallets;