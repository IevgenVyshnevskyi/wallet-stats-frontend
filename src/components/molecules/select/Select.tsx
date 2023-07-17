import ReactSelect, { StylesConfig } from "react-select";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import COLORS from "../../../shared/styles/variables";
import { SelectOptions } from "../../../../types/common";

type SelectProps = {
  value: SelectOptions;
  options: SelectOptions[];
  onCategoryChange: (
    e: React.ChangeEvent<{ value: string; label: string }>
  ) => void;
  width?: string;
  isError?: FieldError | Merge<FieldError, FieldErrorsImpl<any>>;
};

const Select: React.FC<SelectProps> = ({
  value,
  options,
  onCategoryChange,
  width,
  isError,
}) => {
  const customStyles: StylesConfig = {
    control: (baseStyles) => ({
      ...baseStyles,
      color: COLORS.ALMOST_BLACK_FOR_TEXT,
      background: isError ? COLORS.ALERT_2 : COLORS.WHITE,
      fontSize: "16px",
      border: `2px solid ${isError ? COLORS.ALERT_1 : COLORS.PRIMARY_2}`,
      outline: "none",
      borderRadius: "12px",
      padding: "3px 8px",
      width,
      "&:hover": {
        border: `2px solid ${COLORS.PRIMARY}`,
      },
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      color: COLORS.ALMOST_BLACK_FOR_TEXT,
      background: COLORS.WHITE,
      fontSize: "16px",
      border: `2px solid ${COLORS.PRIMARY_2}`,
      borderRadius: "12px",
      marginTop: "4px",
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: COLORS.ALMOST_BLACK_FOR_TEXT,
      background: state.isSelected ? COLORS.MENU_BUTTON_HOVER : COLORS.WHITE,
      "&:hover": {
        background: state.isSelected ? COLORS.MENU_BUTTON_HOVER : COLORS.BASE_2,
      },
    }),
  };

  return (
    <ReactSelect
      value={value}
      options={options}
      styles={customStyles}
      onChange={onCategoryChange}
      noOptionsMessage={() => "Категорію не знайдено"}
    />
  );
};

export default Select;
