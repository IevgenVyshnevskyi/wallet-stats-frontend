import { forwardRef, useEffect, useState } from "react";

import { DateInput } from "../../atoms/input/InputDate.styled";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";

import {
  formatTransactionDateToString,
  formatTransactionDateToUTC
} from "../../../shared/utils/formatTransactionDate";

import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from 'date-fns/locale/uk';
registerLocale('uk', uk)

import { setAddTransactionData, setEditTransactionData } from "../../../store/transactionSlice";

const DatePicker: React.FC<{ isEditTrapsactionOpen?: boolean }> = ({ isEditTrapsactionOpen }) => {
  const dispatch = useAppDispatch()

  const { editTransactionData, addTransactionData } = useAppSelector(state => state.transaction)

  const [startDate, setStartDate] = useState(new Date());

  function onDateChange(date: Date) {
    if (isEditTrapsactionOpen === true) {
      dispatch(setEditTransactionData({
        created: formatTransactionDateToUTC(date)
      }))
    } else if (isEditTrapsactionOpen === false) {
      dispatch(setAddTransactionData({
        created: formatTransactionDateToUTC(date)
      }))
    }
  }

  return (
    <ReactDatePicker
      selected={editTransactionData?.created
        ? formatTransactionDateToString(editTransactionData?.created)
        : addTransactionData?.created
          ? formatTransactionDateToString(addTransactionData?.created)
          : startDate
      }
      onChange={(date) => onDateChange(date)}
      dateFormat="EEEE, d MMMM, HH:mm"
      timeIntervals={1}
      locale="uk"
      showTimeSelect
      timeFormat="p"
      timeCaption="Час"
      customInput={<CustomDateInput />}
    />
  );
}

const CustomDateInput = forwardRef<HTMLButtonElement, any>((
  { value, onClick },
  ref
) => (
  <DateInput onClick={onClick} ref={ref}>
    {value}
  </DateInput>
));

export default DatePicker;