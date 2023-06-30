
import { Box } from "../../../atoms/box/Box.styled";
import { Typography } from "../../../atoms/typography/Typography.styled";

import { SUCCESS, ALERT_1 } from "../../../../shared/styles/variables";

import PackageSuccessIcon from "../../../../shared/assets/icons/package-success.svg";
import PackageErrorIcon from "../../../../shared/assets/icons/package-error.svg";

import { MessageProps } from "../../../../../types/molecules";

const BankdataInfoMessage: React.FC<MessageProps> = ({ message }) => {
  return (
    <Box display="flex" alignItems="center" gap="10px" mt="24px">
      {message === "success" ? (
        <PackageSuccessIcon />
      ) : (
        <PackageErrorIcon />
      )}
      <Typography
        as="span"
        fz="16px"
        color={message === "success" ? SUCCESS : ALERT_1}
      >
        {message === "success" ? (
          "Файл успішно додано"
        ) : (
          "Виникла помилка"
        )}
      </Typography>
    </Box>
  );
}

export default BankdataInfoMessage;