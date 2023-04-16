import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { WalletButton } from "./Wallet.styled";
import SettingsWalletIcon from '../../../shared/assets/icons/settings-wallet.svg'
import { DARK_FOR_TEXT } from "../../../shared/styles/variables";
import { useContext } from 'react';
import { PopupContext } from "../../../contexts/PopupContext";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { IWallet } from "../../../store/types";

export type WalletProps = {
  wallet: IWallet;
  onWalletClick: () => void;
}

const Wallet: React.FC<WalletProps> = ({ wallet, onWalletClick }) => {
  const { setIsEditWalletPopupOpen } = useContext(PopupContext)

  const { activeWallet } = useAppSelector(state => state.wallet)
  const { activeTransactionWallet } = useAppSelector(state => state.transaction)

  const homePath = window.location.pathname === '/home'
  const transactionPath = window.location.pathname === '/transactions'

  return (
    <WalletButton
      isActive={
        (activeWallet?.id === wallet.id && homePath) ||
        (activeTransactionWallet?.id === wallet.id && transactionPath)
      }
      onClick={onWalletClick}>
      <Box
        display="flex"
        direction="column"
        alignItems="start"
        m={!wallet?.title && "10px 0"}
      >
        {window.location.pathname === "/home" ? (
          wallet?.type_of_account === "bank" && (
            <Typography
              as="h4"
              fw="500"
              color={DARK_FOR_TEXT}
              m="0 0 10px 0"
            >
              {wallet?.title}
            </Typography>
          )
        ) : (
          <Typography
            as="h4"
            fw="500"
            color={DARK_FOR_TEXT}
            m="0 0 10px 0"
          >
            {wallet?.title}
          </Typography>
        )}

        <Typography
          as="span"
          fw="600"
          fz="22px"
        >
          {wallet?.amount} ₴
        </Typography>
      </Box>

      {window.location.pathname === "/home" && <SettingsWalletIcon opacity=".2" />}
    </WalletButton>
  );
}

export default Wallet;