import { nameRegex } from "../regexes";

export const nameFieldRules = {
  required: 'Обов\'язкове поле для заповнення',
  pattern: {
    value: nameRegex,
    message: "Назва повинна бути не менше 2 літер",
  },
}