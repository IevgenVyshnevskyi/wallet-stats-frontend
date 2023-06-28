import ReactSelect, { StylesConfig } from 'react-select'

import {
  ALERT_1,
  ALERT_2,
  ALMOST_BLACK_FOR_TEXT,
  BASE_2,
  MENU_BUTTON_HOVER,
  PRIMARY,
  PRIMARY_2,
  WHITE
} from "../../../shared/styles/variables";

type SelectProps = {
  value: { value: number, label: string };
  options: any;
  onCategoryChange: (e: any) => void;
  width?: string;
  isError?: any;
}

const Select: React.FC<SelectProps> = ({
  value,
  options,
  onCategoryChange,
  width,
  isError
}) => {
  const customStyles: StylesConfig = {
    control: (baseStyles) => ({
      ...baseStyles,
      color: ALMOST_BLACK_FOR_TEXT,
      background: isError ? ALERT_2 : WHITE,
      fontSize: '16px',
      border: `2px solid ${isError ? ALERT_1 : PRIMARY_2}`,
      outline: 'none',
      borderRadius: '12px',
      padding: "3px 8px",
      width,
      '&:hover': {
        border: `2px solid ${PRIMARY}`,
      },
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      color: ALMOST_BLACK_FOR_TEXT,
      background: WHITE,
      fontSize: '16px',
      border: `2px solid ${PRIMARY_2}`,
      borderRadius: '12px',
      marginTop: '4px',
    }),
    option: (baseStyles, state) => ({
      ...baseStyles,
      color: ALMOST_BLACK_FOR_TEXT,
      background: state.isSelected ? MENU_BUTTON_HOVER : WHITE,
      '&:hover': {
        background: state.isSelected ? MENU_BUTTON_HOVER : BASE_2,
      }
    })
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
}

export default Select;