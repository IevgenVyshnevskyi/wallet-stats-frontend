import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { WalletButton } from "./Wallet.styled";
import SettingsWalletIcon from '../../../shared/assets/icons/settings-wallet.svg'
import { DARK_FOR_TEXT } from "../../../shared/styles/variables";
import { IWallet } from "../../../store/types";

export type WalletProps = {
  wallet: IWallet;
  onWalletClick: () => void;
  isActive: boolean;
}

const Wallet: React.FC<WalletProps> = ({ wallet, onWalletClick, isActive }) => {
  const homePath = window.location.pathname === "/home";

  return (
    <WalletButton isActive={isActive} onClick={onWalletClick}>
      <Box
        display="flex"
        direction="column"
        alignItems="start"
        p={homePath && wallet?.type_of_account === "cash" && "10px 0"}
      >
        {homePath ? (
          wallet?.type_of_account === "bank" && (
            <Typography
              as="h4"
              fw="500"
              color={DARK_FOR_TEXT}
              mb="10px"
            >
              {wallet?.title}
            </Typography>
          )
        ) : (
          <Typography
            as="h4"
            fw="500"
            color={DARK_FOR_TEXT}
            mb="10px"
          >
            {wallet?.title}
          </Typography>
        )}

        <Typography
          as="span"
          fw="600"
          fz="22px"
        >
          {wallet?.amount && wallet?.amount + "₴"}
        </Typography>
      </Box>

      {homePath && <SettingsWalletIcon opacity=".2" />}
    </WalletButton>
  );
}

export default Wallet;