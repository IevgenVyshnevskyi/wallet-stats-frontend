import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { AccountButton } from "./Account.styled";
import SettingsAccountIcon from '../../../shared/assets/icons/settings-account.svg'
import { DARK_FOR_TEXT } from "../../../shared/styles/variables";

export type AccountProps = {
  name?: string;
  sum: string;
  noIcon?: boolean;
}

const Account: React.FC<AccountProps> = ({ name, sum, noIcon }) => {

  // context for active button,
  // add data attribute
  // check if context activeButton === clicked button

  return (
    <AccountButton>
      <Box
        display="flex"
        direction="column"
        alignItems="start"
        m={!name && "10px 0"}
      >
        {name && (
          <Typography
            as="h4"
            fw="500"
            color={DARK_FOR_TEXT}
            m="0 0 10px 0"
          >
            {name}
          </Typography>
        )}
        <Typography
          as="span"
          fw="600"
          fz="22px"
        >
          {sum}
        </Typography>
      </Box>

      {!noIcon && <SettingsAccountIcon opacity=".2" />}
    </AccountButton>
  );
}

export default Account;