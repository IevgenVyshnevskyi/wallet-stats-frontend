import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { CardButton } from "./Card.styled";
import SettingsCardIcon from '../../../shared/assets/icons/settings-card.svg'
import { ALMOST_BLACK_FOR_TEXT, DARK_FOR_TEXT } from "../../../shared/styles/variables";

const Card: React.FC = () => {

  return (
    <CardButton>
      <Box
        display="flex"
        direction="column"
        alignItems="start"
      >
        <Typography
          as="h4"
          fw="500"
          color={DARK_FOR_TEXT}
          m="0 0 10px 0"
        >
          Приват
        </Typography>
        <Typography
          as="span"
          fw="600"
          color={ALMOST_BLACK_FOR_TEXT}
          fz="22px"
        >
          2 348,35 ₴
        </Typography>
      </Box>

      <SettingsCardIcon opacity=".2" />
    </CardButton>
  );
}

export default Card;