import { Box } from "../../atoms/box/Box.styled";
import { Label } from "../../atoms/label/Label.styled";
import { Input } from "../../atoms/input/Input.styled";
import { Typography } from "../../atoms/typography/Typography.styled";

import VisibilityOff from "../../../shared/assets/icons/visibility-off.svg";
import VisibilityOn from "../../../shared/assets/icons/visibility-on.svg";

import COLORS from "../../../shared/styles/variables";

import { FieldErrors, UseFormRegisterReturn } from 'react-hook-form'

type BaseFieldProps = {
  fieldType: "text" | "email" | "password";
  name: string;
  label: string;
  errors: FieldErrors;
  isPasswordVisible?: boolean;
  setIsPasswordVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  registerOptions?: UseFormRegisterReturn<string>;
  [key: string]: any;
};

const BaseField: React.FC<BaseFieldProps> = ({
  fieldType,
  name,
  label,
  errors,
  isPasswordVisible,
  setIsPasswordVisible,
  registerOptions,
  ...rest
}) => {
  const setInputType = (): "text" | "password" => {
    if (fieldType === "password") {
      if (isPasswordVisible) {
        return "text";
      } else {
        return "password";
      }
    }
    return "text";
  };

  return (
    <Box mb="35px">
      <Label
        htmlFor={name}
        fz="13px"
        lh="16px"
        color={COLORS.ALMOST_BLACK_FOR_TEXT}
        mb="6px"
        textAlight="left"
      >

        {label}
      </Label>
      <Box position="relative">
        {fieldType === "password" && (
          <Typography
            as="span"
            position="absolute"
            top="16px"
            right="10px"
            cursor="pointer"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
          >
            {isPasswordVisible ? <VisibilityOff /> : <VisibilityOn />}
          </Typography>
        )}
        <Input
          type={setInputType()}
          id={name}
          name={name}
          width="265px"
          pr="35px"
          className={errors?.[name] && "error"}
          {...registerOptions}
          {...rest}
        />
      </Box>
      <Box
        color="red"
        textAlight="left"
        border="red"
        fz="13px"
        height="14px"
        width="300px"
        mb="20px"
      >
        {errors?.[name] && <>{errors?.[name]?.message || "Error!"}</>}
      </Box>
    </Box>
  );
};

export default BaseField;
