import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { WalletButton } from "./Wallet.styled";
import SettingsWalletIcon from '../../../shared/assets/icons/settings-wallet.svg'
import { DARK_FOR_TEXT } from "../../../shared/styles/variables";

export interface IWallet {
  id: number,
  title: string,
  amount: string | number,
  type_of_account: string,
  owner: number,
}

type WalletProps = {
  wallet: IWallet;
}

const Wallet: React.FC<WalletProps> = ({ wallet }) => {
  // context for active button,
  // add data attribute
  // check if context activeButton === clicked button

  return (
    <WalletButton>
      <Box
        display="flex"
        direction="column"
        alignItems="start"
        m={!wallet.title && "10px 0"}
      >
        {wallet.title && (
          <Typography
            as="h4"
            fw="500"
            color={DARK_FOR_TEXT}
            m="0 0 10px 0"
          >
            {wallet.title}
          </Typography>
        )}
        <Typography
          as="span"
          fw="600"
          fz="22px"
        >
          {wallet.amount}
        </Typography>
      </Box>

      {wallet.type_of_account !== "cash" && <SettingsWalletIcon opacity=".2" />}
    </WalletButton>
  );
}

export default Wallet;