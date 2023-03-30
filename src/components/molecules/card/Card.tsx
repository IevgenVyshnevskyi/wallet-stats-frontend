import { Box } from "../../atoms/box/Box.styled";
import { Typography } from "../../atoms/typography/Typography.styled";
import { CardButton } from "./Card.styled";
import SettingsCardIcon from '../../../shared/assets/icons/settings-card.svg'
import { DARK_FOR_TEXT } from "../../../shared/styles/variables";

type CardProps = {
  name?: string;
  sum: string;
}

const Card: React.FC<CardProps> = ({ name, sum }) => {

  return (
    <CardButton>
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

      <SettingsCardIcon opacity=".2" />
    </CardButton>
  );
}

export default Card;