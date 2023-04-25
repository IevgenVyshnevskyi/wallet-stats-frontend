import { forwardRef, useState } from "react";

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

import { setEditTransactionData } from "../../../store/transactionSlice";

const DatePicker = () => {
  const dispatch = useAppDispatch()

  const { editTransactionData } = useAppSelector(state => state.transaction)

  const [startDate, setStartDate] = useState(new Date());

  const CustomDateInput = forwardRef<HTMLButtonElement, any>((
    { value, onClick },
    ref
  ) => (
    <DateInput onClick={onClick} ref={ref}>
      {value}
    </DateInput>
  ));

  function onDateChange(date: Date) {
    setStartDate(date);
    dispatch(setEditTransactionData({
      created: formatTransactionDateToUTC(date)
    }))
  }

  return (
    <ReactDatePicker
      selected={editTransactionData?.created
        ? formatTransactionDateToString(editTransactionData?.created)
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

export default DatePicker;