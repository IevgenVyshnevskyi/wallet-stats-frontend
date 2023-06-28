import { moneyAmountRegex } from "../regexes";

export const amountFieldRules = {
  required: 'Обов\'язкове поле для заповнення',
  pattern: {
    value: moneyAmountRegex,
    message: 'Сума може бути від 1 до 8 цифр перед крапкою та до 2 цифр після крапки',
  },
  min: {
    value: 0.00,
    message: 'Сума може бути додатньою від 1 до 8 цифр перед крапкою та до 2 цифр після крапки'
  },
}
