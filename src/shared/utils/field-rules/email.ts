import { emailRegex } from "../regexes";

export const emailFieldRules = {
  required: "Обов'язкове поле для заповнення",
  pattern: {
    value: emailRegex,
    message: "Назва повинна бути не менше 2 літер",
  },
};
