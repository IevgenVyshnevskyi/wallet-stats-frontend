import { forwardRef, useState } from "react";

import ReactDatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import uk from "date-fns/locale/uk";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import {
  setAddTransactionData,
  setEditTransactionData,
} from "../../../store/transactionSlice";

import {
  formatTransactionDateToString,
  formatTransactionDateToUTC,
} from "../../../shared/utils/transactions/formatTransactionDate";

import DateInput from "../../atoms/input/InputDate.styled";

registerLocale("uk", uk);

const CustomDateInput = forwardRef<HTMLButtonElement, any>(
  ({ value, onClick }, ref) => (
    <DateInput onClick={onClick} ref={ref}>
      {value}
    </DateInput>
  )
);

const DatePicker: React.FC<{ isEditTrapsactionOpen?: boolean }> = ({
  isEditTrapsactionOpen,
}) => {
  const dispatch = useAppDispatch();

  const { editTransactionData, addTransactionData } = useAppSelector(
    (state) => state.transaction
  );

  const [startDate] = useState(new Date());

  const formattedDate = editTransactionData?.created
    ? formatTransactionDateToString(editTransactionData?.created)
    : addTransactionData?.created
    ? formatTransactionDateToString(addTransactionData?.created)
    : startDate;

  const onDateChange = (date: Date) => {
    const actionData = {
      created: formatTransactionDateToUTC(date),
    };

    dispatch(
      isEditTrapsactionOpen
        ? setEditTransactionData(actionData)
        : setAddTransactionData(actionData)
    );
  };

  return (
    <ReactDatePicker
      selected={formattedDate}
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
};

export default DatePicker;
